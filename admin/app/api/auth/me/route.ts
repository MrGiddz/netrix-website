import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, getBearerToken, verifyAdminToken } from "@/lib/auth";
import { API_CORS_HEADERS } from "@/lib/api-cors";
import { jsonError, jsonOk } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const token =
    getBearerToken(request) ||
    request.headers
      .get("cookie")
      ?.split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith(`${AUTH_COOKIE_NAME}=`))
      ?.slice(AUTH_COOKIE_NAME.length + 1);
  const admin = await verifyAdminToken(token);

  if (!admin) return jsonError("Unauthorized.", 401);

  return jsonOk({ success: true, admin });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: API_CORS_HEADERS });
}
