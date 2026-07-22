import { Resend } from "resend";
import type { ContactFormData } from "@/lib/types/database";

const DEFAULT_FROM = "Hussaini IT Services <onboarding@resend.dev>";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function resolveFromAddress() {
  const configured = process.env.RESEND_FROM_EMAIL?.trim();

  if (!configured) return DEFAULT_FROM;

  // Resend cannot send from Gmail/Yahoo/etc. — only verified domains or onboarding@resend.dev
  const emailMatch = configured.match(/<([^>]+)>|([^\s<>]+@[^\s<>]+)/);
  const email = (emailMatch?.[1] || emailMatch?.[2] || "").toLowerCase();

  if (
    email.endsWith("@gmail.com") ||
    email.endsWith("@yahoo.com") ||
    email.endsWith("@hotmail.com") ||
    email.endsWith("@outlook.com")
  ) {
    console.warn(
      `Contact email: "${email}" cannot be used as Resend sender. Using ${DEFAULT_FROM}. Verify your domain at resend.com/domains for production.`
    );
    return DEFAULT_FROM;
  }

  return configured;
}

export async function sendContactNotificationEmail(data: ContactFormData) {
  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (!resendKey) {
    return { sent: false as const, reason: "missing_api_key" as const };
  }

  const toEmail = (process.env.CONTACT_EMAIL || "hello@hussainitservices.com").trim().toLowerCase();
  const resend = new Resend(resendKey);

  const name = escapeHtml(data.name.trim());
  const email = escapeHtml(data.email.trim());
  const phone = data.phone?.trim() ? escapeHtml(data.phone.trim()) : null;
  const subject = data.subject?.trim() ? escapeHtml(data.subject.trim()) : null;
  const message = escapeHtml(data.message.trim()).replace(/\n/g, "<br>");

  const { data: result, error } = await resend.emails.send({
    from: resolveFromAddress(),
    to: toEmail,
    replyTo: data.email.trim(),
    subject: data.subject?.trim()
      ? `Contact: ${data.subject.trim()}`
      : `New inquiry from ${data.name.trim()}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
      ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });

  if (error) {
    console.error("Resend API error:", error);
    throw new Error(error.message || "Failed to send notification email.");
  }

  return { sent: true as const, id: result?.id };
}
