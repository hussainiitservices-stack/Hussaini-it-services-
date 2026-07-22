import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { sendContactNotificationEmail } from "@/lib/email/contact-notification";
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
    if (!supabase) {
      return NextResponse.json(
        { error: "Contact service is not configured. Please try again later." },
        { status: 503 }
      );
    }

    const submission = {
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim() || null,
      subject: body.subject?.trim() || null,
      message: body.message.trim(),
    };

    const { error: dbError } = await supabase.from("contact_submissions").insert(submission);

    if (dbError) {
      console.error("Contact DB error:", dbError.message);
      return NextResponse.json(
        { error: "Failed to save your message. Please try again or email us directly." },
        { status: 500 }
      );
    }

    let emailSent = false;
    try {
      const emailResult = await sendContactNotificationEmail({
        name: submission.name,
        email: submission.email,
        phone: submission.phone ?? undefined,
        subject: submission.subject ?? undefined,
        message: submission.message,
      });
      emailSent = emailResult.sent;
    } catch (emailError) {
      console.error("Contact email error:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: emailSent
        ? "Thank you! Your message has been sent successfully."
        : "Thank you! Your message was received. We will get back to you soon.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
