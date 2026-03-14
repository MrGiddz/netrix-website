import { defaultSiteContent, siteContentSchema, type SiteContent } from "@/lib/site-content";
import { getMongoCollection } from "@/lib/mongodb";

const COLLECTION_NAME = "site_content";
const DOCUMENT_KEY = "primary";

export async function getStoredContent() {
  const collection = await getMongoCollection(COLLECTION_NAME);
  const existing = await collection.findOne<{ key: string; content: SiteContent }>({
    key: DOCUMENT_KEY,
  });

  if (existing?.content) {
    const parsed = siteContentSchema.safeParse(existing.content);
    if (parsed.success) {
      return parsed.data;
    }
  }

  await saveContent(defaultSiteContent);
  return defaultSiteContent;
}

export async function saveContent(content: SiteContent) {
  const collection = await getMongoCollection(COLLECTION_NAME);
  await collection.updateOne(
    { key: DOCUMENT_KEY },
    {
      $set: {
        key: DOCUMENT_KEY,
        content,
        updatedAt: new Date().toISOString(),
      },
    },
    { upsert: true },
  );

  return content;
}
