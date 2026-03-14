import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Providers from "./providers";
import AdminSidebar from "@/components/admin-sidebar";

const heading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Netrix Admin",
  description: "Standalone Netrix content dashboard and API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        <Providers>
          <div className="min-h-screen bg-slate-100 text-slate-950">
            <div className="grid min-h-screen lg:grid-cols-[280px_minmax(0,1fr)]">
              <AdminSidebar />
              <main className="min-w-0">
                <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
