import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/server";
import { revalidatePublicContent } from "@/lib/admin/revalidate";
import type { DbPortfolio } from "@/lib/types/database";

function isMissingColumnError(message: string) {
  return message.includes("logo_url") || message.includes("cover_type");
}

function normalizePortfolioRow(row: Record<string, unknown>): DbPortfolio {
  return {
    ...(row as unknown as DbPortfolio),
    logo_url: (row.logo_url as string | null) ?? null,
    cover_type: row.cover_type === "logo" ? "logo" : "screenshot",
  };
}

export async function GET() {
  try {
    const authed = await getAdminSession();
    if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const supabase = createAdminClient();
    if (!supabase) return NextResponse.json({ data: [] });

    const { data, error } = await supabase
      .from("portfolio")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Portfolio GET error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      data: (data ?? []).map((row) => normalizePortfolioRow(row as Record<string, unknown>)),
    });
  } catch (error) {
    console.error("Portfolio GET failed:", error);
    return NextResponse.json({ error: "Failed to load portfolio." }, { status: 500 });
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
    const basePayload = {
      title: body.title,
      category: body.category,
      description: body.description,
      highlights: body.highlights ?? [],
      tags: body.tags ?? [],
      image_url: body.image_url || null,
      project_url: body.project_url || null,
      is_published: body.is_published ?? true,
      sort_order: body.sort_order ?? 0,
    };

    const fullPayload = {
      ...basePayload,
      logo_url: body.logo_url || null,
      cover_type: body.cover_type === "logo" ? "logo" : "screenshot",
    };

    let result = await supabase.from("portfolio").insert(fullPayload).select().single();

    if (result.error && isMissingColumnError(result.error.message)) {
      result = await supabase.from("portfolio").insert(basePayload).select().single();
    }

    if (result.error) {
      console.error("Portfolio POST error:", result.error.message);
      return NextResponse.json({ error: result.error.message }, { status: 500 });
    }

    revalidatePublicContent();

    return NextResponse.json({
      data: normalizePortfolioRow(result.data as Record<string, unknown>),
    });
  } catch (error) {
    console.error("Portfolio POST failed:", error);
    return NextResponse.json({ error: "Failed to add portfolio project." }, { status: 500 });
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
    if (!id) return NextResponse.json({ error: "Portfolio id is required." }, { status: 400 });

    const basePayload = {
      title: body.title,
      category: body.category,
      description: body.description,
      highlights: body.highlights ?? [],
      tags: body.tags ?? [],
      image_url: body.image_url || null,
      project_url: body.project_url || null,
      is_published: body.is_published ?? true,
      sort_order: body.sort_order ?? 0,
    };

    const fullPayload = {
      ...basePayload,
      logo_url: body.logo_url || null,
      cover_type: body.cover_type === "logo" ? "logo" : "screenshot",
    };

    let result = await supabase.from("portfolio").update(fullPayload).eq("id", id).select().single();

    if (result.error && isMissingColumnError(result.error.message)) {
      result = await supabase.from("portfolio").update(basePayload).eq("id", id).select().single();
    }

    if (result.error) {
      console.error("Portfolio PUT error:", result.error.message);
      return NextResponse.json({ error: result.error.message }, { status: 500 });
    }

    revalidatePublicContent();

    return NextResponse.json({
      data: normalizePortfolioRow(result.data as Record<string, unknown>),
    });
  } catch (error) {
    console.error("Portfolio PUT failed:", error);
    return NextResponse.json({ error: "Failed to update portfolio project." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const authed = await getAdminSession();
    if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await request.json();
    const supabase = createAdminClient();
    if (!supabase) return NextResponse.json({ error: "Supabase not configured." }, { status: 503 });

    const { error } = await supabase.from("portfolio").delete().eq("id", id);
    if (error) {
      console.error("Portfolio DELETE error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    revalidatePublicContent();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Portfolio DELETE failed:", error);
    return NextResponse.json({ error: "Failed to delete portfolio project." }, { status: 500 });
  }
}
