import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Page Not Found | Hussaini IT Services",
  description: "The page you are looking for could not be found.",
  path: "/404",
});

export default function NotFound() {
  return (
    <SiteLayout>
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">404</p>
        <h1 className="font-display text-4xl font-bold md:text-5xl">Page Not Found</h1>
        <p className="mt-4 max-w-md text-muted">
          Sorry, we couldn&apos;t find that page. Return to the homepage or contact us for help.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-navy transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-border px-6 py-3 text-sm font-semibold hover:bg-surface transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
