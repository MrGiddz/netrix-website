import { NextResponse } from "next/server";
import { API_CORS_HEADERS } from "@/lib/api-cors";
import { jsonError, jsonOk, readJsonBody } from "@/lib/api-response";
import { getStoredContent, saveContent } from "@/lib/content-store";
import { siteContentSchema } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const content = await getStoredContent();
    return jsonOk({ success: true, content });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to load content");
  }
}

export async function PUT(request: Request) {
  try {
    const body = await readJsonBody(request);
    const parsed = siteContentSchema.safeParse(body.content);

    if (!parsed.success) {
      return jsonError("Invalid site content payload", 400, parsed.error.flatten());
    }

    const content = await saveContent(parsed.data);
    return jsonOk({ success: true, content });
  } catch (error) {
    if (error instanceof Error && error.message === "INVALID_JSON") {
      return jsonError("Request body must be valid JSON", 400);
    }
    return jsonError(error instanceof Error ? error.message : "Failed to save content");
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: API_CORS_HEADERS });
}
