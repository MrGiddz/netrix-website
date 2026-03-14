"use client";

import { Loader2 } from "lucide-react";
import AdminPageHeader from "@/components/admin-page-header";
import JsonEditorCard from "@/components/json-editor-card";
import PageShell from "@/components/page-shell";
import { useSiteContent } from "@/components/site-content-provider";

export default function PortfolioPage() {
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
        eyebrow="Portfolio"
        title="Proof and About Editor"
        description="Manage projects, testimonials, team profiles, milestones, and brand values for the public site."
      />
      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}
      <div className="grid gap-6 xl:grid-cols-2">
        <JsonEditorCard
          title="Projects"
          description="Gallery portfolio items with category and image keys."
          value={content.projects}
          onSave={(value) =>
            saveContent({
              ...content,
              projects: value,
            })
          }
        />
        <JsonEditorCard
          title="Testimonials"
          description="Homepage testimonial cards and ratings."
          value={content.testimonials}
          onSave={(value) =>
            saveContent({
              ...content,
              testimonials: value,
            })
          }
        />
        <JsonEditorCard
          title="Milestones"
          description="About page company timeline."
          value={content.about.milestones}
          onSave={(value) =>
            saveContent({
              ...content,
              about: {
                ...content.about,
                milestones: value,
              },
            })
          }
        />
        <JsonEditorCard
          title="Leadership Team"
          description="About page leadership cards with image keys."
          value={content.about.team}
          onSave={(value) =>
            saveContent({
              ...content,
              about: {
                ...content.about,
                team: value,
              },
            })
          }
        />
      </div>
    </PageShell>
  );
}
