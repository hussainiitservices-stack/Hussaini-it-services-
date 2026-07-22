"use client";

export function PremiumBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-background to-background" />

      <div
        className="absolute -top-40 right-0 h-[600px] w-[600px] rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(29, 78, 216, 0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/3 -left-32 h-[500px] w-[500px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.06) 0%, transparent 70%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 39, 68, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15, 39, 68, 0.04) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="absolute inset-0 noise-overlay" />
    </div>
  );
}
