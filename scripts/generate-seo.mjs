import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const rootDir = process.cwd();
const publicDir = path.join(rootDir, "public");
const logoPath = path.join(rootDir, "src/assets/logo.png");
const siteUrl = normalizeSiteUrl(
  process.env.VITE_SITE_URL || process.env.SITE_URL || "https://netrix-website.vercel.app",
);
const require = createRequire(import.meta.url);
const sharp = require(path.join(rootDir, "admin/node_modules/sharp"));

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
await generateIcons();

if (siteUrl === "https://netrix-website.vercel.app") {
  console.warn(
    "[seo] VITE_SITE_URL is not set. Generated sitemap/robots with https://netrix-website.vercel.app. Set VITE_SITE_URL if you are deploying on a different domain.",
  );
}

function normalizeSiteUrl(value) {
  const trimmed = value.trim().replace(/\/+$/, "");
  return trimmed || "https://example.com";
}

function escapeXml(value) {
  return value.replace(/&/g, "&amp;");
}

async function generateIcons() {
  const favicon16 = await renderSquarePng(16);
  const favicon32 = await renderSquarePng(32);
  const appleTouchIcon = await renderSquarePng(180);

  fs.writeFileSync(path.join(publicDir, "favicon-16x16.png"), favicon16);
  fs.writeFileSync(path.join(publicDir, "favicon-32x32.png"), favicon32);
  fs.writeFileSync(path.join(publicDir, "apple-touch-icon.png"), appleTouchIcon);
  fs.writeFileSync(path.join(publicDir, "favicon.ico"), createIcoFromPng(favicon32, 32));
}

function renderSquarePng(size) {
  return sharp(logoPath)
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
}

function createIcoFromPng(pngBuffer, size) {
  const header = Buffer.alloc(6 + 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  header.writeUInt8(size === 256 ? 0 : size, 6);
  header.writeUInt8(size === 256 ? 0 : size, 7);
  header.writeUInt8(0, 8);
  header.writeUInt8(0, 9);
  header.writeUInt16LE(1, 10);
  header.writeUInt16LE(32, 12);
  header.writeUInt32LE(pngBuffer.length, 14);
  header.writeUInt32LE(22, 18);

  return Buffer.concat([header, pngBuffer]);
}
