import type { DbTestimonial } from "@/lib/types/database";

export function buildTestimonialPayload(body: Record<string, unknown>) {
  return {
    name: String(body.name ?? "").trim(),
    role: String(body.role ?? "").trim(),
    company: String(body.company ?? "").trim(),
    quote: String(body.quote ?? "").trim(),
    rating: Number(body.rating) || 5,
    is_published: body.is_published ?? true,
    website_url: body.website_url ? String(body.website_url).trim() : null,
    location: body.location ? String(body.location).trim() : null,
    logo_url: body.logo_url ? String(body.logo_url).trim() : null,
  };
}

export function buildTestimonialBasePayload(body: Record<string, unknown>) {
  return {
    name: String(body.name ?? "").trim(),
    role: String(body.role ?? "").trim(),
    company: String(body.company ?? "").trim(),
    quote: String(body.quote ?? "").trim(),
    rating: Number(body.rating) || 5,
    is_published: body.is_published ?? true,
  };
}

export function isMissingTestimonialColumnError(message: string) {
  return (
    message.includes("website_url") ||
    message.includes("location") ||
    message.includes("logo_url")
  );
}

export function normalizeTestimonialRow(row: Record<string, unknown>): DbTestimonial {
  return {
    ...(row as unknown as DbTestimonial),
    website_url: (row.website_url as string | null) ?? null,
    location: (row.location as string | null) ?? null,
    logo_url: (row.logo_url as string | null) ?? null,
  };
}
