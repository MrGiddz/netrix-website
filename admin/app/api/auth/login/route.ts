import { NextResponse } from "next/server";
import {
  AUTH_COOKIE_NAME,
  AUTH_TOKEN_TTL_SECONDS,
  createAdminToken,
  getAdminCredentials,
  getAdminProfile,
} from "@/lib/auth";
import { API_CORS_HEADERS } from "@/lib/api-cors";
import { jsonError, jsonOk, readJsonBody } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await readJsonBody(request);
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";
    const credentials = getAdminCredentials();

    if (email !== credentials.email.toLowerCase() || password !== credentials.password) {
      return jsonError("Invalid email or password.", 401);
    }

    const token = await createAdminToken();
    const response = jsonOk({ success: true, token, admin: getAdminProfile() });

    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: AUTH_TOKEN_TTL_SECONDS,
    });

    return response;
  } catch (error) {
    if (error instanceof Error && error.message === "INVALID_JSON") {
      return jsonError("Request body must be valid JSON.", 400);
    }
    return jsonError(error instanceof Error ? error.message : "Login failed.", 500);
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: API_CORS_HEADERS });
}
