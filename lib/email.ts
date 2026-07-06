import nodemailer from "nodemailer";
import { brand } from "@/lib/brand";

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

function getTransport() {
  const user = process.env.SMTP_USER ?? brand.contact.email;
  const pass = process.env.SMTP_PASS;

  if (!pass) {
    throw new Error(
      "SMTP is not configured. Set SMTP_PASS (Gmail app password) in .env.local"
    );
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });
}

export async function sendContactEmail(payload: ContactPayload) {
  const to = process.env.CONTACT_TO ?? brand.contact.email;
  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER ?? brand.contact.email;

  const transport = getTransport();

  await transport.sendMail({
    from: `"SSF Website" <${from}>`,
    to,
    replyTo: payload.email,
    subject: `Website enquiry from ${payload.name}`,
    text: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone}`,
      "",
      payload.message,
    ].join("\n"),
    html: `
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> <a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></p>
      <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
      <hr />
      <p>${escapeHtml(payload.message).replace(/\n/g, "<br />")}</p>
    `,
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
