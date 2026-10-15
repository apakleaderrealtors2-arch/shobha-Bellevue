import nodemailer from "nodemailer";

export async function sendMail({
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
  if (process.env.RESEND_API_KEY) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.EMAIL_FROM ||
          "Bellevue by SOBHA <onboarding@resend.dev>",
        to: to.split(",").map((address) => address.trim()),
        reply_to: replyTo,
        subject,
        text,
      }),
    });
    if (!response.ok) throw new Error("Resend rejected the message");
    return;
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error("Email is not configured");
  }

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
