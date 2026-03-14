"use client";

import { Loader2, RefreshCcw } from "lucide-react";
import AdminPageHeader from "@/components/admin-page-header";
import JsonEditorCard from "@/components/json-editor-card";
import PageShell from "@/components/page-shell";
import { useSiteContent } from "@/components/site-content-provider";

export default function SettingsPage() {
  const { content, isLoading, error, saveContent, seedContent, isSaving } = useSiteContent();

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
        eyebrow="Settings"
        title="Operational Settings"
        description="Manage contact information and reset the stored content document to the default seed when needed."
        actions={
          <button
            type="button"
            onClick={() => seedContent()}
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/20 disabled:opacity-60"
          >
            <RefreshCcw className="h-4 w-4" />
            Reset to defaults
          </button>
        }
      />
      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <JsonEditorCard
          title="Contact Details"
          description="Phone, email, WhatsApp, and address displayed across the website."
          value={content.contact}
          onSave={(value) =>
            saveContent({
              ...content,
              contact: value,
            })
          }
        />
        <section className="rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">Operational Notes</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              Next API endpoint: <code>/api/content</code>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              Admin app: <code>http://localhost:3001</code>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              Frontend app: <code>http://localhost:8080</code>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
