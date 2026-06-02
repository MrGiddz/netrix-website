import { NextResponse } from "next/server";
import { API_CORS_HEADERS } from "@/lib/api-cors";
import { jsonOk } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return jsonOk({ status: "ok" });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: API_CORS_HEADERS });
}
