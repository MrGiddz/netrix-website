"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { adminNavItems } from "@/components/admin-nav";
import logo from "../../src/assets/logo.png";

function SidebarLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="space-y-2">
      {adminNavItems.map((item) => {
        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={[
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-cyan-400/15 text-white"
                : "text-slate-300 hover:bg-white/8 hover:text-white",
            ].join(" ")}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

function SidebarPanel({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col bg-slate-950 text-slate-100">
      <div className="border-b border-white/10 px-4 py-4">
        <Link href="/" onClick={onNavigate} className="flex items-center gap-3 text-white">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white/8 ring-1 ring-white/10">
            <Image
              src={logo}
              alt="Netrix logo"
              className="h-8 w-8 object-contain"
              priority
            />
          </div>
          <div className="min-w-0">
            <p className="font-heading text-lg font-800 tracking-tight">
              NETRIX<span className="text-cyan-300"> Admin</span>
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Content Platform
            </p>
          </div>
        </Link>
        <p className="mt-2 text-sm text-slate-400">
          Standalone Next.js CMS app backed by MongoDB.
        </p>
      </div>
      <div className="flex-1 px-3 py-5">
        <SidebarLinks onNavigate={onNavigate} />
      </div>
      <div className="border-t border-white/10 px-4 py-4">
        <a
          href="http://localhost:8080"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-cyan-200 hover:text-white"
        >
          Open public frontend
        </a>
      </div>
    </div>
  );
}

const AdminSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <aside className="hidden min-h-screen border-r border-white/10 lg:block">
        <SidebarPanel />
      </aside>

      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-3 text-slate-950">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white">
              <Image src={logo} alt="Netrix logo" className="h-7 w-7 object-contain" priority />
            </div>
            <div className="min-w-0">
              <p className="font-heading text-lg font-800 tracking-tight">
                NETRIX<span className="text-cyan-600"> Admin</span>
              </p>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-900"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden">
          <div className="h-full w-[280px] shadow-2xl">
            <SidebarPanel onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AdminSidebar;
