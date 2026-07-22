"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.get("username"),
          password: formData.get("password"),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-md border border-border bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md premium-card rounded-xl p-8">
        <div className="flex justify-center mb-8">
          <Logo size="md" />
        </div>

        <div className="text-center mb-8">
          <div className="icon-box inline-flex h-12 w-12 mb-4">
            <Lock size={20} />
          </div>
          <h1 className="font-display text-2xl font-bold">Admin Panel</h1>
          <p className="text-sm text-muted mt-2">Sign in to manage content</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="mb-2 block text-sm font-medium text-silver">
              Username
            </label>
            <input
              id="username"
              name="username"
              required
              className={inputClass}
              placeholder="Enter username"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-silver">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className={inputClass}
              placeholder="Enter password"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-accent py-3 text-sm font-semibold text-white hover:bg-navy transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
