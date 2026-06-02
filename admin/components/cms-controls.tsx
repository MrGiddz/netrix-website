"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  BatteryCharging,
  Briefcase,
  Camera,
  Check,
  ChevronDown,
  Cloud,
  Eye,
  Fingerprint,
  Flame,
  Home,
  Image as ImageIcon,
  Layers,
  Loader2,
  Monitor,
  Network,
  Plus,
  Save,
  Shield,
  Star,
  Sun,
  Target,
  Trash2,
  Upload,
  Users,
  Wrench,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { PUBLIC_IMAGE_OPTIONS, getPublicImageOption } from "@/lib/site-content";

export type FieldErrors = Record<string, string>;

export const imageOptions = PUBLIC_IMAGE_OPTIONS;

export const iconOptions: { key: string; label: string; icon: LucideIcon }[] = [
  { key: "sun", label: "Solar", icon: Sun },
  { key: "camera", label: "Camera", icon: Camera },
  { key: "network", label: "Network", icon: Network },
  { key: "battery", label: "Battery", icon: BatteryCharging },
  { key: "flame", label: "Fire", icon: Flame },
  { key: "home", label: "Home", icon: Home },
  { key: "fingerprint", label: "Access", icon: Fingerprint },
  { key: "wrench", label: "Maintenance", icon: Wrench },
  { key: "target", label: "Target", icon: Target },
  { key: "eye", label: "Vision", icon: Eye },
  { key: "award", label: "Award", icon: Star },
  { key: "users", label: "People", icon: Users },
  { key: "shield", label: "Shield", icon: Shield },
  { key: "zap", label: "Power", icon: Zap },
  { key: "layers", label: "Layers", icon: Layers },
  { key: "monitor", label: "Computer", icon: Monitor },
  { key: "briefcase", label: "Business", icon: Briefcase },
  { key: "cloud", label: "Cloud", icon: Cloud },
];

export function SectionCard({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-4 min-[375px]:px-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-slate-950">{title}</h2>
          {description ? <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p> : null}
        </div>
        {actions ? <div className="flex min-w-0 flex-col gap-2 min-[430px]:flex-row min-[430px]:flex-wrap sm:shrink-0">{actions}</div> : null}
      </div>
      <div className="min-w-0 space-y-5 px-4 py-4 min-[375px]:px-5 min-[375px]:py-5">{children}</div>
    </section>
  );
}

export function FormField({
  label,
  helper,
  error,
  children,
}: {
  label: string;
  helper?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-800">{label}</span>
      {children}
      {helper ? <span className="block text-xs leading-5 text-slate-500">{helper}</span> : null}
      {error ? <span className="block text-xs font-medium text-red-600">{error}</span> : null}
    </label>
  );
}

export const inputClass =
  "min-h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 disabled:bg-slate-100 disabled:text-slate-500 sm:text-sm";

export const textareaClass = `${inputClass} min-h-28 resize-y leading-6`;

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-7 text-center min-[375px]:px-5 min-[375px]:py-8">
      <p className="font-medium text-slate-900">{title}</p>
      <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-slate-500">{description}</p>
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function LoadingSkeleton() {
  return (
    <div className="space-y-5">
      <div className="h-36 animate-pulse rounded-2xl bg-slate-200" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-64 animate-pulse rounded-2xl bg-slate-200" />
        <div className="h-64 animate-pulse rounded-2xl bg-slate-200" />
      </div>
    </div>
  );
}

