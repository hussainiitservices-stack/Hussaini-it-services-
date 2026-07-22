"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Plus, Trash2, Loader2, MessageSquare, Briefcase, Star, Pencil, X, Mail, RefreshCw } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { PortfolioImageUpload } from "@/components/admin/PortfolioImageUpload";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import type { DbContactSubmission, DbPortfolio, DbTestimonial, PortfolioCoverType } from "@/lib/types/database";

type Tab = "testimonials" | "portfolio" | "contacts";

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("testimonials");
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<DbTestimonial[]>([]);
  const [portfolio, setPortfolio] = useState<DbPortfolio[]>([]);
  const [contacts, setContacts] = useState<DbContactSubmission[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  const [screenshotUrl, setScreenshotUrl] = useState("");
  const [coverType, setCoverType] = useState<PortfolioCoverType>("screenshot");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<DbTestimonial | null>(null);
  const [editingPortfolio, setEditingPortfolio] = useState<DbPortfolio | null>(null);
  const [testimonialLogoUrl, setTestimonialLogoUrl] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<
    | { type: "testimonial"; id: string; label: string }
    | { type: "portfolio"; id: string; label: string }
    | { type: "contact"; id: string; label: string }
    | null
  >(null);
  const [deleting, setDeleting] = useState(false);

  async function loadData() {
    setLoading(true);
    setLoadError(null);

    try {
      const [tRes, pRes, cRes] = await Promise.all([
        fetch("/api/admin/testimonials"),
        fetch("/api/admin/portfolio"),
        fetch("/api/admin/contacts"),
      ]);

      if (tRes.status === 401 || pRes.status === 401 || cRes.status === 401) {
        router.push("/admin/login");
        return;
      }

      const [tData, pData, cData] = await Promise.all([
        tRes.json(),
        pRes.json(),
        cRes.json(),
      ]);

      const errors = [
        !tRes.ok ? tData.error : null,
        !pRes.ok ? pData.error : null,
        !cRes.ok ? cData.error : null,
      ].filter(Boolean);

      if (errors.length > 0) {
        setLoadError(errors.join(" | "));
        setTestimonials([]);
        setPortfolio([]);
        setContacts([]);
        return;
      }

      setTestimonials(tData.data || []);
      setPortfolio(pData.data || []);
      setContacts(cData.data || []);
    } catch {
      setLoadError("Could not connect to the admin API. Restart the dev server and try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  async function saveTestimonial(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    setLoadError(null);
    const fd = new FormData(form);

    const payload = {
      name: fd.get("name"),
      role: fd.get("role"),
      company: fd.get("company"),
      quote: fd.get("quote"),
      rating: Number(fd.get("rating")) || 5,
      website_url: fd.get("website_url") || null,
      location: fd.get("location") || null,
      logo_url: testimonialLogoUrl || null,
    };

    const res = await fetch("/api/admin/testimonials", {
      method: editingTestimonial ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        editingTestimonial ? { id: editingTestimonial.id, ...payload } : payload
      ),
    });

    if (res.ok) {
      form.reset();
      setEditingTestimonial(null);
      setTestimonialLogoUrl("");
      await loadData();
    } else {
      const data = await res.json();
      setLoadError(data.error || "Failed to save testimonial.");
    }
    setSubmitting(false);
  }

  function startEditTestimonial(item: DbTestimonial) {
    setEditingTestimonial(item);
    setTestimonialLogoUrl(item.logo_url || "");
  }

  function cancelEditTestimonial() {
    setEditingTestimonial(null);
    setTestimonialLogoUrl("");
  }

  async function savePortfolio(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    setLoadError(null);
    const fd = new FormData(form);

    const payload = {
      title: fd.get("title"),
      category: fd.get("category"),
      description: fd.get("description"),
      highlights: String(fd.get("highlights") || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      tags: String(fd.get("tags") || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      logo_url: logoUrl || null,
      image_url: screenshotUrl || null,
      cover_type: coverType,
      project_url: fd.get("project_url") || null,
    };

    const res = await fetch("/api/admin/portfolio", {
      method: editingPortfolio ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        editingPortfolio ? { id: editingPortfolio.id, ...payload } : payload
      ),
    });

    if (res.ok) {
      form.reset();
      setEditingPortfolio(null);
      setLogoUrl("");
      setScreenshotUrl("");
      setCoverType("screenshot");
      await loadData();
    } else {
      const data = await res.json();
      setLoadError(data.error || "Failed to save portfolio project.");
    }
    setSubmitting(false);
  }

  function startEditPortfolio(item: DbPortfolio) {
    setEditingPortfolio(item);
    setLogoUrl(item.logo_url || "");
    setScreenshotUrl(item.image_url || "");
    setCoverType(item.cover_type === "logo" ? "logo" : "screenshot");
  }

  function cancelEditPortfolio() {
    setEditingPortfolio(null);
    setLogoUrl("");
    setScreenshotUrl("");
    setCoverType("screenshot");
  }

  function requestDeleteTestimonial(item: DbTestimonial) {
    setDeleteTarget({
      type: "testimonial",
      id: item.id,
      label: item.company || item.name,
    });
  }

  function requestDeletePortfolio(item: DbPortfolio) {
    setDeleteTarget({
      type: "portfolio",
      id: item.id,
      label: item.title,
    });
  }

  function requestDeleteContact(item: DbContactSubmission) {
    setDeleteTarget({
      type: "contact",
      id: item.id,
      label: item.name,
    });
  }

  async function confirmDelete() {
    if (!deleteTarget) return;

    setDeleting(true);
    setLoadError(null);

    const endpoint =
      deleteTarget.type === "testimonial"
        ? "/api/admin/testimonials"
        : deleteTarget.type === "portfolio"
          ? "/api/admin/portfolio"
          : "/api/admin/contacts";

    try {
      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteTarget.id }),
      });

      if (!res.ok) {
        const data = await res.json();
        setLoadError(data.error || "Failed to delete item.");
        return;
      }

      if (deleteTarget.type === "testimonial" && editingTestimonial?.id === deleteTarget.id) {
        cancelEditTestimonial();
      }
      if (deleteTarget.type === "portfolio" && editingPortfolio?.id === deleteTarget.id) {
        cancelEditPortfolio();
      }

      setDeleteTarget(null);
      await loadData();
    } catch {
      setLoadError("Failed to delete item. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  const inputClass =
    "w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none";

  const tabs = [
    { id: "testimonials" as Tab, label: "Testimonials", icon: Star, count: testimonials.length },
    { id: "portfolio" as Tab, label: "Portfolio", icon: Briefcase, count: portfolio.length },
    { id: "contacts" as Tab, label: "Contact Messages", icon: MessageSquare, count: contacts.length },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted hidden sm:block">Admin Panel</span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="sr-only">Admin Dashboard</h1>
        <div className="mb-8 flex gap-2 overflow-x-auto border-b border-border pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors sm:px-4 ${
                tab === t.id
                  ? "bg-accent text-white"
                  : "text-muted hover:bg-surface hover:text-foreground"
              }`}
            >
              <t.icon size={16} />
              {t.label}
              {t.id === "contacts" && t.count > 0 && (
                <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-white/20 px-1.5 py-0.5 text-xs font-bold">
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {loadError && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {loadError}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-accent" size={32} />
          </div>
        ) : (
          <>
            {tab === "testimonials" && (
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="premium-card rounded-xl p-6">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <h2 className="font-display text-lg font-bold flex items-center gap-2">
                      {editingTestimonial ? <Pencil size={18} /> : <Plus size={18} />}
                      {editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}
                    </h2>
                    {editingTestimonial && (
                      <button
                        type="button"
                        onClick={cancelEditTestimonial}
                        className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground"
                      >
                        <X size={14} /> Cancel
                      </button>
                    )}
                  </div>
                  <form
                    key={editingTestimonial?.id ?? "new-testimonial"}
                    onSubmit={saveTestimonial}
                    className="space-y-3"
                  >
                    <input name="name" required placeholder="Client name" defaultValue={editingTestimonial?.name ?? ""} className={inputClass} />
                    <input name="role" required placeholder="Role (e.g. Marketing Director)" defaultValue={editingTestimonial?.role ?? ""} className={inputClass} />
                    <input name="company" required placeholder="Company name (e.g. HM SHOP ONLINE)" defaultValue={editingTestimonial?.company ?? ""} className={inputClass} />
                    <input name="website_url" placeholder="Website URL (e.g. https://hmshoponline.com)" defaultValue={editingTestimonial?.website_url ?? ""} className={inputClass} />
                    <input name="location" placeholder="Location (e.g. Dubai, UAE)" defaultValue={editingTestimonial?.location ?? ""} className={inputClass} />
                    <textarea name="quote" required rows={4} placeholder="Testimonial quote" defaultValue={editingTestimonial?.quote ?? ""} className={inputClass} />
                    <input name="rating" type="number" min={1} max={5} defaultValue={editingTestimonial?.rating ?? 5} placeholder="Rating 1-5" className={inputClass} />
                    <PortfolioImageUpload
                      label="Client Logo"
                      hint="Optional client brand logo shown next to their company name."
                      type="logo"
                      value={testimonialLogoUrl}
                      onChange={setTestimonialLogoUrl}
                      inputClass={inputClass}
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full rounded-md bg-accent py-2.5 text-sm font-semibold text-white hover:bg-navy disabled:opacity-50"
                    >
                      {submitting ? "Saving..." : editingTestimonial ? "Update Testimonial" : "Add Testimonial"}
                    </button>
                  </form>
                </div>

                <div className="space-y-3">
                  <h2 className="font-display text-lg font-bold mb-2">All Testimonials ({testimonials.length})</h2>
                  {testimonials.length === 0 && (
                    <p className="text-muted text-sm">No testimonials in database. Add one or configure Supabase.</p>
                  )}
                  {testimonials.map((t) => (
                    <div key={t.id} className="premium-card rounded-lg p-4 flex justify-between gap-4">
                      <div className="flex gap-3 min-w-0">
                        {t.logo_url && (
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-border bg-surface">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={t.logo_url} alt={t.company} className="h-full w-full object-contain p-1" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold">{t.name}</p>
                          <p className="text-xs text-muted">{t.role}, {t.company}</p>
                          {t.location && <p className="text-xs text-accent">{t.location}</p>}
                          <p className="text-sm text-muted mt-2 line-clamp-2">&ldquo;{t.quote}&rdquo;</p>
                        </div>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <button
                          onClick={() => startEditTestimonial(t)}
                          className="text-accent hover:text-navy"
                          aria-label="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => requestDeleteTestimonial(t)}
                          className="text-red-400 hover:text-red-300"
                          aria-label="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "portfolio" && (
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="premium-card rounded-xl p-6">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <h2 className="font-display text-lg font-bold flex items-center gap-2">
                      {editingPortfolio ? <Pencil size={18} /> : <Plus size={18} />}
                      {editingPortfolio ? "Edit Portfolio Project" : "Add Portfolio Project"}
                    </h2>
                    {editingPortfolio && (
                      <button
                        type="button"
                        onClick={cancelEditPortfolio}
                        className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground"
                      >
                        <X size={14} /> Cancel
                      </button>
                    )}
                  </div>
                  <form
                    key={editingPortfolio?.id ?? "new-portfolio"}
                    onSubmit={savePortfolio}
                    className="space-y-3"
                  >
                    <input name="title" required placeholder="Project title" defaultValue={editingPortfolio?.title ?? ""} className={inputClass} />
                    <input name="category" required placeholder="Category (e.g. Web Development)" defaultValue={editingPortfolio?.category ?? ""} className={inputClass} />
                    <textarea name="description" required rows={3} placeholder="Description" defaultValue={editingPortfolio?.description ?? ""} className={inputClass} />
                    <input name="highlights" placeholder="Highlights (comma separated)" defaultValue={editingPortfolio?.highlights?.join(", ") ?? ""} className={inputClass} />
                    <input name="tags" placeholder="Tags (comma separated)" defaultValue={editingPortfolio?.tags?.join(", ") ?? ""} className={inputClass} />

                    <PortfolioImageUpload
                      label="Client Logo"
                      hint="Upload the client's brand logo (PNG/SVG recommended)."
                      type="logo"
                      value={logoUrl}
                      onChange={setLogoUrl}
                      inputClass={inputClass}
                    />

                    <PortfolioImageUpload
                      label="Website Screenshot"
                      hint="Upload the website homepage or front-page preview."
                      type="screenshot"
                      value={screenshotUrl}
                      onChange={setScreenshotUrl}
                      inputClass={inputClass}
                    />

                    <div>
                      <label htmlFor="cover_type" className="mb-2 block text-sm font-medium">
                        Display on portfolio card
                      </label>
                      <select
                        id="cover_type"
                        value={coverType}
                        onChange={(e) => setCoverType(e.target.value as PortfolioCoverType)}
                        className={inputClass}
                      >
                        <option value="screenshot">Website screenshot</option>
                        <option value="logo">Client logo</option>
                      </select>
                    </div>

                    <input name="project_url" placeholder="Website URL (e.g. https://company.com)" defaultValue={editingPortfolio?.project_url ?? ""} className={inputClass} />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full rounded-md bg-accent py-2.5 text-sm font-semibold text-white hover:bg-navy disabled:opacity-50"
                    >
                      {submitting ? "Saving..." : editingPortfolio ? "Update Project" : "Add Project"}
                    </button>
                  </form>
                </div>

                <div className="space-y-3">
                  <h2 className="font-display text-lg font-bold mb-2">All Projects ({portfolio.length})</h2>
                  {portfolio.length === 0 && (
                    <p className="text-muted text-sm">No projects in database. Add one or configure Supabase.</p>
                  )}
                  {portfolio.map((p) => (
                    <div key={p.id} className="premium-card rounded-lg p-4 flex justify-between gap-4">
                      <div className="flex gap-4 min-w-0">
                        {(p.logo_url || p.image_url) && (
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-border bg-surface">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={(p.cover_type === "logo" ? p.logo_url : p.image_url) || p.logo_url || p.image_url || ""}
                              alt={p.title}
                              className="h-full w-full object-contain p-1"
                            />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold">{p.title}</p>
                          <p className="text-xs text-accent">{p.category}</p>
                          <p className="text-sm text-muted mt-1 line-clamp-2">{p.description}</p>
                        </div>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <button
                          onClick={() => startEditPortfolio(p)}
                          className="text-accent hover:text-navy"
                          aria-label="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => requestDeletePortfolio(p)}
                          className="text-red-400 hover:text-red-300"
                          aria-label="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "contacts" && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="font-display text-lg font-bold">
                      Contact Submissions ({contacts.length})
                    </h2>
                    <p className="text-sm text-muted mt-1">
                      New inquiries from the website contact form appear here automatically.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={loadData}
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium text-muted hover:text-foreground hover:bg-surface transition-colors disabled:opacity-50"
                  >
                    <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                    Refresh
                  </button>
                </div>

                {contacts.length === 0 && (
                  <div className="premium-card rounded-lg p-6 text-sm text-muted">
                    No contact submissions yet. Submit a test message from the{" "}
                    <a href="/contact" className="text-accent hover:underline" target="_blank" rel="noreferrer">
                      contact page
                    </a>
                    .
                  </div>
                )}

                {contacts.map((c) => (
                  <div key={c.id} className="premium-card rounded-lg p-5">
                    <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
                      <div>
                        <p className="font-semibold text-base">{c.name}</p>
                        <a
                          href={`mailto:${c.email}?subject=${encodeURIComponent(`Re: ${c.subject || "Your inquiry to Hussaini IT Services"}`)}`}
                          className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline mt-1"
                        >
                          <Mail size={14} />
                          {c.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted whitespace-nowrap">
                          {new Date(c.created_at).toLocaleString()}
                        </p>
                        <button
                          onClick={() => requestDeleteContact(c)}
                          className="text-red-400 hover:text-red-300"
                          aria-label="Delete contact message"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {(c.phone || c.subject) && (
                      <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted mb-3">
                        {c.phone && <p><span className="font-medium text-foreground">Phone:</span> {c.phone}</p>}
                        {c.subject && <p><span className="font-medium text-foreground">Subject:</span> {c.subject}</p>}
                      </div>
                    )}

                    <div className="rounded-md bg-surface border border-border px-4 py-3">
                      <p className="text-sm text-muted whitespace-pre-wrap">{c.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title={
          deleteTarget?.type === "testimonial"
            ? "Delete testimonial?"
            : deleteTarget?.type === "portfolio"
              ? "Delete portfolio project?"
              : "Delete contact message?"
        }
        message={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.label}"? This action cannot be undone.`
            : ""
        }
        confirmLabel="Yes, delete"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => {
          if (!deleting) setDeleteTarget(null);
        }}
      />
    </div>
  );
}
