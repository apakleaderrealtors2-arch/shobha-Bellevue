import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { site } from "@/lib/content";
import { sendMail } from "@/lib/mail";
import { fullPhoneError } from "@/lib/phone";

type DocumentKey = keyof typeof site.documents;

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  document?: string;
  company?: string;
};

function leadErrors(name: string, email: string, phone: string) {
  const errors: Record<string, string> = {};
  if (name.trim().length < 2) errors.name = "Please enter your name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email";
  if (fullPhoneError(phone)) errors.phone = fullPhoneError(phone);
  return errors;
}

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
  const document = body.document as DocumentKey;
  const doc = site.documents[document];
  const errors = leadErrors(name, email, phone);

  if (!doc) {
    return NextResponse.json({ error: "Choose a document." }, { status: 400 });
  }
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const to = process.env.ENQUIRY_TO;
  if (!to || (!process.env.RESEND_API_KEY && !process.env.SMTP_HOST)) {
    return NextResponse.json(
      { error: "Email is not configured yet." },
      { status: 503 },
    );
  }

  try {
    await sendMail({
      to,
      replyTo: email,
      subject: `${site.name} download — ${doc.label} — ${name}`,
      text: [
        `${name} downloaded the ${doc.label}.`,
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Document: ${doc.label}`,
      ].join("\n"),
    });
  } catch {
    return NextResponse.json(
      { error: "We could not send your details. Please try again." },
      { status: 502 },
    );
  }

  const filePath = path.join(process.cwd(), "private", "docs", doc.file);
  const bytes = await readFile(filePath);

  return new NextResponse(bytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${doc.file}"`,
      "Cache-Control": "no-store",
    },
  });
}
