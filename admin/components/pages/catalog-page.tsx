"use client";

import { useMemo, useState } from "react";
import { Edit3, Plus, Search, Trash2, X } from "lucide-react";
import type { SiteContent } from "@/lib/site-content";
import AdminPageHeader from "@/components/admin-page-header";
import {
  ConfirmDialog,
  EmptyState,
  FormField,
  ImagePicker,
  LoadingSkeleton,
  RepeatableListEditor,
  SaveBar,
  SectionCard,
  ToastNotice,
  inputClass,
  required,
  textareaClass,
  useDraft,
  type FieldErrors,
} from "@/components/cms-controls";
import PageShell from "@/components/page-shell";
import { useSiteContent } from "@/components/site-content-provider";

type Product = SiteContent["products"][number];
type Notice = { tone: "success" | "error"; message: string } | null;

const blankProduct = (): Product => ({
  name: "",
  category: "",
  description: "",
  specs: [""],
  imageKey: "hero-solar",
});

function validateProducts(products: Product[]): FieldErrors {
  const errors: FieldErrors = {};
  products.forEach((product, index) => {
    [
      ["name", product.name, "Product name"],
      ["category", product.category, "Category"],
      ["description", product.description, "Description"],
    ].forEach(([key, value, label]) => {
      const message = required(value, label);
      if (message) errors[`products.${index}.${key}`] = message;
    });
    product.specs.forEach((spec, specIndex) => {
      const message = required(spec, "Spec");
      if (message) errors[`products.${index}.specs.${specIndex}`] = message;
    });
  });
  return errors;
}

