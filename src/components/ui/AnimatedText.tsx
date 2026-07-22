"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  highlight?: string;
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  as: Tag = "h1",
  highlight,
}: AnimatedTextProps) {
  const words = text.split(" ");

  return (
    <Tag className={cn("overflow-hidden", className)}>
      {words.map((word, i) => {
        const isHighlight = highlight && word.includes(highlight);
        return (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
            <motion.span
              className={cn("inline-block", isHighlight && "gradient-text")}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: delay + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}

export function AnimatedLine({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
