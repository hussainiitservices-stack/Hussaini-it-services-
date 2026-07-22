import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { companyInfo } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata = createPageMetadata({
  title: "Contact Us — Start Your Project",
  description:
    "Contact Hussaini IT Services for web development, SEO, and digital marketing. Based in the UK and UAE with clients worldwide.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <SiteLayout>
      <PageHeader
        badge="Contact"
        title="Let's Create Something Amazing Together"
        subtitle="Have a project in mind? We'd love to hear about it and discuss how we can help."
      />
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-bold mb-6">Get in Touch</h2>
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
                    <a href={`tel:${companyInfo.phone.replace(/\s/g, "")}`} className="text-sm text-accent hover:underline">
                      {companyInfo.phone}
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="premium-card rounded-xl p-8">
              <h2 className="font-display text-xl font-bold mb-6">Send a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
