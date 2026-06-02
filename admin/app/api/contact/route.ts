import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { API_CORS_HEADERS } from "@/lib/api-cors";
import { jsonError, jsonOk, readJsonBody } from "@/lib/api-response";
import { buildOwnerEmail, buildSenderEmail } from "@/lib/email-templates";

export const dynamic = "force-dynamic";

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(254),
  phone: z.string().min(1).max(30),
  message: z.string().min(1).max(2000),
});

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await readJsonBody(request);
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError("Invalid form data", 400, parsed.error.flatten());
    }

    const { name, email, phone, message } = parsed.data;

    const ownerAddress = process.env.CONTACT_RECIPIENT_EMAIL;
    if (!ownerAddress) {
      return jsonError("Mail recipient is not configured");
    }

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return jsonError("SMTP mail transport is not configured");
    }

    const transporter = createTransporter();

    const ownerTemplate = buildOwnerEmail({ name, email, phone, message });
    const senderTemplate = buildSenderEmail({
      name,
      businessEmail: ownerAddress,
    });

    // Send both emails concurrently
    await Promise.all([
      transporter.sendMail({
        from: `"Netrix Systems Website" <${process.env.SMTP_USER}>`,
        to: ownerAddress,
        subject: ownerTemplate.subject,
        html: ownerTemplate.html,
        replyTo: email,
      }),
      transporter.sendMail({
        from: `"Netrix Systems" <${process.env.SMTP_USER}>`,
        to: email,
        subject: senderTemplate.subject,
        html: senderTemplate.html,
      }),
    ]);

    return jsonOk({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "INVALID_JSON") {
      return jsonError("Request body must be valid JSON", 400);
    }
    console.error("[contact] mail error:", error);
    return jsonError("Failed to send message. Please try again later.");
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: API_CORS_HEADERS });
}
