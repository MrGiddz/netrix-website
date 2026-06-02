import { NextResponse } from "next/server";
import { API_CORS_HEADERS } from "@/lib/api-cors";

export function jsonOk<T>(payload: T, init?: ResponseInit) {
  return NextResponse.json(payload, {
    ...init,
    headers: { ...API_CORS_HEADERS, ...init?.headers },
  });
}

export function jsonError(error: string, status = 500, details?: unknown) {
  return NextResponse.json(
    details === undefined ? { error } : { error, details },
    { status, headers: API_CORS_HEADERS },
  );
}

export async function readJsonBody(request: Request) {
  try {
    return await request.json();
  } catch {
    throw new Error("INVALID_JSON");
  }
}
