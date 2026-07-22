import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { companyInfo } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Terms & Conditions",
  description: "Terms and Conditions for using Hussaini IT Services website and digital services.",
  path: "/terms-and-conditions",
});

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border py-6">
        <div className="mx-auto max-w-4xl px-6 flex items-center justify-between">
          <Link href="/">
            <Logo size="sm" />
          </Link>
          <Link href="/" className="text-sm text-muted hover:text-accent transition-colors">
            Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="font-display text-4xl font-bold mb-2">Terms & Conditions</h1>
        <p className="text-muted mb-12">Last updated: June 25, 2026</p>

        <div className="prose prose-invert max-w-none space-y-8 text-muted leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing or using the website and services of {companyInfo.name}, you agree to be bound
              by these Terms & Conditions. If you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">2. Services</h2>
            <p>
              We provide web development, mobile application development, SEO, social media management,
              ecommerce solutions, graphic design, and related digital services. Specific deliverables,
              timelines, and pricing are defined in individual project agreements.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">3. Intellectual Property</h2>
            <p>
              Upon full payment, clients receive ownership of custom deliverables as specified in the
              project agreement. We retain rights to pre-existing tools, frameworks, and methodologies
              used in project delivery.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">4. Payment Terms</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Payment schedules are outlined in individual project proposals</li>
              <li>Late payments may result in project suspension</li>
              <li>Refunds are handled on a case-by-case basis as per the project agreement</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">5. Client Responsibilities</h2>
            <p>
              Clients agree to provide timely feedback, necessary content, and access required for project
              completion. Delays in client deliverables may affect project timelines.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">6. Limitation of Liability</h2>
            <p>
              {companyInfo.name} shall not be liable for any indirect, incidental, or consequential damages
              arising from the use of our services. Our total liability is limited to the amount paid for
              the specific service in question.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">7. Governing Law</h2>
            <p>
              These terms are governed by the laws of England and Wales. Any disputes shall be resolved
              through good-faith negotiation or appropriate legal channels.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">8. Contact</h2>
            <p>
              For questions about these Terms & Conditions, contact us at{" "}
              <a href={`mailto:${companyInfo.email}`} className="text-accent hover:underline">
                {companyInfo.email}
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
