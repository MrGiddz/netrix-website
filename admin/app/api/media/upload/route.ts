import crypto from "crypto";
import { NextResponse } from "next/server";
import { API_CORS_HEADERS } from "@/lib/api-cors";
import { jsonError, jsonOk } from "@/lib/api-response";

export const dynamic = "force-dynamic";

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function getCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.");
  }

  return { cloudName, apiKey, apiSecret };
}

function signCloudinaryParams(params: Record<string, string>, apiSecret: string) {
  const payload = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return crypto.createHash("sha1").update(`${payload}${apiSecret}`).digest("hex");
}

export async function POST(request: Request) {
  try {
    const body = await request.formData();
    const file = body.get("file");

    if (!(file instanceof File)) {
      return jsonError("Choose an image file to upload.", 400);
    }

    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      return jsonError("Only JPG, PNG, WEBP, and GIF images can be uploaded.", 400);
    }

    if (file.size > MAX_UPLOAD_SIZE) {
      return jsonError("Image must be 5MB or smaller.", 400);
    }

    const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const folder = "netrix-cms";
    const signature = signCloudinaryParams({ folder, timestamp }, apiSecret);
    const uploadForm = new FormData();
    uploadForm.set("file", file);
    uploadForm.set("api_key", apiKey);
    uploadForm.set("timestamp", timestamp);
    uploadForm.set("folder", folder);
    uploadForm.set("signature", signature);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: uploadForm,
    });
    const payload = await response.json().catch(() => null);

    if (!response.ok || !payload?.secure_url || !payload?.public_id) {
      return jsonError(payload?.error?.message || "Cloudinary upload failed.", response.status || 502);
    }

    return jsonOk({
      success: true,
      image: {
        secureUrl: payload.secure_url,
        publicId: payload.public_id,
        width: payload.width,
        height: payload.height,
        format: payload.format,
      },
    });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Image upload failed.");
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: API_CORS_HEADERS });
}
