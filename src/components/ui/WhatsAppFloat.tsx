"use client";

import { companyInfo } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

export function WhatsAppFloat() {
  return (
    <a
      href={companyInfo.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat on WhatsApp ${companyInfo.whatsapp.display}`}
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_8px_28px_rgba(29,78,216,0.45)] transition-all duration-300 hover:scale-105 hover:bg-navy hover:shadow-[0_10px_32px_rgba(15,39,68,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-navy px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 sm:inline-block">
        Chat on WhatsApp
      </span>
    </a>
  );
}
