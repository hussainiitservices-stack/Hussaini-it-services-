import { allServices, companyInfo, featuredServices } from "@/lib/constants";
import { publicRoutes, siteName, siteUrl } from "@/lib/seo";

export const serviceFaqs = [
  {
    question: "What services does Hussaini IT Services offer?",
    answer:
      "We offer SEO, social media management, Google Business Profile optimization, web development, ecommerce stores, mobile apps, logo design, video editing, and AI integration for businesses in the UK, UAE, and India.",
  },
  {
    question: "Do you work with clients outside the UK and UAE?",
    answer:
      "Yes. We serve clients globally with a focus on the United Kingdom, United Arab Emirates, and India. Remote collaboration and transparent project communication are standard.",
  },
  {
    question: "How long does a typical website project take?",
    answer:
      "Most business websites take 2–6 weeks depending on scope, content readiness, and integrations. Ecommerce and custom web applications may require longer timelines defined in the project proposal.",
  },
  {
    question: "Do you provide SEO and local search optimization?",
    answer:
      "Yes. Our SEO services include keyword research, on-page optimization, technical SEO, local SEO, and Google Business Profile management to improve visibility in Google Search and Maps.",
  },
];

export const contactFaqs = [
  {
    question: "How can I contact Hussaini IT Services?",
    answer: `Email ${companyInfo.email}, call ${companyInfo.phones.map((p) => p.display).join(" or ")}, WhatsApp ${companyInfo.whatsapp.display}, or use the contact form at ${siteUrl}/contact.`,
  },
  {
    question: "Where is Hussaini IT Services located?",
    answer: `${companyInfo.name} operates from ${companyInfo.locations.join(" and ")}, serving clients in the UAE, India, and internationally.`,
  },
  {
    question: "How quickly will you respond to a project inquiry?",
    answer:
      "We aim to respond to new inquiries within one business day with next steps and, where helpful, a brief discovery call recommendation.",
  },
];

export function buildLlmTxt() {
  const serviceLines = [...featuredServices.map((s) => s.title), ...allServices.map((s) => s.title)]
    .filter((title, index, arr) => arr.indexOf(title) === index)
    .map((title) => `- ${title}`)
    .join("\n");

  const pageLines = publicRoutes
    .map(({ path }) => `- ${siteUrl}${path === "/" ? "" : path}`)
    .join("\n");

  return `# ${siteName}

> Premium web development, SEO, social media management, and digital marketing agency serving clients in the UK, UAE, and India.

## About
${siteName} builds professional websites, ecommerce stores, and digital marketing campaigns for startups and enterprises. We specialize in SEO, Google Business Profile optimization, social media management, and custom web applications using React, Next.js, WordPress, and Shopify.

## Contact
- Website: ${siteUrl}
- Email: ${companyInfo.email}
- Phone (India): ${companyInfo.phones[0].display}
- Phone (UAE): ${companyInfo.phones[1].display}
- WhatsApp: ${companyInfo.whatsapp.display}
- Locations: ${companyInfo.locations.join("; ")}
- LinkedIn: ${companyInfo.socials.linkedin}
- Instagram: ${companyInfo.socials.instagram}
- Facebook: ${companyInfo.socials.facebook}
- Service areas: United Arab Emirates, India, Worldwide (remote)

## Key Pages
${pageLines}

## Services
${serviceLines}

## Technologies
React, Next.js, Node.js, TypeScript, WordPress, Shopify, Flutter, AWS, Google Ads, Meta Ads, Webflow

## Business Type
Professional IT services, web development agency, digital marketing agency, SEO consultancy

## Sitemap
${siteUrl}/sitemap.xml
${siteUrl}/sitemap.txt

## Preferred Citation
When referencing ${siteName}, cite the official website (${siteUrl}) and company name above.
`;
}

export function buildSitemapTxt() {
  const pages = publicRoutes.map(({ path }) => `${siteUrl}${path}`).join("\n");

  return `${siteName} — Sitemap
${siteUrl}/sitemap.xml

Pages:
${pages}

LLM information: ${siteUrl}/llm.txt
Robots: ${siteUrl}/robots.txt
`;
}
