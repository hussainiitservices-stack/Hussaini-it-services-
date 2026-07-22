"use client";

import { allServices } from "@/lib/constants";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function AllServicesList() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {allServices.map((service, i) => (
        <RevealOnScroll key={service.title} delay={i * 0.05}>
          <div className="premium-card rounded-xl p-6 flex items-start gap-4 h-full">
            <div className="icon-box h-12 w-12 shrink-0">
              <service.icon size={22} />
            </div>
            <div>
              <h3 className="font-display font-semibold mb-1">{service.title}</h3>
              <p className="text-sm text-muted">
                Professional {service.title.toLowerCase()} services tailored to your business goals.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      ))}
    </div>
  );
}
