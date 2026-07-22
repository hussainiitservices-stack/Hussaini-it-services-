import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { companyInfo } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for Hussaini IT Services — how we collect, use, and protect your personal information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicy() {
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
        <h1 className="font-display text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted mb-12">Last updated: June 25, 2026</p>

        <div className="prose prose-invert max-w-none space-y-8 text-muted leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">1. Introduction</h2>
            <p>
              {companyInfo.name} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting
              your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website or use our services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Personal information you provide (name, email, phone number) when contacting us</li>
              <li>Business information related to project inquiries and service requests</li>
              <li>Technical data including IP address, browser type, and device information</li>
              <li>Usage data about how you interact with our website</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To respond to your inquiries and provide our services</li>
              <li>To improve our website and user experience</li>
              <li>To send relevant communications about our services</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">4. Data Sharing</h2>
            <p>
              We do not sell your personal information. We may share data with trusted service providers
              who assist us in operating our website and delivering services, subject to confidentiality
              agreements.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">5. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your information. However, no
              method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">6. Your Rights</h2>
            <p>
              Depending on your location, you may have rights to access, correct, or delete your personal
              data. Contact us at{" "}
              <a href={`mailto:${companyInfo.email}`} className="text-accent hover:underline">
                {companyInfo.email}
              </a>{" "}
              to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">7. Contact Us</h2>
            <p>
              For questions about this Privacy Policy, contact us at{" "}
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
