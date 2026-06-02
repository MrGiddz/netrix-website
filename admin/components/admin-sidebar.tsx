"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, ShieldCheck, X } from "lucide-react";
import { adminNavItems } from "@/components/admin-nav";
import { ADMIN_DISPLAY_NAME, ADMIN_ROLE, PUBLIC_SITE_URL } from "@/lib/admin-config";

type AdminSidebarProps = {
  open: boolean;
  onClose: () => void;
};

function SidebarPanel({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const sections = Array.from(new Set(adminNavItems.map((item) => item.section || "Main")));

  return (
    <div className="flex h-dvh max-h-dvh min-h-0 flex-col overflow-hidden bg-[#071b2f] text-slate-100">
      <div className="shrink-0 border-b border-white/10 px-4 py-5">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" onClick={onNavigate} className="flex min-w-0 items-center gap-3 text-white">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-blue-500/15 ring-1 ring-blue-400/20">
              <Image src="/logo.png" alt="Netrix logo" className="h-8 w-8 scale-150 object-contain" width={32} height={32} priority />
            </div>
            <p className="truncate font-heading text-lg font-800 tracking-tight">
              NETRIX <span className="text-slate-200">Admin</span>
            </p>
          </Link>
          <button
            type="button"
            onClick={onNavigate}
            aria-label="Close navigation"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-300 hover:bg-white/10 lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-3 py-4 [scrollbar-gutter:stable]">
        {sections.map((section) => (
          <div key={section} className="space-y-2">
            {section !== "Main" ? (
              <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                {section}
              </p>
            ) : null}
            <nav className="space-y-1" aria-label={`${section} navigation`}>
              {adminNavItems
                .filter((item) => (item.section || "Main") === section)
                .map((item) => {
                  const baseHref = item.href.split("#")[0];
                  const isActive =
                    item.href === "/" ? pathname === "/" : !item.href.includes("#") && pathname === baseHref;
                  return (
                    <Link
                      key={`${item.section}-${item.label}`}
                      href={item.href}
                      onClick={onNavigate}
                      className={[
                        "flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                        isActive
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-950/30"
                          : "text-slate-300 hover:bg-white/10 hover:text-white",
                      ].join(" ")}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
            </nav>
          </div>
        ))}
      </div>

      <div className="shrink-0 space-y-3 border-t border-white/10 px-4 py-4">
        <a
          href={PUBLIC_SITE_URL}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm transition hover:bg-white/10"
        >
          <span className="flex items-start gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-cyan-200">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <span>
              <span className="block font-semibold text-white">View Website</span>
              <span className="mt-1 block text-xs leading-5 text-slate-400">Open public site</span>
            </span>
          </span>
          <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-white" />
        </a>

        <div className="flex items-center gap-3">
          <span className="relative h-10 w-10 overflow-hidden rounded-full bg-slate-700">
            <Image src="/logo.png" alt="" fill sizes="40px" className="scale-150 object-contain" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">{ADMIN_DISPLAY_NAME}</p>
            <p className="truncate text-xs text-slate-400">{ADMIN_ROLE}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden h-dvh w-[280px] border-r border-white/10 lg:block">
        <SidebarPanel />
      </aside>

      {open ? (
        <div className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden" role="presentation" onClick={onClose}>
          <div
            className="h-dvh w-[min(88vw,300px)] shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Admin navigation"
            onClick={(event) => event.stopPropagation()}
          >
            <SidebarPanel onNavigate={onClose} />
          </div>
        </div>
      ) : null}
    </>
  );
}
