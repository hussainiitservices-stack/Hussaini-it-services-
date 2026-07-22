"use client";

import { motion } from "framer-motion";

export function GradientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-background to-background" />

      <motion.div
        className="absolute -top-1/4 -left-1/4 h-[800px] w-[800px] rounded-full bg-blue-500/10 blur-[120px]"
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-1/3 -right-1/4 h-[600px] w-[600px] rounded-full bg-blue-600/8 blur-[100px]"
        animate={{
          x: [0, -80, -40, 0],
          y: [0, 80, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 noise-overlay" />

      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 39, 68, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15, 39, 68, 0.04) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}
