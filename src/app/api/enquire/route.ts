import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/lib/content";

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
    !/^[0-9+\-\s]{8,16}$/.test(phone) ||
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

  try {
    if (process.env.RESEND_API_KEY) {
      await sendWithResend({ to, replyTo: email, subject, text });
    } else if (
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ) {
      await sendWithSmtp({ to, replyTo: email, subject, text });
    } else {
      return NextResponse.json(
        {
          error:
            "Email is not configured yet. Add a Resend API key in .env.local.",
        },
        { status: 503 },
      );
    }
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

async function sendWithResend({
  to,
  replyTo,
  subject,
  text,
}: {
  to: string;
  replyTo: string;
  subject: string;
  text: string;
}) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || "Bellevue by SOBHA <onboarding@resend.dev>",
      to: to.split(",").map((address) => address.trim()),
      reply_to: replyTo,
      subject,
      text,
    }),
  });

  if (!response.ok) {
    throw new Error("Resend rejected the message");
  }
}

async function sendWithSmtp({
  to,
  replyTo,
  subject,
  text,
}: {
  to: string;
  replyTo: string;
  subject: string;
  text: string;
}) {
  const port = Number(process.env.SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    replyTo,
    subject,
    text,
  });
}
