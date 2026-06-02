"use client";

import { useState } from "react";
import { Edit3, Plus, Trash2, X } from "lucide-react";
import type { SiteContent } from "@/lib/site-content";
import AdminPageHeader from "@/components/admin-page-header";
import {
  ConfirmDialog,
  EmptyState,
  FormField,
  ImagePicker,
  LoadingSkeleton,
  RatingInput,
  ReorderButtons,
  SaveBar,
  SectionCard,
  ToastNotice,
  inputClass,
  moveItem,
  required,
  textareaClass,
  useDraft,
  type FieldErrors,
} from "@/components/cms-controls";
import PageShell from "@/components/page-shell";
import { useSiteContent } from "@/components/site-content-provider";

type CollectionKey = "projects" | "testimonials" | "milestones" | "team";
type Notice = { tone: "success" | "error"; message: string } | null;

function validatePortfolio(draft: SiteContent): FieldErrors {
  const errors: FieldErrors = {};
  draft.projects.forEach((item, index) => {
    [["title", item.title, "Project title"], ["category", item.category, "Category"], ["location", item.location, "Location"]].forEach(([key, value, label]) => {
      const message = required(value, label);
      if (message) errors[`projects.${index}.${key}`] = message;
    });
  });
  draft.testimonials.forEach((item, index) => {
    [["name", item.name, "Client name"], ["role", item.role, "Role/company"], ["text", item.text, "Testimonial"]].forEach(([key, value, label]) => {
      const message = required(value, label);
      if (message) errors[`testimonials.${index}.${key}`] = message;
    });
  });
  draft.about.milestones.forEach((item, index) => {
    if (!item.year.trim()) errors[`milestones.${index}.year`] = "Year is required.";
    if (!item.event.trim()) errors[`milestones.${index}.event`] = "Event is required.";
  });
  draft.about.team.forEach((item, index) => {
    [["name", item.name, "Name"], ["role", item.role, "Role"], ["bio", item.bio, "Bio"]].forEach(([key, value, label]) => {
      const message = required(value, label);
      if (message) errors[`team.${index}.${key}`] = message;
    });
  });
  return errors;
}

