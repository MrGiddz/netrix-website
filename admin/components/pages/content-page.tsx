"use client";

import { Plus, Trash2 } from "lucide-react";
import type { SiteContent } from "@/lib/site-content";
import AdminPageHeader from "@/components/admin-page-header";
import {
  EmptyState,
  FormField,
  IconPicker,
  ImagePicker,
  LoadingSkeleton,
  RepeatableListEditor,
  ReorderButtons,
  SaveBar,
  SectionCard,
  ToastNotice,
  addButton,
  inputClass,
  moveItem,
  required,
  textareaClass,
  useDraft,
  type FieldErrors,
} from "@/components/cms-controls";
import PageShell from "@/components/page-shell";
import { useSiteContent } from "@/components/site-content-provider";
import { useState } from "react";

type Notice = { tone: "success" | "error"; message: string } | null;

const newService = (): SiteContent["services"][number] => ({
  iconKey: "sun",
  title: "",
  description: "",
  imageKey: "hero-solar",
});

const newFaqCategory = (): SiteContent["faqs"][number] => ({
  category: "",
  questions: [{ q: "", a: "" }],
});

function validateContent(draft: SiteContent): FieldErrors {
  const errors: FieldErrors = {};
  [
    ["hero.badge", draft.hero.badge, "Hero badge"],
    ["hero.title", draft.hero.title, "Hero title"],
    ["hero.description", draft.hero.description, "Hero description"],
    ["hero.primaryCtaLabel", draft.hero.primaryCtaLabel, "Primary CTA label"],
    ["hero.primaryCtaHref", draft.hero.primaryCtaHref, "Primary CTA link"],
    ["hero.secondaryCtaLabel", draft.hero.secondaryCtaLabel, "Secondary CTA label"],
    ["hero.secondaryCtaHref", draft.hero.secondaryCtaHref, "Secondary CTA link"],
    ["about.overview.eyebrow", draft.about.overview.eyebrow, "About eyebrow"],
    ["about.overview.title", draft.about.overview.title, "About title"],
    ["about.overview.description", draft.about.overview.description, "About description"],
    ["about.overview.mission", draft.about.overview.mission, "Mission"],
  ].forEach(([key, value, label]) => {
    const message = required(value, label);
    if (message) errors[key] = message;
  });

  draft.hero.trustBadges.forEach((badge, index) => {
    const message = required(badge, "Trust badge");
    if (message) errors[`hero.trustBadges.${index}`] = message;
  });
  draft.about.overview.highlights.forEach((item, index) => {
    const message = required(item, "Highlight");
    if (message) errors[`about.overview.highlights.${index}`] = message;
  });
  draft.about.overview.stats.forEach((stat, index) => {
    if (!stat.number.trim()) errors[`about.overview.stats.${index}.number`] = "Number is required.";
    if (!stat.label.trim()) errors[`about.overview.stats.${index}.label`] = "Label is required.";
  });
  draft.services.forEach((service, index) => {
    if (!service.title.trim()) errors[`services.${index}.title`] = "Service title is required.";
    if (!service.description.trim()) errors[`services.${index}.description`] = "Service description is required.";
  });
  draft.additionalServices.forEach((service, index) => {
    if (!service.label.trim()) errors[`additionalServices.${index}.label`] = "Label is required.";
  });
  draft.faqs.forEach((category, categoryIndex) => {
    if (!category.category.trim()) errors[`faqs.${categoryIndex}.category`] = "Category is required.";
    category.questions.forEach((question, questionIndex) => {
      if (!question.q.trim()) errors[`faqs.${categoryIndex}.questions.${questionIndex}.q`] = "Question is required.";
      if (!question.a.trim()) errors[`faqs.${categoryIndex}.questions.${questionIndex}.a`] = "Answer is required.";
    });
  });
  draft.navigation.forEach((item, index) => {
    if (!item.label.trim()) errors[`navigation.${index}.label`] = "Label is required.";
    if (!item.href.trim()) errors[`navigation.${index}.href`] = "Link is required.";
  });
  return errors;
}

