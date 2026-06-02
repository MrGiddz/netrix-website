"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin-sidebar";
import AdminTopbar from "@/components/admin-topbar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === "/login") {
    return children;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-950 lg:pl-[280px]">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="min-w-0">
        <AdminTopbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="min-w-0">
          <div className="mx-auto w-full max-w-[1560px] space-y-5 px-3 py-4 min-[375px]:px-4 sm:px-5 md:px-6 md:py-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
