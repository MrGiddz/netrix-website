"use client";

import { Loader2 } from "lucide-react";
import type { SiteContent } from "@/lib/site-content";
import AdminPageHeader from "@/components/admin-page-header";
import JsonEditorCard from "@/components/json-editor-card";
import PageShell from "@/components/page-shell";
import { useSiteContent } from "@/components/site-content-provider";

export default function ContentPage() {
  const { content, isLoading, error, saveContent } = useSiteContent();

  const saveSection = async <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => {
    await saveContent({
      ...content,
      [key]: value,
    });
  };

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
        eyebrow="Content"
        title="Website Content Editor"
        description="Edit the public marketing content collections. Each save updates MongoDB through Next route handlers and becomes the frontend source of truth."
      />
      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}
      <div className="grid gap-6 xl:grid-cols-2">
        <JsonEditorCard
          title="Hero Section"
          description="Top-of-page messaging, CTAs, and trust badges."
          value={content.hero}
          onSave={(value) => saveSection("hero", value)}
        />
        <JsonEditorCard
          title="About Overview"
          description="Homepage about block summary, mission, highlights, and stats."
          value={content.about.overview}
          onSave={(value) => saveSection("about", { ...content.about, overview: value })}
        />
        <JsonEditorCard
          title="Core Services"
          description="Homepage service cards and image/icon keys."
          value={content.services}
          onSave={(value) => saveSection("services", value)}
        />
        <JsonEditorCard
          title="Additional Services"
          description="Secondary capability chips shown below the main services."
          value={content.additionalServices}
          onSave={(value) => saveSection("additionalServices", value)}
        />
        <JsonEditorCard
          title="FAQ Library"
          description="Structured support content grouped by category."
          value={content.faqs}
          onSave={(value) => saveSection("faqs", value)}
        />
        <JsonEditorCard
          title="Navigation"
          description="Footer and navbar navigation entries."
          value={content.navigation}
          onSave={(value) => saveSection("navigation", value)}
        />
      </div>
    </PageShell>
  );
}
