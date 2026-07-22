"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { icon: 36, text: "text-base" },
  md: { icon: 44, text: "text-lg" },
  lg: { icon: 56, text: "text-xl" },
};

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const s = sizes[size];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Image
        src="/logo.svg"
        alt="Hussaini IT Services"
        width={s.icon}
        height={s.icon}
        priority
        className="shrink-0"
      />
      {showText && (
        <div className="hidden sm:block">
          <span className={cn("font-display font-bold tracking-tight text-foreground", s.text)}>
            Hussaini
          </span>
          <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
            IT Services
          </span>
        </div>
      )}
    </div>
  );
}
