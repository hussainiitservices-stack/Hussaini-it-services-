import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/server";
import type { ContactFormData } from "@/lib/types/database";

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();

    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const supabase = createAdminClient();
    if (supabase) {
      await supabase.from("contact_submissions").insert({
        name: body.name.trim(),
        email: body.email.trim(),
        phone: body.phone?.trim() || null,
        subject: body.subject?.trim() || null,
        message: body.message.trim(),
      });
    }

    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL || "hello@hussainitservices.com";

    if (resendKey) {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "Hussaini IT Services <onboarding@resend.dev>",
        to: toEmail,
        replyTo: body.email,
        subject: body.subject?.trim()
          ? `Contact: ${body.subject.trim()}`
          : `New inquiry from ${body.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          ${body.phone ? `<p><strong>Phone:</strong> ${body.phone}</p>` : ""}
          ${body.subject ? `<p><strong>Subject:</strong> ${body.subject}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${body.message.replace(/\n/g, "<br>")}</p>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been sent successfully.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
