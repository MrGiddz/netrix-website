import type { ReactNode } from "react";

type AdminPageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  breadcrumbs?: string[];
};

const AdminPageHeader = ({
  eyebrow,
  title,
  description,
  actions,
  breadcrumbs,
}: AdminPageHeaderProps) => (
  <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="flex flex-col gap-4 px-4 py-5 min-[375px]:px-5 sm:gap-6 md:px-7 md:py-6 lg:flex-row lg:items-start lg:justify-between">
      <div className="space-y-3">
        {breadcrumbs?.length ? (
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            {breadcrumbs.map((item, index) => (
              <span key={`${item}-${index}`} className="flex items-center gap-2">
                <span>{item}</span>
                {index < breadcrumbs.length - 1 ? <span className="text-slate-300">/</span> : null}
              </span>
            ))}
          </div>
        ) : null}
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">
          {eyebrow}
        </p>
        <div className="space-y-2">
          <h1 className="break-words text-2xl font-800 leading-tight text-slate-950 md:text-3xl">{title}</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
            {description}
          </p>
        </div>
      </div>
      {actions ? <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">{actions}</div> : null}
    </div>
  </div>
);

export default AdminPageHeader;
