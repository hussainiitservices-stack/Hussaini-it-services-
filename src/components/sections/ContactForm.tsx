"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({ type: "error", message: data.error || "Something went wrong." });
      } else {
        setStatus({ type: "success", message: data.message });
        form.reset();
      }
    } catch {
      setStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-md border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-muted">
            Full Name *
          </label>
          <input id="name" name="name" required className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-muted">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-muted">
            Phone Number
          </label>
          <input id="phone" name="phone" className={inputClass} placeholder="+971 ..." />
        </div>
        <div>
          <label htmlFor="subject" className="mb-2 block text-sm font-medium text-muted">
            Subject
          </label>
          <input id="subject" name="subject" className={inputClass} placeholder="Project inquiry" />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-muted">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={inputClass}
          placeholder="Tell us about your project..."
        />
      </div>

      {status && (
        <p
          role="alert"
          aria-live="polite"
          className={`text-sm ${status.type === "success" ? "text-accent" : "text-red-600"}`}
        >
          {status.message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-navy disabled:opacity-50 sm:w-auto"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