function EditorModal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 px-3 py-3 sm:items-center sm:px-4 sm:py-6">
      <div className="max-h-[calc(100dvh-24px)] w-full max-w-3xl overflow-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-slate-100 bg-white px-4 py-4 min-[375px]:px-5">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
            <p className="text-sm text-slate-500">Save from the page when finished.</p>
          </div>
          <button type="button" onClick={onClose} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-5 p-4 min-[375px]:p-5">{children}</div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const { content, isLoading, error, saveContent, isSaving } = useSiteContent();
  const { draft, setDraft, hasChanges, resetDraft } = useDraft(content);
  const [notice, setNotice] = useState<Notice>(null);
  const [editing, setEditing] = useState<{ key: CollectionKey; index: number } | null>(null);
  const [deleting, setDeleting] = useState<{ key: CollectionKey; index: number } | null>(null);
  const fieldErrors = validatePortfolio(draft);

  const save = async () => {
    if (Object.keys(fieldErrors).length) {
      setNotice({ tone: "error", message: "Please fix highlighted portfolio fields before saving." });
      return;
    }
    try {
      await saveContent(draft);
      setNotice({ tone: "success", message: "Portfolio sections saved." });
    } catch (err) {
      setNotice({ tone: "error", message: err instanceof Error ? err.message : "Failed to save portfolio." });
    }
  };

  const deleteItem = () => {
    if (!deleting) return;
    if (deleting.key === "projects") setDraft({ ...draft, projects: draft.projects.filter((_, index) => index !== deleting.index) });
    if (deleting.key === "testimonials") setDraft({ ...draft, testimonials: draft.testimonials.filter((_, index) => index !== deleting.index) });
    if (deleting.key === "milestones") setDraft({ ...draft, about: { ...draft.about, milestones: draft.about.milestones.filter((_, index) => index !== deleting.index) } });
    if (deleting.key === "team") setDraft({ ...draft, about: { ...draft.about, team: draft.about.team.filter((_, index) => index !== deleting.index) } });
    setDeleting(null);
  };

  if (isLoading) return <LoadingSkeleton />;

  const editProject = editing?.key === "projects" ? draft.projects[editing.index] : null;
  const editTestimonial = editing?.key === "testimonials" ? draft.testimonials[editing.index] : null;
  const editMilestone = editing?.key === "milestones" ? draft.about.milestones[editing.index] : null;
  const editTeam = editing?.key === "team" ? draft.about.team[editing.index] : null;

  return (
    <PageShell>
      <AdminPageHeader
        eyebrow="Portfolio"
        title="Proof and About"
        description="Manage projects, testimonials, milestones, and team profiles."
        breadcrumbs={["Dashboard", "Portfolio"]}
      />
      {error ? <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

      <div className="grid gap-6 xl:grid-cols-2">
        <div id="projects" className="scroll-mt-24">
        <SectionCard
          title="Projects"
          description="Gallery work displayed on the public site."
          actions={<button type="button" onClick={() => { setDraft({ ...draft, projects: [{ title: "", category: "", location: "", imageKey: "gallery-solar-1" }, ...draft.projects] }); setEditing({ key: "projects", index: 0 }); }} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-3 py-2 text-sm font-medium text-white"><Plus className="h-4 w-4" /> Add project</button>}
        >
          {draft.projects.length ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {draft.projects.map((project, index) => (
                <div key={`${project.title}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="mb-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs leading-5 text-slate-500">
                    {project.imageSource === "cloudinary" && project.imageUrl ? "Cloudinary image" : "Current image key"}: <span className="font-mono text-slate-700">{project.imagePublicId || project.imageKey}</span>
                  </p>
                  <p className="font-semibold text-slate-950">{project.title || "Untitled project"}</p>
                  <p className="mt-1 text-sm text-slate-500">{project.category || "Category"} · {project.location || "Location"}</p>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <ReorderButtons index={index} length={draft.projects.length} onMove={(from, to) => setDraft({ ...draft, projects: moveItem(draft.projects, from, to) })} />
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setEditing({ key: "projects", index })} className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700"><Edit3 className="h-4 w-4" /></button>
                      <button type="button" onClick={() => setDeleting({ key: "projects", index })} className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-red-100 bg-white text-red-600"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : <EmptyState title="No projects yet" description="Add projects for the public gallery." />}
        </SectionCard>
        </div>

        <div id="testimonials" className="scroll-mt-24">
        <SectionCard
          title="Testimonials"
          description="Client quotes and star ratings."
          actions={<button type="button" onClick={() => { setDraft({ ...draft, testimonials: [{ name: "", role: "", text: "", rating: 5 }, ...draft.testimonials] }); setEditing({ key: "testimonials", index: 0 }); }} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-3 py-2 text-sm font-medium text-white"><Plus className="h-4 w-4" /> Add testimonial</button>}
        >
          <div className="space-y-3">
            {draft.testimonials.map((testimonial, index) => (
              <div key={`${testimonial.name}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-950">{testimonial.name || "Client name"}</p>
                    <p className="text-sm text-slate-500">{testimonial.role || "Role/company"}</p>
                  </div>
                  <RatingInput value={testimonial.rating} onChange={(rating) => {
                    const testimonials = [...draft.testimonials];
                    testimonials[index] = { ...testimonial, rating };
                    setDraft({ ...draft, testimonials });
                  }} />
                </div>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{testimonial.text || "Testimonial text"}</p>
                <div className="mt-4 flex justify-end gap-2">
                  <button type="button" onClick={() => setEditing({ key: "testimonials", index })} className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700"><Edit3 className="h-4 w-4" /></button>
                  <button type="button" onClick={() => setDeleting({ key: "testimonials", index })} className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-red-100 bg-white text-red-600"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div id="milestones" className="scroll-mt-24">
        <SectionCard
          title="Milestones"
          description="Company timeline shown on the about page."
          actions={<button type="button" onClick={() => { setDraft({ ...draft, about: { ...draft.about, milestones: [{ year: "", event: "" }, ...draft.about.milestones] } }); setEditing({ key: "milestones", index: 0 }); }} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-3 py-2 text-sm font-medium text-white"><Plus className="h-4 w-4" /> Add milestone</button>}
        >
          <div className="space-y-3">
            {draft.about.milestones.map((milestone, index) => (
              <div key={`${milestone.year}-${index}`} className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[100px_minmax(0,1fr)_auto_auto] md:items-center">
                <p className="font-semibold text-cyan-700">{milestone.year || "Year"}</p>
                <p className="text-sm text-slate-700">{milestone.event || "Event description"}</p>
                <ReorderButtons index={index} length={draft.about.milestones.length} onMove={(from, to) => setDraft({ ...draft, about: { ...draft.about, milestones: moveItem(draft.about.milestones, from, to) } })} />
                <div className="flex gap-2">
                  <button type="button" onClick={() => setEditing({ key: "milestones", index })} className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700"><Edit3 className="h-4 w-4" /></button>
                  <button type="button" onClick={() => setDeleting({ key: "milestones", index })} className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-red-100 bg-white text-red-600"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
        </div>

        <div id="team" className="scroll-mt-24">
        <SectionCard
          title="Leadership team"
          description="Team profiles with portrait keys and bios."
          actions={<button type="button" onClick={() => { setDraft({ ...draft, about: { ...draft.about, team: [{ name: "", role: "", bio: "", imageKey: "team-ceo" }, ...draft.about.team] } }); setEditing({ key: "team", index: 0 }); }} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-3 py-2 text-sm font-medium text-white"><Plus className="h-4 w-4" /> Add person</button>}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {draft.about.team.map((member, index) => (
              <div key={`${member.name}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="mb-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs leading-5 text-slate-500">
                  {member.imageSource === "cloudinary" && member.imageUrl ? "Cloudinary image" : "Current image key"}: <span className="font-mono text-slate-700">{member.imagePublicId || member.imageKey}</span>
                </p>
                <p className="font-semibold text-slate-950">{member.name || "Name"}</p>
                <p className="text-sm text-cyan-700">{member.role || "Role"}</p>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{member.bio || "Short bio"}</p>
                <div className="mt-4 flex justify-end gap-2">
                  <button type="button" onClick={() => setEditing({ key: "team", index })} className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700"><Edit3 className="h-4 w-4" /></button>
                  <button type="button" onClick={() => setDeleting({ key: "team", index })} className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-red-100 bg-white text-red-600"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
        </div>
      </div>

      {editProject ? (
        <EditorModal title={editProject.title || "Project"} onClose={() => setEditing(null)}>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Title" error={fieldErrors[`projects.${editing!.index}.title`]}><input className={inputClass} value={editProject.title} onChange={(event) => {
              const projects = [...draft.projects]; projects[editing!.index] = { ...editProject, title: event.target.value }; setDraft({ ...draft, projects });
            }} /></FormField>
            <FormField label="Category" error={fieldErrors[`projects.${editing!.index}.category`]}><input className={inputClass} value={editProject.category} onChange={(event) => {
              const projects = [...draft.projects]; projects[editing!.index] = { ...editProject, category: event.target.value }; setDraft({ ...draft, projects });
            }} /></FormField>
          </div>
          <FormField label="Location" error={fieldErrors[`projects.${editing!.index}.location`]}><input className={inputClass} value={editProject.location} onChange={(event) => {
            const projects = [...draft.projects]; projects[editing!.index] = { ...editProject, location: event.target.value }; setDraft({ ...draft, projects });
          }} /></FormField>
          <FormField label="Image"><ImagePicker value={editProject.imageKey} imageUrl={editProject.imageUrl} imagePublicId={editProject.imagePublicId} imageSource={editProject.imageSource} onChange={(imageKey, image) => {
            const projects = [...draft.projects]; projects[editing!.index] = { ...editProject, imageKey, ...image }; setDraft({ ...draft, projects });
          }} /></FormField>
        </EditorModal>
      ) : null}

      {editTestimonial ? (
        <EditorModal title={editTestimonial.name || "Testimonial"} onClose={() => setEditing(null)}>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Client name" error={fieldErrors[`testimonials.${editing!.index}.name`]}><input className={inputClass} value={editTestimonial.name} onChange={(event) => {
              const testimonials = [...draft.testimonials]; testimonials[editing!.index] = { ...editTestimonial, name: event.target.value }; setDraft({ ...draft, testimonials });
            }} /></FormField>
            <FormField label="Role/company" error={fieldErrors[`testimonials.${editing!.index}.role`]}><input className={inputClass} value={editTestimonial.role} onChange={(event) => {
              const testimonials = [...draft.testimonials]; testimonials[editing!.index] = { ...editTestimonial, role: event.target.value }; setDraft({ ...draft, testimonials });
            }} /></FormField>
          </div>
          <FormField label="Testimonial" error={fieldErrors[`testimonials.${editing!.index}.text`]}><textarea className={textareaClass} value={editTestimonial.text} onChange={(event) => {
            const testimonials = [...draft.testimonials]; testimonials[editing!.index] = { ...editTestimonial, text: event.target.value }; setDraft({ ...draft, testimonials });
          }} /></FormField>
          <FormField label="Rating"><RatingInput value={editTestimonial.rating} onChange={(rating) => {
            const testimonials = [...draft.testimonials]; testimonials[editing!.index] = { ...editTestimonial, rating }; setDraft({ ...draft, testimonials });
          }} /></FormField>
        </EditorModal>
      ) : null}

      {editMilestone ? (
        <EditorModal title={editMilestone.year || "Milestone"} onClose={() => setEditing(null)}>
          <FormField label="Year" error={fieldErrors[`milestones.${editing!.index}.year`]}><input className={inputClass} value={editMilestone.year} onChange={(event) => {
            const milestones = [...draft.about.milestones]; milestones[editing!.index] = { ...editMilestone, year: event.target.value }; setDraft({ ...draft, about: { ...draft.about, milestones } });
          }} /></FormField>
          <FormField label="Event" error={fieldErrors[`milestones.${editing!.index}.event`]}><textarea className={textareaClass} value={editMilestone.event} onChange={(event) => {
            const milestones = [...draft.about.milestones]; milestones[editing!.index] = { ...editMilestone, event: event.target.value }; setDraft({ ...draft, about: { ...draft.about, milestones } });
          }} /></FormField>
        </EditorModal>
      ) : null}

      {editTeam ? (
        <EditorModal title={editTeam.name || "Team member"} onClose={() => setEditing(null)}>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Name" error={fieldErrors[`team.${editing!.index}.name`]}><input className={inputClass} value={editTeam.name} onChange={(event) => {
              const team = [...draft.about.team]; team[editing!.index] = { ...editTeam, name: event.target.value }; setDraft({ ...draft, about: { ...draft.about, team } });
            }} /></FormField>
            <FormField label="Role" error={fieldErrors[`team.${editing!.index}.role`]}><input className={inputClass} value={editTeam.role} onChange={(event) => {
              const team = [...draft.about.team]; team[editing!.index] = { ...editTeam, role: event.target.value }; setDraft({ ...draft, about: { ...draft.about, team } });
            }} /></FormField>
          </div>
          <FormField label="Bio" error={fieldErrors[`team.${editing!.index}.bio`]}><textarea className={textareaClass} value={editTeam.bio} onChange={(event) => {
            const team = [...draft.about.team]; team[editing!.index] = { ...editTeam, bio: event.target.value }; setDraft({ ...draft, about: { ...draft.about, team } });
          }} /></FormField>
          <FormField label="Portrait"><ImagePicker value={editTeam.imageKey} imageUrl={editTeam.imageUrl} imagePublicId={editTeam.imagePublicId} imageSource={editTeam.imageSource} onChange={(imageKey, image) => {
            const team = [...draft.about.team]; team[editing!.index] = { ...editTeam, imageKey, ...image }; setDraft({ ...draft, about: { ...draft.about, team } });
          }} /></FormField>
        </EditorModal>
      ) : null}

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Delete item?"
        description="This removes the item from the draft. Save to publish the change."
        confirmLabel="Delete"
        onCancel={() => setDeleting(null)}
        onConfirm={deleteItem}
      />
      <SaveBar hasChanges={hasChanges} isSaving={isSaving} errorCount={Object.keys(fieldErrors).length} onSave={save} onDiscard={resetDraft} />
      {notice ? <ToastNotice tone={notice.tone} message={notice.message} onClose={() => setNotice(null)} /> : null}
    </PageShell>
  );
}
