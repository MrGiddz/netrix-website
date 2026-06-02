"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Eye } from "lucide-react";
import AdminPageHeader from "@/components/admin-page-header";
import { LoadingSkeleton, SectionCard, ToastNotice } from "@/components/cms-controls";
import PageShell from "@/components/page-shell";
import { useSiteContent } from "@/components/site-content-provider";
import { PUBLIC_IMAGE_OPTIONS } from "@/lib/site-content";

type LibraryImage = {
  id: string;
  label: string;
  src: string;
  source: "Public" | "Cloudinary";
  helper: string;
};

type Notice = { tone: "success" | "error"; message: string } | null;

function collectCloudinaryImages(content: ReturnType<typeof useSiteContent>["content"]) {
  const images: LibraryImage[] = [];
  const add = (label: string, image?: { imageUrl?: string; imagePublicId?: string; imageSource?: string }) => {
    if (image?.imageSource === "cloudinary" && image.imageUrl) {
      images.push({
        id: image.imagePublicId || image.imageUrl,
        label,
        src: image.imageUrl,
        source: "Cloudinary",
        helper: image.imagePublicId || image.imageUrl,
      });
    }
  };

  add("Hero background", {
    imageUrl: content.hero.backgroundImageUrl,
    imagePublicId: content.hero.backgroundImagePublicId,
    imageSource: content.hero.backgroundImageSource,
  });
  content.services.forEach((item) => add(item.title || "Service image", item));
  content.products.forEach((item) => add(item.name || "Product image", item));
  content.projects.forEach((item) => add(item.title || "Project image", item));
  content.about.team.forEach((item) => add(item.name || "Team portrait", item));

  return Array.from(new Map(images.map((image) => [image.id, image])).values());
}

export default function MediaLibraryPage() {
  const { content, isLoading } = useSiteContent();
  const [preview, setPreview] = useState<LibraryImage | null>(null);
  const [notice, setNotice] = useState<Notice>(null);
  const cloudinaryImages = useMemo(() => collectCloudinaryImages(content), [content]);
  const publicImages: LibraryImage[] = PUBLIC_IMAGE_OPTIONS.map((image) => ({
    id: image.key,
    label: image.label,
    src: image.src,
    source: "Public",
    helper: image.key,
  }));

  const copy = async (image: LibraryImage) => {
    try {
      await navigator.clipboard.writeText(image.source === "Public" ? image.helper : image.src);
      setNotice({ tone: "success", message: `${image.source === "Public" ? "Image key" : "Image URL"} copied.` });
    } catch {
      setNotice({ tone: "error", message: "Could not copy image reference." });
    }
  };

  if (isLoading) return <LoadingSkeleton />;

  const renderGrid = (images: LibraryImage[]) => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {images.map((image) => (
        <div key={`${image.source}-${image.id}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <button type="button" onClick={() => setPreview(image)} className="block h-36 w-full overflow-hidden bg-white">
            <img src={image.src} alt="" className="h-full w-full object-cover transition hover:scale-105" />
          </button>
          <div className="space-y-3 p-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-semibold text-slate-950">{image.label}</p>
                <span className={["shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold", image.source === "Public" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"].join(" ")}>
                  {image.source}
                </span>
              </div>
              <p className="mt-1 truncate font-mono text-xs text-slate-500">{image.helper}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setPreview(image)} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 hover:bg-slate-50">
                <Eye className="h-4 w-4" /> Preview
              </button>
              <button type="button" onClick={() => void copy(image)} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 hover:bg-slate-50">
                <Copy className="h-4 w-4" /> Copy
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <PageShell>
      <AdminPageHeader
        eyebrow="Media"
        title="Media Library"
        description="Browse uploaded images and default site images."
        breadcrumbs={["Dashboard", "Media Library"]}
      />
      <SectionCard title="Cloudinary uploads" description="Images used by saved content. Upload new images from any image field.">
        {cloudinaryImages.length ? renderGrid(cloudinaryImages) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
            No Cloudinary images are saved yet. Use an image field to upload the first one.
          </div>
        )}
      </SectionCard>
      <SectionCard title="Default images" description="Built-in images available for image fields.">
        {renderGrid(publicImages)}
      </SectionCard>

      {preview ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/70 px-3 py-3 sm:items-center sm:px-4" onMouseDown={() => setPreview(null)}>
          <div className="max-h-[calc(100dvh-24px)] w-full max-w-4xl overflow-auto rounded-2xl bg-white p-4 shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-950">{preview.label}</p>
                <p className="truncate text-xs text-slate-500">{preview.source}</p>
              </div>
              <button type="button" onClick={() => setPreview(null)} className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50">
                <Check className="h-4 w-4" />
              </button>
            </div>
            <img src={preview.src} alt="" className="max-h-[70dvh] w-full rounded-xl object-contain" />
          </div>
        </div>
      ) : null}
      {notice ? <ToastNotice tone={notice.tone} message={notice.message} onClose={() => setNotice(null)} /> : null}
    </PageShell>
  );
}
