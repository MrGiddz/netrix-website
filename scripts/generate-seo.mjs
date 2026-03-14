import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const publicDir = path.join(rootDir, "public");
const siteUrl = normalizeSiteUrl(
  process.env.VITE_SITE_URL || process.env.SITE_URL || "https://example.com",
);

const routes = ["/", "/about", "/products"];
const now = new Date().toISOString();

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    const loc = new URL(route, `${siteUrl}/`).toString();
    const priority = route === "/" ? "1.0" : "0.8";
    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(publicDir, "robots.txt"), robots);

if (siteUrl === "https://example.com") {
  console.warn(
    "[seo] VITE_SITE_URL is not set. Generated sitemap/robots with https://example.com. Set VITE_SITE_URL before deploying.",
  );
}

function normalizeSiteUrl(value) {
  const trimmed = value.trim().replace(/\/+$/, "");
  return trimmed || "https://example.com";
}

function escapeXml(value) {
  return value.replace(/&/g, "&amp;");
}
