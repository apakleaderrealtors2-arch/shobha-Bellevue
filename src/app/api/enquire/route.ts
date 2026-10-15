import { NextResponse } from "next/server";
import { site } from "@/lib/content";
import { sendMail } from "@/lib/mail";
import { fullPhoneError } from "@/lib/phone";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
  consent?: boolean;
  company?: string;
};

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const interest = body.interest?.trim() || "General";
  const message = body.message?.trim() ?? "";

  if (
    !name ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    Boolean(fullPhoneError(phone)) ||
    !body.consent
  ) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  const to = process.env.ENQUIRY_TO;
  const subject = `${site.name} enquiry — ${name}`;
  const text = [
    `Project: ${site.name}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Interest: ${interest}`,
    "",
    message || "(no message)",
  ].join("\n");

  if (!to) {
    return NextResponse.json(
      {
        error:
          "Email is not configured yet. Add ENQUIRY_TO and a Resend API key in .env.local.",
      },
      { status: 503 },
    );
  }

  if (!process.env.RESEND_API_KEY && !process.env.SMTP_HOST) {
    return NextResponse.json(
      { error: "Email is not configured yet." },
      { status: 503 },
    );
  }

  try {
    await sendMail({ to, replyTo: email, subject, text });
  } catch {
    return NextResponse.json(
      {
        error:
          "The enquiry could not be emailed. Please try again in a moment.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
