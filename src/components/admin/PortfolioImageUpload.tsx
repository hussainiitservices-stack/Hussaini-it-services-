"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Loader2, Upload, X } from "lucide-react";

interface PortfolioImageUploadProps {
  label: string;
  hint: string;
  type: "logo" | "screenshot";
  value: string;
  onChange: (url: string) => void;
  inputClass: string;
}

export function PortfolioImageUpload({
  label,
  hint,
  type,
  value,
  onChange,
  inputClass,
}: PortfolioImageUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload failed.");
        return;
      }

      onChange(data.url);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">{label}</label>
      <p className="text-xs text-muted">{hint}</p>

      {value && (
        <div className="relative h-28 w-full overflow-hidden rounded-md border border-border bg-surface">
          <Image
            src={value}
            alt={`${label} preview`}
            fill
            sizes="400px"
            className={type === "logo" ? "object-contain p-3" : "object-cover"}
            unoptimized={value.endsWith(".svg")}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-2 top-2 rounded-full bg-white/90 p-1 text-muted shadow hover:text-foreground"
            aria-label={`Remove ${label}`}
          >
            <X size={14} />
          </button>
        </div>
      )}

      <div className="flex gap-2">
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif"
          onChange={handleFileSelect}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm font-medium hover:border-accent/30 disabled:opacity-50"
        >
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </div>

      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste image URL"
        className={inputClass}
      />

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
