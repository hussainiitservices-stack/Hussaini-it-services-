export function normalizeSupabaseUrl(url: string | undefined): string | null {
  if (!url) return null;
  return url.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
}
