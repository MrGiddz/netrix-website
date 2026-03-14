"use client";

import Link from "next/link";
import { ArrowRight, Database, FileText, Globe } from "lucide-react";
import AdminPageHeader from "@/components/admin-page-header";
import PageShell from "@/components/page-shell";
import { useSiteContent } from "@/components/site-content-provider";
import { buildContentSummary } from "@/lib/content-summary";

const statCardClass =
  "rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm";

export default function DashboardPage() {
  const { content, isLoading } = useSiteContent();
  const summary = buildContentSummary(content);
  const totalItems =
    summary.services +
    summary.additionalServices +
    summary.products +
    summary.projects +
    summary.testimonials +
    summary.faqs +
    summary.team;

  return (
    <PageShell>
      <AdminPageHeader
        eyebrow="Dashboard"
        title="Netrix Content Control Room"
        description="This standalone Next.js admin manages the content collections the public frontend loads from MongoDB-backed API routes."
        actions={
          <>
            <Link
              href="/content"
              className="rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-cyan-300"
            >
              Edit content
            </Link>
            <a
              href="http://localhost:8080"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/20"
            >
              Open frontend
            </a>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "API-backed Collections", value: 7, icon: Database },
          { label: "Total Managed Entries", value: totalItems, icon: FileText },
          { label: "Navigation Links", value: summary.navigation, icon: Globe },
          { label: "Catalog Products", value: summary.products, icon: FileText },
        ].map((item) => (
          <section key={item.label} className={statCardClass}>
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">{item.label}</p>
              <item.icon className="h-4 w-4 text-cyan-600" />
            </div>
            <p className="mt-4 text-3xl font-semibold text-slate-950">
              {isLoading ? "..." : item.value}
            </p>
          </section>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.9fr)]">
        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-6 py-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">Managed Collections</h2>
              <p className="mt-1 text-sm text-slate-500">
                MongoDB document sections currently driving the public site.
              </p>
            </div>
            <Link href="/content" className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-950">
              Content editor
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="px-6 py-5">
            <table className="w-full text-left text-sm">
              <thead className="text-slate-500">
                <tr>
                  <th className="pb-3 font-medium">Section</th>
                  <th className="pb-3 font-medium">Items</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Object.entries(summary).map(([key, value]) => (
                  <tr key={key}>
                    <td className="py-3 capitalize text-slate-900">{key}</td>
                    <td className="py-3 text-slate-600">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">Publish Coverage</h2>
          <p className="mt-1 text-sm text-slate-500">
            A quick content completeness signal across the site.
          </p>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-sm text-slate-500">Coverage score</span>
            <span className="text-2xl font-semibold text-slate-950">
              {Math.min(100, Math.round((totalItems / 50) * 100))}%
            </span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-cyan-500"
              style={{ width: `${Math.min(100, Math.round((totalItems / 50) * 100))}%` }}
            />
          </div>
          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <p>Hero headline: {content.hero.title}</p>
            <p>Primary CTA: {content.hero.primaryCtaLabel}</p>
            <p>Lead email: {content.contact.email}</p>
            <p>Portfolio items: {content.projects.length}</p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
