"use client";

import { Loader2 } from "lucide-react";
import AdminPageHeader from "@/components/admin-page-header";
import JsonEditorCard from "@/components/json-editor-card";
import PageShell from "@/components/page-shell";
import { useSiteContent } from "@/components/site-content-provider";

export default function CatalogPage() {
  const { content, isLoading, error, saveContent } = useSiteContent();

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-slate-500" />
      </div>
    );
  }

  return (
    <PageShell>
      <AdminPageHeader
        eyebrow="Catalog"
        title="Product Catalog Editor"
        description="Manage the non-ecommerce product catalog displayed on the public products page."
      />
      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}
      <JsonEditorCard
        title="Products"
        description="Array of product entries with category, description, specs, and image keys."
        value={content.products}
        onSave={(value) =>
          saveContent({
            ...content,
            products: value,
          })
        }
      />
    </PageShell>
  );
}
