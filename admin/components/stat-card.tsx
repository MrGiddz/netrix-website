import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string | number;
  helper: string;
  icon: LucideIcon;
  tone?: "blue" | "green" | "purple" | "orange" | "pink" | "cyan";
};

const toneClasses = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-emerald-50 text-emerald-600",
  purple: "bg-violet-50 text-violet-600",
  orange: "bg-orange-50 text-orange-600",
  pink: "bg-pink-50 text-pink-600",
  cyan: "bg-cyan-50 text-cyan-600",
};

export default function StatCard({
  label,
  value,
  helper,
  icon: Icon,
  tone = "blue",
}: StatCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md min-[375px]:p-5">
      <div className="flex items-center gap-4">
        <span className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${toneClasses[tone]}`}>
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-1 text-2xl font-800 tracking-tight text-slate-950">{value}</p>
        </div>
      </div>
      <p className="mt-4 text-xs leading-5 text-slate-500">{helper}</p>
    </section>
  );
}
