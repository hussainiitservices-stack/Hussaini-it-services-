import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/server";
import { revalidatePublicContent } from "@/lib/admin/revalidate";
import {
  buildTestimonialBasePayload,
  buildTestimonialPayload,
  isMissingTestimonialColumnError,
  normalizeTestimonialRow,
} from "@/lib/admin/testimonials";

export async function GET() {
  try {
    const authed = await getAdminSession();
    if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const supabase = createAdminClient();
    if (!supabase) return NextResponse.json({ data: [] });

    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Testimonials GET error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      data: (data ?? []).map((row) => normalizeTestimonialRow(row as Record<string, unknown>)),
    });
  } catch (error) {
    console.error("Testimonials GET failed:", error);
    return NextResponse.json({ error: "Failed to load testimonials." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authed = await getAdminSession();
    if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const supabase = createAdminClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase not configured." }, { status: 503 });
    }

    const body = await request.json();
    const fullPayload = buildTestimonialPayload(body);
    let result = await supabase.from("testimonials").insert(fullPayload).select().single();

    if (result.error && isMissingTestimonialColumnError(result.error.message)) {
      result = await supabase
        .from("testimonials")
        .insert(buildTestimonialBasePayload(body))
        .select()
        .single();
    }

    if (result.error) {
      console.error("Testimonials POST error:", result.error.message);
      return NextResponse.json({ error: result.error.message }, { status: 500 });
    }

    revalidatePublicContent();

    return NextResponse.json({
      data: normalizeTestimonialRow(result.data as Record<string, unknown>),
    });
  } catch (error) {
    console.error("Testimonials POST failed:", error);
    return NextResponse.json({ error: "Failed to add testimonial." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const authed = await getAdminSession();
    if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const supabase = createAdminClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase not configured." }, { status: 503 });
    }

    const body = await request.json();
    const id = body.id as string;
    if (!id) return NextResponse.json({ error: "Testimonial id is required." }, { status: 400 });

    const fullPayload = buildTestimonialPayload(body);
    let result = await supabase.from("testimonials").update(fullPayload).eq("id", id).select().single();

    if (result.error && isMissingTestimonialColumnError(result.error.message)) {
      result = await supabase
        .from("testimonials")
        .update(buildTestimonialBasePayload(body))
        .eq("id", id)
        .select()
        .single();
    }

    if (result.error) {
      console.error("Testimonials PUT error:", result.error.message);
      return NextResponse.json({ error: result.error.message }, { status: 500 });
    }

    revalidatePublicContent();

    return NextResponse.json({
      data: normalizeTestimonialRow(result.data as Record<string, unknown>),
    });
  } catch (error) {
    console.error("Testimonials PUT failed:", error);
    return NextResponse.json({ error: "Failed to update testimonial." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const authed = await getAdminSession();
    if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await request.json();
    const supabase = createAdminClient();
    if (!supabase) return NextResponse.json({ error: "Supabase not configured." }, { status: 503 });

    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) {
      console.error("Testimonials DELETE error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    revalidatePublicContent();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Testimonials DELETE failed:", error);
    return NextResponse.json({ error: "Failed to delete testimonial." }, { status: 500 });
  }
}
