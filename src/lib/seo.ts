export const SEO_SITE_NAME = "Netrix Systems Limited";
export const SEO_DEFAULT_TITLE = `${SEO_SITE_NAME} — Solar, CCTV, Cabling & ICT Solutions`;
export const SEO_DEFAULT_DESCRIPTION =
  "World-class solar installations, CCTV security, structured cabling, inverters and ICT solutions across Nigeria since 2007.";
export const SEO_DEFAULT_IMAGE_PATH = "/logo.png";

export function getSiteUrl() {
  if (typeof window !== "undefined" && window.location.origin) {
    return window.location.origin;
  }

  return normalizeUrl(import.meta.env.VITE_SITE_URL || "https://example.com"); 
}

export function getAbsoluteUrl(pathname = "/") {
  return new URL(pathname, `${getSiteUrl()}/`).toString();
}

function normalizeUrl(value: string) {
  return value.trim().replace(/\/+$/, "");
}
