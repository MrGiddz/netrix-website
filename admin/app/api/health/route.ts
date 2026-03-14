import { NextResponse } from "next/server";
import { API_CORS_HEADERS } from "@/lib/api-cors";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ status: "ok" }, { headers: API_CORS_HEADERS });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: API_CORS_HEADERS });
}
