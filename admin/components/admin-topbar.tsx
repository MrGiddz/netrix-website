"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  ExternalLink,
  KeyRound,
  LogOut,
  Mail,
  Menu,
  Search,
  UserCog,
  UserPlus,
  X,
} from "lucide-react";
import { adminNavItems } from "@/components/admin-nav";
import { ToastNotice, inputClass, textareaClass } from "@/components/cms-controls";
import { ADMIN_DISPLAY_NAME, ADMIN_EMAIL, ADMIN_ROLE, PUBLIC_SITE_URL } from "@/lib/admin-config";

type Notice = { tone: "success" | "error"; message: string } | null;

function ModalShell({
  title,
  description,
  children,
  onClose,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 px-3 py-3 sm:items-center sm:px-4" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="account-modal-title"
        className="max-h-[calc(100dvh-24px)] w-full max-w-lg overflow-auto rounded-2xl bg-white shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-slate-100 bg-white px-4 py-4 min-[375px]:px-5">
          <div className="min-w-0">
            <h2 id="account-modal-title" className="text-lg font-semibold text-slate-950">
              {title}
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-4 p-4 min-[375px]:p-5">{children}</div>
      </div>
    </div>
  );
}

function InviteUsersModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: typeof errors = {};
    if (!fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const invitePayload = { fullName: fullName.trim(), email: email.trim(), note: note.trim() };
    void invitePayload;
    onSuccess();
    onClose();
  };

  return (
    <ModalShell
      title="Invite users"
      description="Prepare an admin invitation."
      onClose={onClose}
    >
      <form className="space-y-4" onSubmit={submit}>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-800">Full name</span>
          <input className={inputClass} value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Adaeola Okafor" />
          {errors.fullName ? <span className="block text-xs font-medium text-red-600">{errors.fullName}</span> : null}
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-800">Email address</span>
          <input className={inputClass} type="text" inputMode="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@company.com" />
          {errors.email ? <span className="block text-xs font-medium text-red-600">{errors.email}</span> : null}
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-800">Optional note</span>
          <textarea className={textareaClass} value={note} onChange={(event) => setNote(event.target.value)} placeholder="Optional note" />
        </label>
        <div className="grid gap-2 min-[430px]:grid-cols-2 sm:flex sm:justify-end">
          <button type="button" onClick={onClose} className="min-h-11 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Cancel
          </button>
          <button type="submit" className="min-h-11 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
            Prepare invitation
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

export default function AdminTopbar({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const activeItem = adminNavItems.find((item) =>
    item.href === "/" ? pathname === "/" : !item.href.includes("#") && pathname === item.href,
  );

  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const openInvite = () => {
    setMenuOpen(false);
    setInviteOpen(true);
  };

  const openAuth = () => {
    setMenuOpen(false);
    setAuthOpen(true);
  };

  const showPlaceholder = (message: string) => {
    setMenuOpen(false);
    setNotice({ tone: "success", message });
  };

  const signOut = async () => {
    setMenuOpen(false);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.replace("/login");
      router.refresh();
    }
  };

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="flex min-h-[64px] min-w-0 items-center gap-2 px-3 min-[375px]:px-4 sm:px-5 md:gap-3 md:px-6 lg:px-8">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="min-w-0 flex-1 lg:hidden">
            <p className="truncate text-sm font-semibold text-slate-950">Netrix Admin</p>
            <p className="truncate text-xs text-slate-500">{activeItem?.label || "Dashboard"}</p>
          </div>

          <div className="relative hidden min-w-[180px] max-w-md flex-1 md:block lg:flex-none lg:w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search anything..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 xl:pr-14"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[11px] font-medium text-slate-400 xl:block">
              ⌘K
            </span>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2 md:gap-3">
            <button
              type="button"
              aria-label="Open search"
              onClick={() => setMobileSearchOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 md:hidden"
            >
              <Search className="h-5 w-5" />
            </button>
            <a
              href={PUBLIC_SITE_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Preview website"
              className="hidden h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 sm:inline-flex md:w-11 md:px-0 lg:w-auto lg:px-3"
            >
              <span className="hidden lg:inline">Preview Website</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            <button
              type="button"
              aria-label="Notifications"
              className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <Bell className="h-5 w-5" />
            </button>
            <div ref={menuRef} className="relative shrink-0">
            <button
              type="button"
              aria-label="Open account menu"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="flex min-h-11 items-center gap-2 rounded-xl border border-transparent px-1.5 transition hover:border-slate-200 hover:bg-slate-50 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 sm:px-2"
            >
              <span className="relative h-9 w-9 overflow-hidden rounded-full bg-slate-200">
                <Image src="/logo.png" alt="" fill sizes="36px" className="scale-150 object-contain" />
              </span>
              <span className="hidden min-w-0 text-left md:block">
                <span className="block truncate text-sm font-semibold text-slate-950">{ADMIN_DISPLAY_NAME}</span>
                <span className="block truncate text-xs text-slate-500">{ADMIN_ROLE}</span>
              </span>
              <ChevronDown className={["hidden h-4 w-4 text-slate-400 transition md:block", menuOpen ? "rotate-180" : ""].join(" ")} />
            </button>

            {menuOpen ? (
              <div
                role="menu"
                className="absolute right-0 top-[calc(100%+10px)] z-50 w-[min(92vw,320px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
              >
                <div className="border-b border-slate-100 p-4">
                  <p className="truncate text-sm font-semibold text-slate-950">{ADMIN_DISPLAY_NAME}</p>
                  <p className="truncate text-xs text-slate-500">{ADMIN_EMAIL || "No admin email configured"}</p>
                  <p className="mt-2 inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{ADMIN_ROLE}</p>
                </div>
                <div className="p-2">
                  <a href={PUBLIC_SITE_URL} target="_blank" rel="noreferrer" role="menuitem" onClick={() => setMenuOpen(false)} className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50">
                    <ExternalLink className="h-4 w-4 text-slate-500" />
                    Preview website
                  </a>
                  <button type="button" role="menuitem" onClick={() => showPlaceholder("Account settings are not available yet.")} className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50">
                    <UserCog className="h-4 w-4 text-slate-500" />
                    Profile / Account settings
                  </button>
                  <button type="button" role="menuitem" onClick={openInvite} className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50">
                    <UserPlus className="h-4 w-4 text-slate-500" />
                    Invite users
                  </button>
                  <button type="button" role="menuitem" onClick={openAuth} className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50">
                    <KeyRound className="h-4 w-4 text-slate-500" />
                    Authentication settings
                  </button>
                </div>
                <div className="border-t border-slate-100 p-2">
                  <button type="button" role="menuitem" onClick={signOut} className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50">
                    <LogOut className="h-4 w-4 text-slate-500" />
                    Sign out
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        </div>
        {mobileSearchOpen ? (
          <div className="border-t border-slate-100 px-3 py-3 min-[375px]:px-4 md:hidden">
            <label className="relative block">
              <span className="sr-only">Search admin</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                autoFocus
                placeholder="Search admin..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </label>
          </div>
        ) : null}
      </header>
      {inviteOpen ? (
        <InviteUsersModal
          onClose={() => setInviteOpen(false)}
          onSuccess={() => setNotice({ tone: "success", message: "Invitation prepared." })}
        />
      ) : null}
      {authOpen ? (
        <ModalShell
          title="Authentication settings"
          description="Admin sessions use a signed JWT in an HTTP-only cookie."
          onClose={() => setAuthOpen(false)}
        >
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-slate-950">JWT authentication enabled</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Dashboard pages and write APIs require a valid admin token. Set ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_JWT_SECRET in the admin environment.
                </p>
              </div>
            </div>
          </div>
          <button type="button" onClick={() => setAuthOpen(false)} className="min-h-11 w-full rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 sm:w-auto">
            Done
          </button>
        </ModalShell>
      ) : null}
      {notice ? <ToastNotice tone={notice.tone} message={notice.message} onClose={() => setNotice(null)} /> : null}
    </>
  );
}
