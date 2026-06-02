import { NextResponse } from "next/server";
import { API_CORS_HEADERS } from "@/lib/api-cors";
import { jsonError, jsonOk } from "@/lib/api-response";
import { defaultSiteContent } from "@/lib/site-content";
import { saveContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const content = await saveContent(defaultSiteContent);
    return jsonOk({ success: true, content });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to seed content");
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: API_CORS_HEADERS });
}
