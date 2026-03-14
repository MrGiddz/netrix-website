import { NextResponse } from "next/server";
import { API_CORS_HEADERS } from "@/lib/api-cors";
import { defaultSiteContent } from "@/lib/site-content";
import { saveContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const content = await saveContent(defaultSiteContent);
    return NextResponse.json({ content }, { headers: API_CORS_HEADERS });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to seed content" },
      { status: 500, headers: API_CORS_HEADERS },
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: API_CORS_HEADERS });
}
