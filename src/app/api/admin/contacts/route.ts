import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const authed = await getAdminSession();
    if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const supabase = createAdminClient();
    if (!supabase) return NextResponse.json({ data: [] });

    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

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