export function ToastNotice({
  tone,
  message,
  onClose,
}: {
  tone: "success" | "error";
  message: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, 3800);
    return () => window.clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-2xl sm:left-auto sm:right-4 sm:max-w-sm">
      <div className="flex items-start gap-3">
        <span
          className={[
            "mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
            tone === "success" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700",
          ].join(" ")}
        >
          {tone === "success" ? <Check className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
        </span>
        <p className="leading-6 text-slate-700">{message}</p>
        <button type="button" onClick={onClose} className="ml-auto text-slate-400 hover:text-slate-700">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function SaveBar({
  hasChanges,
  isSaving,
  errorCount,
  onSave,
  onDiscard,
}: {
  hasChanges: boolean;
  isSaving: boolean;
  errorCount?: number;
  onSave: () => void;
  onDiscard: () => void;
}) {
  return (
    <div className="sticky bottom-3 z-20 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-2xl backdrop-blur sm:bottom-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900">
            {hasChanges ? "Unsaved changes" : "All changes saved"}
          </p>
          <p className="text-xs text-slate-500">
            {errorCount ? `${errorCount} field issue${errorCount === 1 ? "" : "s"} to fix.` : "Save to publish changes to the public website."}
          </p>
        </div>
        <div className="grid gap-2 min-[430px]:grid-cols-2 sm:flex sm:shrink-0">
          <button
            type="button"
            onClick={onDiscard}
            disabled={!hasChanges || isSaving}
            className="min-h-11 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={!hasChanges || isSaving || Boolean(errorCount)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  tone = "danger",
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  tone?: "danger" | "primary";
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 px-3 py-3 sm:items-center sm:px-4">
      <div className="max-h-[calc(100dvh-24px)] w-full max-w-md overflow-auto rounded-2xl bg-white p-4 shadow-2xl min-[375px]:p-5">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700">
            <AlertTriangle className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
          </div>
        </div>
        <div className="mt-6 grid gap-2 min-[430px]:grid-cols-2 sm:flex sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="min-h-11 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={[
              "min-h-11 rounded-xl px-4 py-2.5 text-sm font-medium text-white",
              tone === "danger" ? "bg-red-600 hover:bg-red-700" : "bg-slate-950 hover:bg-slate-800",
            ].join(" ")}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ReorderButtons({
  index,
  length,
  onMove,
}: {
  index: number;
  length: number;
  onMove: (from: number, to: number) => void;
}) {
  return (
    <div className="flex gap-1">
      <button
        type="button"
        aria-label="Move up"
        disabled={index === 0}
        onClick={() => onMove(index, index - 1)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
      >
        <ArrowUp className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="Move down"
        disabled={index === length - 1}
        onClick={() => onMove(index, index + 1)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
      >
        <ArrowDown className="h-4 w-4" />
      </button>
    </div>
  );
}

export function addButton(label: string, onClick: () => void) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
    >
      <Plus className="h-4 w-4" />
      {label}
    </button>
  );
}

export function RepeatableListEditor({
  values,
  onChange,
  placeholder = "Add item",
  addLabel = "Add item",
  errors = {},
}: {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  addLabel?: string;
  errors?: FieldErrors;
}) {
  const move = (from: number, to: number) => {
    const next = [...values];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {values.map((value, index) => (
        <div key={index} className="grid gap-2 min-[430px]:grid-cols-[minmax(0,1fr)_auto_auto]">
          <input
            value={value}
            placeholder={placeholder}
            onChange={(event) => {
              const next = [...values];
              next[index] = event.target.value;
              onChange(next);
            }}
            className={inputClass}
          />
          <ReorderButtons index={index} length={values.length} onMove={move} />
          <button
            type="button"
            aria-label="Remove item"
            onClick={() => onChange(values.filter((_, itemIndex) => itemIndex !== index))}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-100 text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      {Object.values(errors).map((error) => (
        <p key={error} className="text-xs font-medium text-red-600">
          {error}
        </p>
      ))}
      <button
        type="button"
        onClick={() => onChange([...values, ""])}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        <Plus className="h-4 w-4" />
        {addLabel}
      </button>
    </div>
  );
}

export function IconPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const SelectedIcon = iconOptions.find((option) => option.key === value)?.icon || Sun;

  return (
    <div className="grid min-w-0 gap-3 sm:grid-cols-[180px_minmax(0,1fr)]">
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
        <SelectedIcon className="h-5 w-5 text-cyan-700" />
        <span className="text-sm font-medium text-slate-800">
          {iconOptions.find((option) => option.key === value)?.label || value}
        </span>
      </div>
      <div className="relative">
        <select value={value} onChange={(event) => onChange(event.target.value)} className={`${inputClass} appearance-none pr-10`}>
          {iconOptions.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-slate-400" />
      </div>
    </div>
  );
}

export function ImagePicker({
  value,
  imageUrl,
  imagePublicId,
  imageSource,
  onChange,
  error,
}: {
  value: string;
  imageUrl?: string;
  imagePublicId?: string;
  imageSource?: "public" | "cloudinary";
  onChange: (
    value: string,
    metadata?: {
      imageUrl?: string;
      imagePublicId?: string;
      imageSource?: "public" | "cloudinary";
    },
  ) => void;
  error?: string;
}) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const selected = getPublicImageOption(value);
  const isCloudinary = imageSource === "cloudinary" && Boolean(imageUrl);
  const currentSrc = isCloudinary ? imageUrl! : selected.src;
  const currentLabel = isCloudinary ? imagePublicId || "Cloudinary image" : selected.label;
  const sourceLabel = isCloudinary ? "Cloudinary" : "Public";

  const uploadImage = async (file: File | undefined) => {
    setUploadError("");
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setUploadError("Choose a valid image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image must be 5MB or smaller.");
      return;
    }

    setUploading(true);
    try {
      const body = new FormData();
      body.set("file", file);
      const response = await fetch("/api/media/upload", {
        method: "POST",
        body,
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.image?.secureUrl || !payload?.image?.publicId) {
        throw new Error(payload?.error || "Image upload failed.");
      }
      onChange(value, {
        imageUrl: payload.image.secureUrl,
        imagePublicId: payload.image.publicId,
        imageSource: "cloudinary",
      });
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex min-w-0 flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 min-[430px]:flex-row min-[430px]:items-center">
        <button
          type="button"
          onClick={() => setPreviewOpen(true)}
          className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white min-[430px]:h-20 min-[430px]:w-28"
          aria-label="Preview selected image"
        >
          <img src={currentSrc} alt="" className="h-full w-full object-cover" />
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-sm font-semibold text-slate-950">{currentLabel}</p>
            <span className={["rounded-full px-2 py-0.5 text-[11px] font-semibold", isCloudinary ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"].join(" ")}>
              {sourceLabel}
            </span>
          </div>
          <p className="mt-1 truncate text-xs text-slate-500">
            {isCloudinary ? imageUrl : `Current image key: ${selected.key}`}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => setPreviewOpen(true)} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 hover:bg-slate-50">
              <Eye className="h-4 w-4" /> Preview
            </button>
            {isCloudinary ? (
              <button
                type="button"
                onClick={() => onChange(value, { imageSource: "public", imageUrl: undefined, imagePublicId: undefined })}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Use default image
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="relative">
          <select
            value={value}
            onChange={(event) => onChange(event.target.value, { imageSource: "public", imageUrl: undefined, imagePublicId: undefined })}
            className={`${inputClass} appearance-none pr-10`}
          >
          {imageOptions.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-slate-400" />
        </div>
        <label className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {uploading ? "Uploading" : "Upload new image"}
          <input type="file" accept="image/*" className="sr-only" disabled={uploading} onChange={(event) => void uploadImage(event.target.files?.[0])} />
        </label>
      </div>
      <p className="text-xs leading-5 text-slate-500">{selected.hint}</p>
      {uploadError ? <p className="text-xs font-medium text-red-600">{uploadError}</p> : null}
      {error ? <p className="text-xs font-medium text-red-600">{error}</p> : null}

      {previewOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/70 px-3 py-3 sm:items-center sm:px-4" onMouseDown={() => setPreviewOpen(false)}>
          <div className="max-h-[calc(100dvh-24px)] w-full max-w-3xl overflow-auto rounded-2xl bg-white p-4 shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-950">{currentLabel}</p>
                <p className="truncate text-xs text-slate-500">{sourceLabel}</p>
              </div>
              <button type="button" onClick={() => setPreviewOpen(false)} className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50">
                <X className="h-4 w-4" />
              </button>
            </div>
            <img src={currentSrc} alt="" className="max-h-[70dvh] w-full rounded-xl object-contain" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function RatingInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          aria-label={`${rating} stars`}
          onClick={() => onChange(rating)}
          className="min-h-11 min-w-11 rounded-lg p-1 text-amber-500 hover:bg-amber-50"
        >
          <Star className={rating <= value ? "h-6 w-6 fill-current" : "h-6 w-6"} />
        </button>
      ))}
    </div>
  );
}

export function useDraft<T>(value: T) {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const hasChanges = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(value),
    [draft, value],
  );

  useEffect(() => {
    if (!hasChanges) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasChanges]);

  return { draft, setDraft, hasChanges, resetDraft: () => setDraft(value) };
}

export function moveItem<T>(items: T[], from: number, to: number) {
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export function required(value: string, label: string) {
  return value.trim() ? "" : `${label} is required.`;
}
