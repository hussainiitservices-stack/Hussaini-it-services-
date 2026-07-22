import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const authed = await getAdminSession();
    if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const supabase = createAdminClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase is not configured." },
        { status: 503 }
      );
    }

    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      console.error("Contacts GET error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Contacts GET failed:", error);
    return NextResponse.json({ error: "Failed to load contact messages." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const authed = await getAdminSession();
    if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Submission id is required." }, { status: 400 });
    }

    const supabase = createAdminClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase is not configured." },
        { status: 503 }
      );
    }

    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);

    if (error) {
      console.error("Contacts DELETE error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contacts DELETE failed:", error);
    return NextResponse.json({ error: "Failed to delete contact message." }, { status: 500 });
  }
}
