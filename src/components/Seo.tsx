import { useEffect } from "react";
import {
  SEO_DEFAULT_DESCRIPTION,
  SEO_DEFAULT_IMAGE_PATH,
  SEO_SITE_NAME,
  getAbsoluteUrl,
} from "@/lib/seo";

type SchemaValue = Record<string, unknown> | Array<Record<string, unknown>>;

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: string;
  noindex?: boolean;
  schema?: SchemaValue;
};

const Seo = ({
  title = SEO_SITE_NAME,
  description = SEO_DEFAULT_DESCRIPTION,
  path = "/",
  image = SEO_DEFAULT_IMAGE_PATH,
  type = "website",
  noindex = false,
  schema,
}: SeoProps) => {
  useEffect(() => {
    const url = getAbsoluteUrl(path);
    const imageUrl = getAbsoluteUrl(image);
    const resolvedTitle = title.includes(SEO_SITE_NAME) ? title : `${title} | ${SEO_SITE_NAME}`;

    document.title = resolvedTitle;

    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[name="author"]', "name", "author", SEO_SITE_NAME);
    setMeta('meta[name="robots"]', "name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    setMeta('meta[name="theme-color"]', "name", "theme-color", "#132645");
    setMeta('meta[property="og:title"]', "property", "og:title", resolvedTitle);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:type"]', "property", "og:type", type);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[property="og:site_name"]', "property", "og:site_name", SEO_SITE_NAME);
    setMeta('meta[property="og:locale"]', "property", "og:locale", "en_NG");
    setMeta('meta[property="og:image"]', "property", "og:image", imageUrl);
    setMeta('meta[property="og:image:alt"]', "property", "og:image:alt", `${SEO_SITE_NAME} preview image`);
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", resolvedTitle);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", imageUrl);

    setCanonical(url);
    setSchema(schema);
  }, [description, image, noindex, path, schema, title, type]);

  return null;
};

function setMeta(selector: string, attributeName: "name" | "property", attributeValue: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }

  element.setAttribute(attributeName, attributeValue);
  element.content = content;
}

function setCanonical(url: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }

  link.href = url;
}

function setSchema(schema?: SchemaValue) {
  const existing = document.getElementById("seo-schema");

  if (!schema) {
    existing?.remove();
    return;
  }

  const script = existing || document.createElement("script");
  script.id = "seo-schema";
  script.setAttribute("type", "application/ld+json");
  script.textContent = JSON.stringify(schema);

  if (!existing) {
    document.head.appendChild(script);
  }
}

export default Seo;
