import type { ReactNode } from "react";

type AdminPageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

const AdminPageHeader = ({
  eyebrow,
  title,
  description,
  actions,
}: AdminPageHeaderProps) => (
  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-700 text-white shadow-xl">
    <div className="flex flex-col gap-6 px-6 py-8 md:px-8 md:py-10 lg:flex-row lg:items-start lg:justify-between">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
          {eyebrow}
        </p>
        <div className="space-y-2">
          <h1 className="text-3xl font-800 md:text-4xl">{title}</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-200 md:text-base">
            {description}
          </p>
        </div>
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  </div>
);

export default AdminPageHeader;
