import { createAdminClient, createServerClient } from "@/lib/supabase/server";
import { projects, testimonials } from "@/lib/constants";
import type { DbPortfolio, DbTestimonial } from "@/lib/types/database";

function mapStaticPortfolio(): DbPortfolio[] {
  return projects.map((p, i) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    description: p.description,
    highlights: p.highlights,
    tags: p.tags,
    logo_url: null,
    image_url: p.image ?? null,
    cover_type: "screenshot" as const,
    project_url: null,
    is_published: true,
    sort_order: i,
    created_at: new Date().toISOString(),
  }));
}

function mapStaticTestimonials(): DbTestimonial[] {
  return testimonials.map((t) => ({
    id: t.id,
    name: t.name,
    role: t.role,
    company: t.company,
    quote: t.quote,
    rating: t.rating,
    website_url: null,
    location: null,
    logo_url: null,
    is_published: true,
    created_at: new Date().toISOString(),
  }));
}

/** Prefer service role so public pages always match admin data (RLS-safe on server only). */
function getReadClient() {
  return createAdminClient() ?? createServerClient();
}

export async function fetchPortfolio(): Promise<DbPortfolio[]> {
  const supabase = getReadClient();
  if (!supabase) return mapStaticPortfolio();

  const { data, error } = await supabase
    .from("portfolio")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("fetchPortfolio error:", error.message);
    return [];
  }

  // Empty DB should show empty UI — never hide admin deletes behind static seed data
  if (!data?.length) return [];

  return (data as DbPortfolio[]).map((item) => ({
    ...item,
    logo_url: item.logo_url ?? null,
    cover_type: item.cover_type === "logo" ? "logo" : "screenshot",
  }));
}

export async function fetchTestimonials(): Promise<DbTestimonial[]> {
  const supabase = getReadClient();
  if (!supabase) return mapStaticTestimonials();

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("fetchTestimonials error:", error.message);
    return [];
  }

  // Empty DB should show empty UI — never hide admin deletes behind static seed data
  if (!data?.length) return [];

  return (data as DbTestimonial[]).map((item) => ({
    ...item,
    website_url: item.website_url ?? null,
    location: item.location ?? null,
    logo_url: item.logo_url ?? null,
  }));
}
