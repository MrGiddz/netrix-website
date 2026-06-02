import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE_NAME, verifyAdminToken } from "@/lib/auth";

const PUBLIC_FILE = /\.(.*)$/;

function isPublicApi(pathname: string, method: string) {
  if (pathname.startsWith("/api/auth/")) return true;
  if (pathname === "/api/health") return true;
  if (pathname === "/api/contact") return true;
  if (pathname === "/api/content" && method === "GET") return true;
  return method === "OPTIONS";
}

function getRequestToken(request: NextRequest) {
  const bearerToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  return bearerToken || request.cookies.get(AUTH_COOKIE_NAME)?.value || null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname === "/favicon.ico" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/") && isPublicApi(pathname, request.method)) {
    return NextResponse.next();
  }

  const admin = await verifyAdminToken(getRequestToken(request));
  const isLoginPage = pathname === "/login";

  if (admin && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!admin) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    if (!isLoginPage) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", `${pathname}${request.nextUrl.search}`);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
