"use client";

import { useState } from "react";
import { RefreshCcw } from "lucide-react";
import type { SiteContent } from "@/lib/site-content";
import AdminPageHeader from "@/components/admin-page-header";
import {
  ConfirmDialog,
  FormField,
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

type Notice = { tone: "success" | "error"; message: string } | null;

function validateSettings(contact: SiteContent["contact"]): FieldErrors {
  const errors: FieldErrors = {};
  [
    ["address", contact.address, "Address"],
    ["email", contact.email, "Email"],
    ["whatsappNumber", contact.whatsappNumber, "WhatsApp number"],
    ["quoteHeading", contact.quoteHeading, "Quote heading"],
    ["quoteDescription", contact.quoteDescription, "Quote description"],
  ].forEach(([key, value, label]) => {
    const message = required(value, label);
    if (message) errors[`contact.${key}`] = message;
  });
  if (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
    errors["contact.email"] = "Enter a valid email address.";
  }
  contact.phones.forEach((phone, index) => {
    if (!phone.trim()) errors[`contact.phones.${index}`] = "Phone number is required.";
  });
  return errors;
}

export default function SettingsPage() {
  const { content, isLoading, error, saveContent, seedContent, isSaving } = useSiteContent();
  const { draft, setDraft, hasChanges, resetDraft } = useDraft(content);
  const [confirmReset, setConfirmReset] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const fieldErrors = validateSettings(draft.contact);

  const updateContact = (contact: SiteContent["contact"]) => setDraft({ ...draft, contact });

  const save = async () => {
    if (Object.keys(fieldErrors).length) {
      setNotice({ tone: "error", message: "Please fix contact settings before saving." });
      return;
    }
    try {
      await saveContent(draft);
      setNotice({ tone: "success", message: "Settings saved." });
    } catch (err) {
      setNotice({ tone: "error", message: err instanceof Error ? err.message : "Failed to save settings." });
    }
  };

  const reset = async () => {
    setConfirmReset(false);
    try {
      await seedContent();
      setNotice({ tone: "success", message: "Content reset to defaults." });
    } catch (err) {
      setNotice({ tone: "error", message: err instanceof Error ? err.message : "Failed to reset content." });
    }
  };

  if (isLoading) return <LoadingSkeleton />;

  return (
    <PageShell>
      <AdminPageHeader
        eyebrow="Settings"
        title="Settings"
        description="Manage public contact details and quote form copy."
        breadcrumbs={["Dashboard", "Settings"]}
        actions={
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            disabled={isSaving}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/20 disabled:opacity-60"
          >
            <RefreshCcw className="h-4 w-4" />
            Reset defaults
          </button>
        }
      />
      {error ? <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <SectionCard title="Contact details" description="Shown in the site header, footer, contact section, and WhatsApp links.">
          <FormField label="Address" error={fieldErrors["contact.address"]}>
            <textarea className={textareaClass} value={draft.contact.address} onChange={(event) => updateContact({ ...draft.contact, address: event.target.value })} />
          </FormField>
          <FormField label="Phone numbers">
            <RepeatableListEditor
              values={draft.contact.phones}
              addLabel="Add phone number"
              placeholder="0800 000 0000"
              errors={Object.fromEntries(Object.entries(fieldErrors).filter(([key]) => key.startsWith("contact.phones")))}
              onChange={(phones) => updateContact({ ...draft.contact, phones })}
            />
          </FormField>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Email" error={fieldErrors["contact.email"]}>
              <input className={inputClass} type="email" value={draft.contact.email} onChange={(event) => updateContact({ ...draft.contact, email: event.target.value })} />
            </FormField>
            <FormField label="WhatsApp number" helper="Use international format without +, for example 2348105249055." error={fieldErrors["contact.whatsappNumber"]}>
              <input className={inputClass} value={draft.contact.whatsappNumber} onChange={(event) => updateContact({ ...draft.contact, whatsappNumber: event.target.value })} />
            </FormField>
          </div>
        </SectionCard>

        <SectionCard title="Quote form" description="Text shown above the public contact form.">
          <FormField label="Quote heading" error={fieldErrors["contact.quoteHeading"]}>
            <input className={inputClass} value={draft.contact.quoteHeading} onChange={(event) => updateContact({ ...draft.contact, quoteHeading: event.target.value })} />
          </FormField>
          <FormField label="Quote description" error={fieldErrors["contact.quoteDescription"]}>
            <textarea className={textareaClass} value={draft.contact.quoteDescription} onChange={(event) => updateContact({ ...draft.contact, quoteDescription: event.target.value })} />
          </FormField>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Preview</p>
            <p className="mt-3 text-xl font-semibold text-slate-950">{draft.contact.quoteHeading || "Quote heading"}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{draft.contact.quoteDescription || "Quote description"}</p>
          </div>
        </SectionCard>
      </div>

      <ConfirmDialog
        open={confirmReset}
        title="Reset all content to defaults?"
        description="This replaces the saved content with the default seed. It affects every admin section."
        confirmLabel="Reset defaults"
        onCancel={() => setConfirmReset(false)}
        onConfirm={reset}
      />
      <SaveBar hasChanges={hasChanges} isSaving={isSaving} errorCount={Object.keys(fieldErrors).length} onSave={save} onDiscard={resetDraft} />
      {notice ? <ToastNotice tone={notice.tone} message={notice.message} onClose={() => setNotice(null)} /> : null}
    </PageShell>
  );
}
