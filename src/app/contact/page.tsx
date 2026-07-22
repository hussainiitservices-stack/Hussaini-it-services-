import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageSeo } from "@/components/seo/PageSeo";
import { companyInfo } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";
import { contactFaqs } from "@/lib/seo/content";
import { breadcrumbJsonLd, contactPageJsonLd, faqJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata = createPageMetadata({
  title: "Contact Us — Start Your Project",
  description:
    "Contact Hussaini IT Services for web development, SEO, and digital marketing. Based in High Wycombe UK and Ujjain India with clients in the UAE and worldwide.",
  path: "/contact",
  keywords: [
    "contact web developer UK",
    "hire SEO agency UAE",
    "project inquiry digital marketing",
    "Hussaini IT Services email",
  ],
});

export default function ContactPage() {
  const pageTitle = "Contact Us — Start Your Project";
  const pageDescription =
    "Contact Hussaini IT Services for web development, SEO, and digital marketing. Based in High Wycombe UK and Ujjain India with clients in the UAE and worldwide.";

  return (
    <>
      <PageSeo
        schemas={[
          webPageJsonLd({ title: pageTitle, description: pageDescription, path: "/contact" }),
          contactPageJsonLd(),
          faqJsonLd(contactFaqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <SiteLayout>
        <PageHeader
          badge="Contact"
          title="Let's Create Something Amazing Together"
          subtitle="Have a project in mind? We'd love to hear about it and discuss how we can help."
        />
        <section className="py-12 sm:py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="mb-6 font-display text-xl font-bold sm:text-2xl">Get in Touch</h2>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="icon-box h-10 w-10">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Location</p>
                      <p className="text-sm text-muted">{companyInfo.location}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="icon-box h-10 w-10">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Email</p>
                      <a href={`mailto:${companyInfo.email}`} className="text-sm text-accent hover:underline">
                        {companyInfo.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="icon-box h-10 w-10">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Phone</p>
                      <a
                        href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
                        className="text-sm text-accent hover:underline"
                      >
                        {companyInfo.phone}
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="premium-card rounded-xl p-5 sm:p-8">
                <h2 className="mb-6 font-display text-lg font-bold sm:text-xl">Send a Message</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
        <FaqSection
          title="Contact & Location FAQs"
          subtitle="How to reach us and what to expect after you submit an inquiry."
          items={contactFaqs}
        />
      </SiteLayout>
    </>
  );
}
