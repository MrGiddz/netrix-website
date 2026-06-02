export const AUTH_COOKIE_NAME = "netrix_admin_token";
export const AUTH_TOKEN_TTL_SECONDS = 60 * 60 * 8;

export type AdminJwtPayload = {
  sub: string;
  email: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
};

const textEncoder = new TextEncoder();

function getJwtSecret() {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_JWT_SECRET must be at least 32 characters.");
  }
  return secret;
}

export function getAdminCredentials() {
  const email = process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("Admin credentials are not configured.");
  }

  return { email, password };
}

export function getAdminProfile() {
  return {
    email: process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@netrix.ng",
    name: process.env.NEXT_PUBLIC_ADMIN_DISPLAY_NAME || "Netrix Admin",
    role: process.env.NEXT_PUBLIC_ADMIN_ROLE || "Content Manager",
  };
}

function base64UrlEncode(value: string | Uint8Array) {
  const bytes = typeof value === "string" ? textEncoder.encode(value) : value;
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

async function sign(input: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, textEncoder.encode(input));
  return base64UrlEncode(new Uint8Array(signature));
}

function signaturesMatch(actual: string, expected: string) {
  if (actual.length !== expected.length) return false;

  let mismatch = 0;
  for (let index = 0; index < actual.length; index += 1) {
    mismatch |= actual.charCodeAt(index) ^ expected.charCodeAt(index);
  }

  return mismatch === 0;
}

export async function createAdminToken() {
  const profile = getAdminProfile();
  const now = Math.floor(Date.now() / 1000);
  const payload: AdminJwtPayload = {
    sub: profile.email,
    email: profile.email,
    name: profile.name,
    role: profile.role,
    iat: now,
    exp: now + AUTH_TOKEN_TTL_SECONDS,
  };
  const header = { alg: "HS256", typ: "JWT" };
  const unsignedToken = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(payload))}`;
  const signature = await sign(unsignedToken, getJwtSecret());

  return `${unsignedToken}.${signature}`;
}

export async function verifyAdminToken(token?: string | null) {
  try {
    if (!token) return null;

    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [headerPart, payloadPart, signature] = parts;
    const expectedSignature = await sign(`${headerPart}.${payloadPart}`, getJwtSecret());

    if (!signaturesMatch(signature, expectedSignature)) return null;

    const header = JSON.parse(new TextDecoder().decode(base64UrlDecode(headerPart)));
    const payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(payloadPart))) as AdminJwtPayload;
    const now = Math.floor(Date.now() / 1000);

    if (header?.alg !== "HS256" || payload.exp <= now) return null;

    return payload;
  } catch {
    return null;
  }
}

export function getBearerToken(request: Request) {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) return null;
  return authorization.slice("Bearer ".length).trim();
}