function ProductModal({
  product,
  index,
  errors,
  onClose,
  onChange,
}: {
  product: Product;
  index: number;
  errors: FieldErrors;
  onClose: () => void;
  onChange: (product: Product) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 px-3 py-3 sm:items-center sm:px-4 sm:py-6">
      <div className="max-h-[calc(100dvh-24px)] w-full max-w-3xl overflow-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-slate-100 bg-white px-4 py-4 min-[375px]:px-5">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-slate-950">{product.name || "New product"}</h2>
            <p className="text-sm text-slate-500">Changes stay in draft until you save the catalog.</p>
          </div>
          <button type="button" onClick={onClose} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-5 p-4 min-[375px]:p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Product name" error={errors[`products.${index}.name`]}>
              <input className={inputClass} value={product.name} onChange={(event) => onChange({ ...product, name: event.target.value })} />
            </FormField>
            <FormField label="Category" error={errors[`products.${index}.category`]}>
              <input className={inputClass} value={product.category} onChange={(event) => onChange({ ...product, category: event.target.value })} />
            </FormField>
          </div>
          <FormField label="Description" error={errors[`products.${index}.description`]}>
            <textarea className={textareaClass} value={product.description} onChange={(event) => onChange({ ...product, description: event.target.value })} />
          </FormField>
          <FormField label="Specs">
            <RepeatableListEditor
              values={product.specs}
              addLabel="Add spec"
              placeholder="Example: 550W output"
              onChange={(specs) => onChange({ ...product, specs })}
            />
          </FormField>
          <FormField label="Image">
            <ImagePicker
              value={product.imageKey}
              imageUrl={product.imageUrl}
              imagePublicId={product.imagePublicId}
              imageSource={product.imageSource}
              onChange={(imageKey, image) => onChange({ ...product, imageKey, ...image })}
            />
          </FormField>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Preview</p>
            <p className="mt-2 text-lg font-semibold text-slate-950">{product.name || "Product name"}</p>
            <p className="text-sm text-cyan-700">{product.category || "Category"}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{product.description || "Product description will appear here."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  const { content, isLoading, error, saveContent, isSaving } = useSiteContent();
  const { draft, setDraft, hasChanges, resetDraft } = useDraft(content);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [notice, setNotice] = useState<Notice>(null);
  const fieldErrors = validateProducts(draft.products);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(draft.products.map((product) => product.category).filter(Boolean)))],
    [draft.products],
  );
  const filteredProducts = draft.products
    .map((product, index) => ({ product, index }))
    .filter(({ product }) => {
      const matchesSearch = [product.name, product.category, product.description].join(" ").toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || product.category === category;
      return matchesSearch && matchesCategory;
    });

  const updateProduct = (index: number, product: Product) => {
    const products = [...draft.products];
    products[index] = product;
    setDraft({ ...draft, products });
  };

  const save = async () => {
    if (Object.keys(fieldErrors).length) {
      setNotice({ tone: "error", message: "Please fix product fields before saving." });
      return;
    }
    try {
      await saveContent(draft);
      setNotice({ tone: "success", message: "Product catalog saved." });
    } catch (err) {
      setNotice({ tone: "error", message: err instanceof Error ? err.message : "Failed to save catalog." });
    }
  };

  if (isLoading) return <LoadingSkeleton />;

  return (
    <PageShell>
      <AdminPageHeader
        eyebrow="Catalog"
        title="Product Catalog"
        description="Add, edit, search, and remove products."
        breadcrumbs={["Dashboard", "Catalog"]}
        actions={
          <button
            type="button"
            onClick={() => {
              setDraft({ ...draft, products: [blankProduct(), ...draft.products] });
              setEditingIndex(0);
            }}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-medium text-slate-950 hover:bg-cyan-300"
          >
            <Plus className="h-4 w-4" />
            Add product
          </button>
        }
      />
      {error ? <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

      <SectionCard title="Products" description="Filter by category, search by name, and edit each item.">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input className={`${inputClass} pl-9`} placeholder="Search products" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
          <select className={inputClass} value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        {filteredProducts.length ? (
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <div className="hidden grid-cols-[1.2fr_0.8fr_1fr_130px] gap-3 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 md:grid">
              <span>Name</span>
              <span>Category</span>
              <span>Specs</span>
              <span>Actions</span>
            </div>
            <div className="divide-y divide-slate-100">
              {filteredProducts.map(({ product, index }) => (
                <div key={`${product.name}-${index}`} className="grid gap-3 px-4 py-4 md:grid-cols-[1.2fr_0.8fr_1fr_130px] md:items-center">
                  <div className="min-w-0">
                    <p className="font-medium text-slate-950">{product.name || "Untitled product"}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-500">{product.description || "No description yet."}</p>
                  </div>
                  <span className="w-fit rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700">{product.category || "Uncategorized"}</span>
                  <p className="text-sm text-slate-600">{product.specs.filter(Boolean).slice(0, 2).join(" · ") || "No specs"}</p>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setEditingIndex(index)} className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50">
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={() => setDeleteIndex(index)} className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-red-100 text-red-600 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <EmptyState title="No products found" description="Try another search or add a product." />
        )}
      </SectionCard>

      {editingIndex !== null && draft.products[editingIndex] ? (
        <ProductModal
          product={draft.products[editingIndex]}
          index={editingIndex}
          errors={fieldErrors}
          onClose={() => setEditingIndex(null)}
          onChange={(product) => updateProduct(editingIndex, product)}
        />
      ) : null}

      <ConfirmDialog
        open={deleteIndex !== null}
        title="Delete product?"
        description="This removes the product from the draft. Save to publish the change."
        confirmLabel="Delete product"
        onCancel={() => setDeleteIndex(null)}
        onConfirm={() => {
          if (deleteIndex === null) return;
          setDraft({ ...draft, products: draft.products.filter((_, index) => index !== deleteIndex) });
          setDeleteIndex(null);
        }}
      />
      <SaveBar hasChanges={hasChanges} isSaving={isSaving} errorCount={Object.keys(fieldErrors).length} onSave={save} onDiscard={resetDraft} />
      {notice ? <ToastNotice tone={notice.tone} message={notice.message} onClose={() => setNotice(null)} /> : null}
    </PageShell>
  );
}
