import { NextResponse } from "next/server";
import { API_CORS_HEADERS } from "@/lib/api-cors";
import { getStoredContent, saveContent } from "@/lib/content-store";
import { siteContentSchema } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const content = await getStoredContent();
    return NextResponse.json({ content }, { headers: API_CORS_HEADERS });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load content" },
      { status: 500, headers: API_CORS_HEADERS },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const parsed = siteContentSchema.safeParse(body.content);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid site content payload", details: parsed.error.flatten() },
        { status: 400, headers: API_CORS_HEADERS },
      );
    }

    const content = await saveContent(parsed.data);
    return NextResponse.json({ content }, { headers: API_CORS_HEADERS });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save content" },
      { status: 500, headers: API_CORS_HEADERS },
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: API_CORS_HEADERS });
}
