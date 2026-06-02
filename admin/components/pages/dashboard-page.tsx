"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FileQuestion,
  FolderKanban,
  Image,
  MessageSquareQuote,
  Package,
  PenLine,
  Phone,
  Link as LinkIcon,
  Users,
  Wrench,
} from "lucide-react";
import { EmptyState, SectionCard } from "@/components/cms-controls";
import PageShell from "@/components/page-shell";
import StatCard from "@/components/stat-card";
import { useSiteContent } from "@/components/site-content-provider";
import { ADMIN_DISPLAY_NAME, PUBLIC_SITE_URL } from "@/lib/admin-config";
import { buildContentSummary } from "@/lib/content-summary";

const quickActions = [
  { title: "Edit Homepage", helper: "Update hero, about, services", href: "/content", icon: PenLine, tone: "bg-blue-50 text-blue-600" },
  { title: "Add Product", helper: "Manage catalog items", href: "/catalog", icon: Package, tone: "bg-emerald-50 text-emerald-600" },
  { title: "Add Project", helper: "Add gallery work", href: "/portfolio", icon: FolderKanban, tone: "bg-pink-50 text-pink-600" },
  { title: "Add Testimonial", helper: "Edit client quotes", href: "/portfolio", icon: MessageSquareQuote, tone: "bg-orange-50 text-orange-600" },
  { title: "Manage Team", helper: "Edit team profiles", href: "/portfolio", icon: Users, tone: "bg-violet-50 text-violet-600" },
  { title: "Manage FAQ", helper: "Edit customer questions", href: "/content", icon: FileQuestion, tone: "bg-cyan-50 text-cyan-600" },
  { title: "Update Contact Info", helper: "Phones, email, WhatsApp", href: "/settings", icon: Phone, tone: "bg-slate-100 text-slate-600" },
  { title: "Preview Website", helper: "Open public site", href: PUBLIC_SITE_URL, icon: Image, tone: "bg-blue-50 text-blue-600", external: true },
];

export default function DashboardPage() {
  const { content, isLoading } = useSiteContent();
  const summary = buildContentSummary(content);
  const recentUpdates = [
    { title: "Homepage hero", detail: content.hero.title, area: "Homepage", icon: BookOpen },
    { title: "Catalog inventory", detail: `${content.products.length} products published`, area: "Catalog", icon: Package },
    { title: "Latest project", detail: content.projects[0]?.title || "No projects yet", area: "Portfolio", icon: FolderKanban },
    { title: "Testimonials", detail: `${content.testimonials.length} quotes live`, area: "Testimonials", icon: MessageSquareQuote },
    { title: "Contact details", detail: content.contact.email, area: "Settings", icon: Phone },
  ];

  return (
    <PageShell>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-600">Dashboard</p>
          <h1 className="mt-2 text-2xl font-800 tracking-tight text-slate-950 md:text-3xl">
            Welcome back, {ADMIN_DISPLAY_NAME}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Review and update the content published on the Netrix website.
          </p>
        </div>
        <a
          href={PUBLIC_SITE_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          Preview Website
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Content Sections" value={isLoading ? "..." : 7} helper="Homepage, navigation, FAQ and settings" icon={BookOpen} tone="blue" />
        <StatCard label="Products" value={isLoading ? "..." : summary.products} helper="Catalog items on the products page" icon={Package} tone="green" />
        <StatCard label="Projects" value={isLoading ? "..." : summary.projects} helper="Projects in the gallery" icon={FolderKanban} tone="pink" />
        <StatCard label="Services" value={isLoading ? "..." : summary.services + summary.additionalServices} helper="Main and extra service entries" icon={Wrench} tone="orange" />
        <StatCard label="Testimonials" value={isLoading ? "..." : summary.testimonials} helper="Client quotes on the site" icon={MessageSquareQuote} tone="purple" />
        <StatCard label="FAQs" value={isLoading ? "..." : summary.faqs} helper="Questions in the FAQ section" icon={FileQuestion} tone="cyan" />
        <StatCard label="Team Members" value={isLoading ? "..." : summary.team} helper="Team profiles on the about page" icon={Users} tone="blue" />
        <StatCard label="Navigation Links" value={isLoading ? "..." : summary.navigation} helper="Header and footer links" icon={LinkIcon} tone="green" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <SectionCard
          title="Content Status"
          description="Current content on the public website."
          actions={
            <Link href="/content" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              View all
            </Link>
          }
        >
          {recentUpdates.length ? (
            <div className="space-y-3">
              {recentUpdates.map((update) => (
                <div key={update.title} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    <update.icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-950">{update.title}</p>
                    <p className="truncate text-xs text-slate-500">{update.detail}</p>
                  </div>
                  <span className="hidden rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500 sm:inline-flex">
                    {update.area}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="No content yet" description="Start with the homepage, catalog, or portfolio." />
          )}
        </SectionCard>

        <SectionCard title="Quick Actions" description="Common CMS tasks.">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {quickActions.map((action) => {
              const content = (
                <>
                  <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${action.tone}`}>
                    <action.icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-slate-950">{action.title}</span>
                    <span className="mt-1 block truncate text-xs text-slate-500">{action.helper}</span>
                  </span>
                </>
              );

              const className =
                "flex min-h-[76px] items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md";

              return action.external ? (
                <a key={action.title} href={action.href} target="_blank" rel="noreferrer" className={className}>
                  {content}
                </a>
              ) : (
                <Link key={action.title} href={action.href} className={className}>
                  {content}
                </Link>
              );
            })}
          </div>
        </SectionCard>
      </div>
    </PageShell>
  );
}
