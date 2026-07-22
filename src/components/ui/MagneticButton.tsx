"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
}

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    // Skip magnetic effect on touch / coarse pointers
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const variants = {
    primary: "bg-accent text-white hover:bg-navy shadow-md shadow-accent/15",
    secondary: "bg-white border border-border text-foreground hover:border-accent/30 hover:shadow-md",
    ghost: "text-muted hover:text-foreground",
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className={cn(
        "relative inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 cursor-pointer sm:px-8 sm:py-4",
        variants[variant],
        className
      )}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className={cn("inline-block", className?.includes("w-full") && "w-full")}>
        {content}
      </a>
    );
  }

  return content;
}
