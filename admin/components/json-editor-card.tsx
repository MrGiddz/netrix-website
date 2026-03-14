"use client";

import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";

type JsonEditorCardProps<T> = {
  title: string;
  description: string;
  value: T;
  onSave: (nextValue: T) => Promise<void>;
};

const JsonEditorCard = <T,>({
  title,
  description,
  value,
  onSave,
}: JsonEditorCardProps<T>) => {
  const [draft, setDraft] = useState(JSON.stringify(value, null, 2));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDraft(JSON.stringify(value, null, 2));
  }, [value]);

  const handleSave = async () => {
    setError("");
    try {
      const parsed = JSON.parse(draft) as T;
      setSaving(true);
      await onSave(parsed);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="space-y-2 border-b border-slate-100 px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <div className="space-y-4 px-6 py-5">
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          className="min-h-[260px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-xs text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white"
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save section
        </button>
      </div>
    </section>
  );
};

export default JsonEditorCard;
