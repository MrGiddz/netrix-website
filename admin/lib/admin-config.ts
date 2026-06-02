export const ADMIN_DISPLAY_NAME =
  process.env.NEXT_PUBLIC_ADMIN_DISPLAY_NAME || "Netrix Admin";

export const ADMIN_ROLE = process.env.NEXT_PUBLIC_ADMIN_ROLE || "Content Manager";

export const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "";

export const PUBLIC_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL?.replace(/^/, "https://") ||
  "http://localhost:8080";