export default function ContentPage() {
  const { content, isLoading, error, saveContent, isSaving } = useSiteContent();
  const { draft, setDraft, hasChanges, resetDraft } = useDraft(content);
  const [notice, setNotice] = useState<Notice>(null);
  const fieldErrors = validateContent(draft);

  const save = async () => {
    if (Object.keys(fieldErrors).length) {
      setNotice({ tone: "error", message: "Please fix the highlighted fields before saving." });
      return;
    }
    try {
      await saveContent(draft);
      setNotice({ tone: "success", message: "Content sections saved." });
    } catch (err) {
      setNotice({ tone: "error", message: err instanceof Error ? err.message : "Failed to save content." });
    }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <PageShell>
      <AdminPageHeader
        eyebrow="Content"
        title="Website Content"
        description="Update homepage copy, services, FAQs, and navigation."
        breadcrumbs={["Dashboard", "Content"]}
      />
      {error ? <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Hero section" description="Top-of-page copy, buttons, badges, and background image.">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Badge" error={fieldErrors["hero.badge"]}>
              <input className={inputClass} value={draft.hero.badge} onChange={(event) => setDraft({ ...draft, hero: { ...draft.hero, badge: event.target.value } })} />
            </FormField>
            <FormField label="Title" error={fieldErrors["hero.title"]}>
              <input className={inputClass} value={draft.hero.title} onChange={(event) => setDraft({ ...draft, hero: { ...draft.hero, title: event.target.value } })} />
            </FormField>
          </div>
          <FormField label="Description" error={fieldErrors["hero.description"]}>
            <textarea className={textareaClass} value={draft.hero.description} onChange={(event) => setDraft({ ...draft, hero: { ...draft.hero, description: event.target.value } })} />
          </FormField>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Primary CTA label" error={fieldErrors["hero.primaryCtaLabel"]}>
              <input className={inputClass} value={draft.hero.primaryCtaLabel} onChange={(event) => setDraft({ ...draft, hero: { ...draft.hero, primaryCtaLabel: event.target.value } })} />
            </FormField>
            <FormField label="Primary CTA link" error={fieldErrors["hero.primaryCtaHref"]}>
              <input className={inputClass} value={draft.hero.primaryCtaHref} onChange={(event) => setDraft({ ...draft, hero: { ...draft.hero, primaryCtaHref: event.target.value } })} />
            </FormField>
            <FormField label="Secondary CTA label" error={fieldErrors["hero.secondaryCtaLabel"]}>
              <input className={inputClass} value={draft.hero.secondaryCtaLabel} onChange={(event) => setDraft({ ...draft, hero: { ...draft.hero, secondaryCtaLabel: event.target.value } })} />
            </FormField>
            <FormField label="Secondary CTA link" error={fieldErrors["hero.secondaryCtaHref"]}>
              <input className={inputClass} value={draft.hero.secondaryCtaHref} onChange={(event) => setDraft({ ...draft, hero: { ...draft.hero, secondaryCtaHref: event.target.value } })} />
            </FormField>
          </div>
          <FormField label="Trust badges">
            <RepeatableListEditor
              values={draft.hero.trustBadges}
              addLabel="Add trust badge"
              errors={Object.fromEntries(Object.entries(fieldErrors).filter(([key]) => key.startsWith("hero.trustBadges")))}
              onChange={(trustBadges) => setDraft({ ...draft, hero: { ...draft.hero, trustBadges } })}
            />
          </FormField>
          <FormField label="Background image">
            <ImagePicker
              value={draft.hero.backgroundImageKey}
              imageUrl={draft.hero.backgroundImageUrl}
              imagePublicId={draft.hero.backgroundImagePublicId}
              imageSource={draft.hero.backgroundImageSource}
              onChange={(backgroundImageKey, image) => setDraft({
                ...draft,
                hero: {
                  ...draft.hero,
                  backgroundImageKey,
                  backgroundImageUrl: image?.imageUrl,
                  backgroundImagePublicId: image?.imagePublicId,
                  backgroundImageSource: image?.imageSource,
                },
              })}
            />
          </FormField>
        </SectionCard>

        <SectionCard title="About overview" description="Homepage about copy, mission, highlights, and counters.">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Eyebrow" error={fieldErrors["about.overview.eyebrow"]}>
              <input className={inputClass} value={draft.about.overview.eyebrow} onChange={(event) => setDraft({ ...draft, about: { ...draft.about, overview: { ...draft.about.overview, eyebrow: event.target.value } } })} />
            </FormField>
            <FormField label="Title" error={fieldErrors["about.overview.title"]}>
              <input className={inputClass} value={draft.about.overview.title} onChange={(event) => setDraft({ ...draft, about: { ...draft.about, overview: { ...draft.about.overview, title: event.target.value } } })} />
            </FormField>
          </div>
          <FormField label="Description" error={fieldErrors["about.overview.description"]}>
            <textarea className={textareaClass} value={draft.about.overview.description} onChange={(event) => setDraft({ ...draft, about: { ...draft.about, overview: { ...draft.about.overview, description: event.target.value } } })} />
          </FormField>
          <FormField label="Mission" error={fieldErrors["about.overview.mission"]}>
            <textarea className={textareaClass} value={draft.about.overview.mission} onChange={(event) => setDraft({ ...draft, about: { ...draft.about, overview: { ...draft.about.overview, mission: event.target.value } } })} />
          </FormField>
          <FormField label="Highlights">
            <RepeatableListEditor values={draft.about.overview.highlights} addLabel="Add highlight" onChange={(highlights) => setDraft({ ...draft, about: { ...draft.about, overview: { ...draft.about.overview, highlights } } })} />
          </FormField>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-800">Stats</p>
              {addButton("Add stat", () => setDraft({ ...draft, about: { ...draft.about, overview: { ...draft.about.overview, stats: [...draft.about.overview.stats, { number: "", label: "" }] } } }))}
            </div>
            {draft.about.overview.stats.map((stat, index) => (
              <div key={index} className="grid gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 md:grid-cols-[1fr_1fr_auto]">
                <input className={inputClass} placeholder="Number" value={stat.number} onChange={(event) => {
                  const stats = [...draft.about.overview.stats];
                  stats[index] = { ...stat, number: event.target.value };
                  setDraft({ ...draft, about: { ...draft.about, overview: { ...draft.about.overview, stats } } });
                }} />
                <input className={inputClass} placeholder="Label" value={stat.label} onChange={(event) => {
                  const stats = [...draft.about.overview.stats];
                  stats[index] = { ...stat, label: event.target.value };
                  setDraft({ ...draft, about: { ...draft.about, overview: { ...draft.about.overview, stats } } });
                }} />
                <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-red-100 bg-white text-red-600 hover:bg-red-50" onClick={() => setDraft({ ...draft, about: { ...draft.about, overview: { ...draft.about.overview, stats: draft.about.overview.stats.filter((_, itemIndex) => itemIndex !== index) } } })}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Core services" description="Cards shown in the services section." actions={addButton("Add service", () => setDraft({ ...draft, services: [...draft.services, newService()] }))}>
        <div className="grid gap-4 lg:grid-cols-2">
          {draft.services.map((service, index) => (
            <div key={index} className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium text-slate-900">Service {index + 1}</p>
                <div className="flex gap-2">
                  <ReorderButtons index={index} length={draft.services.length} onMove={(from, to) => setDraft({ ...draft, services: moveItem(draft.services, from, to) })} />
                  <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-red-100 bg-white text-red-600 hover:bg-red-50" onClick={() => setDraft({ ...draft, services: draft.services.filter((_, itemIndex) => itemIndex !== index) })}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <FormField label="Icon">
                <IconPicker value={service.iconKey} onChange={(iconKey) => {
                  const services = [...draft.services];
                  services[index] = { ...service, iconKey };
                  setDraft({ ...draft, services });
                }} />
              </FormField>
              <FormField label="Title" error={fieldErrors[`services.${index}.title`]}>
                <input className={inputClass} value={service.title} onChange={(event) => {
                  const services = [...draft.services];
                  services[index] = { ...service, title: event.target.value };
                  setDraft({ ...draft, services });
                }} />
              </FormField>
              <FormField label="Description" error={fieldErrors[`services.${index}.description`]}>
                <textarea className={textareaClass} value={service.description} onChange={(event) => {
                  const services = [...draft.services];
                  services[index] = { ...service, description: event.target.value };
                  setDraft({ ...draft, services });
                }} />
              </FormField>
              <FormField label="Image">
                <ImagePicker value={service.imageKey} imageUrl={service.imageUrl} imagePublicId={service.imagePublicId} imageSource={service.imageSource} onChange={(imageKey, image) => {
                  const services = [...draft.services];
                  services[index] = { ...service, imageKey, ...image };
                  setDraft({ ...draft, services });
                }} />
              </FormField>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Additional services" description="Short chips below the main service cards." actions={addButton("Add chip", () => setDraft({ ...draft, additionalServices: [...draft.additionalServices, { iconKey: "shield", label: "" }] }))}>
          <div className="space-y-3">
            {draft.additionalServices.map((service, index) => (
              <div key={index} className="grid gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 md:grid-cols-[220px_minmax(0,1fr)_auto]">
                <IconPicker value={service.iconKey} onChange={(iconKey) => {
                  const additionalServices = [...draft.additionalServices];
                  additionalServices[index] = { ...service, iconKey };
                  setDraft({ ...draft, additionalServices });
                }} />
                <input className={inputClass} value={service.label} placeholder="Service label" onChange={(event) => {
                  const additionalServices = [...draft.additionalServices];
                  additionalServices[index] = { ...service, label: event.target.value };
                  setDraft({ ...draft, additionalServices });
                }} />
                <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-red-100 bg-white text-red-600 hover:bg-red-50" onClick={() => setDraft({ ...draft, additionalServices: draft.additionalServices.filter((_, itemIndex) => itemIndex !== index) })}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </SectionCard>

        <div id="navigation" className="scroll-mt-24">
        <SectionCard title="Navigation" description="Links used by the public header and footer." actions={addButton("Add link", () => setDraft({ ...draft, navigation: [...draft.navigation, { label: "", href: "" }] }))}>
          <div className="space-y-3">
            {draft.navigation.map((item, index) => (
              <div key={index} className="grid gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 md:grid-cols-[1fr_1fr_auto_auto]">
                <input className={inputClass} placeholder="Label" value={item.label} onChange={(event) => {
                  const navigation = [...draft.navigation];
                  navigation[index] = { ...item, label: event.target.value };
                  setDraft({ ...draft, navigation });
                }} />
                <input className={inputClass} placeholder="/about or /#contact" value={item.href} onChange={(event) => {
                  const navigation = [...draft.navigation];
                  navigation[index] = { ...item, href: event.target.value };
                  setDraft({ ...draft, navigation });
                }} />
                <ReorderButtons index={index} length={draft.navigation.length} onMove={(from, to) => setDraft({ ...draft, navigation: moveItem(draft.navigation, from, to) })} />
                <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-red-100 bg-white text-red-600 hover:bg-red-50" onClick={() => setDraft({ ...draft, navigation: draft.navigation.filter((_, itemIndex) => itemIndex !== index) })}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </SectionCard>
        </div>
      </div>

      <div id="faq" className="scroll-mt-24">
      <SectionCard title="FAQs" description="Questions and answers shown on the public site." actions={addButton("Add category", () => setDraft({ ...draft, faqs: [...draft.faqs, newFaqCategory()] }))}>
        {draft.faqs.length ? (
          <div className="space-y-4">
            {draft.faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_auto_auto]">
                  <input className={inputClass} placeholder="Category" value={category.category} onChange={(event) => {
                    const faqs = [...draft.faqs];
                    faqs[categoryIndex] = { ...category, category: event.target.value };
                    setDraft({ ...draft, faqs });
                  }} />
                  <ReorderButtons index={categoryIndex} length={draft.faqs.length} onMove={(from, to) => setDraft({ ...draft, faqs: moveItem(draft.faqs, from, to) })} />
                  <button type="button" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-red-100 bg-white px-3 text-sm font-medium text-red-600 hover:bg-red-50" onClick={() => setDraft({ ...draft, faqs: draft.faqs.filter((_, itemIndex) => itemIndex !== categoryIndex) })}>
                    <Trash2 className="h-4 w-4" /> Delete
                  </button>
                </div>
                <div className="space-y-3">
                  {category.questions.map((question, questionIndex) => (
                    <div key={questionIndex} className="grid gap-2 rounded-xl bg-white p-3 md:grid-cols-[1fr_1fr_auto]">
                      <input className={inputClass} placeholder="Question" value={question.q} onChange={(event) => {
                        const faqs = [...draft.faqs];
                        const questions = [...category.questions];
                        questions[questionIndex] = { ...question, q: event.target.value };
                        faqs[categoryIndex] = { ...category, questions };
                        setDraft({ ...draft, faqs });
                      }} />
                      <textarea className={`${textareaClass} min-h-11`} placeholder="Answer" value={question.a} onChange={(event) => {
                        const faqs = [...draft.faqs];
                        const questions = [...category.questions];
                        questions[questionIndex] = { ...question, a: event.target.value };
                        faqs[categoryIndex] = { ...category, questions };
                        setDraft({ ...draft, faqs });
                      }} />
                      <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-red-100 text-red-600 hover:bg-red-50" onClick={() => {
                        const faqs = [...draft.faqs];
                        faqs[categoryIndex] = { ...category, questions: category.questions.filter((_, itemIndex) => itemIndex !== questionIndex) };
                        setDraft({ ...draft, faqs });
                      }}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button type="button" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => {
                    const faqs = [...draft.faqs];
                    faqs[categoryIndex] = { ...category, questions: [...category.questions, { q: "", a: "" }] };
                    setDraft({ ...draft, faqs });
                  }}>
                    <Plus className="h-4 w-4" /> Add question
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="No FAQ categories yet" description="Add categories and questions for the public FAQ section." />
        )}
      </SectionCard>
      </div>

      <SaveBar hasChanges={hasChanges} isSaving={isSaving} errorCount={Object.keys(fieldErrors).length} onSave={save} onDiscard={resetDraft} />
      {notice ? <ToastNotice tone={notice.tone} message={notice.message} onClose={() => setNotice(null)} /> : null}
    </PageShell>
  );
}
