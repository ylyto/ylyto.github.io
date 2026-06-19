import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — ylyto" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

type Lead = {
  id: string;
  name: string;
  phone: string;
  city: string | null;
  product_interest: string | null;
  message: string | null;
  language: string;
  created_at: string;
};

function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
      if (error) setError(error.message);
      else setLeads((data ?? []) as Lead[]);
      setLoading(false);
    })();
  }, []);

  function exportCsv() {
    const headers = ["created_at", "name", "phone", "city", "product_interest", "message", "language"];
    const rows = leads.map((l) =>
      headers.map((h) => `"${String((l as any)[h] ?? "").replace(/"/g, '""')}"`).join(","),
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ylyto-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-bold">Admin — Leads</h1>
            <p className="text-sm text-muted-foreground">Authentification à configurer dans Supabase. Page placeholder.</p>
          </div>
          <button
            onClick={exportCsv}
            disabled={!leads.length}
            className="rounded-full bg-ylyto-pink text-white px-5 py-2.5 font-bold text-sm shadow-[0_4px_0_rgba(0,0,0,0.15)] disabled:opacity-50"
          >
            Export CSV
          </button>
        </header>

        <div className="rounded-2xl border border-border bg-card p-4">
          <h2 className="font-bold mb-2">Connexion admin (à venir)</h2>
          <p className="text-sm text-muted-foreground">
            Ajoutez l'authentification email/password dans Supabase, puis liez ce panneau à l'utilisateur connecté.
          </p>
        </div>

        {loading && <p className="text-sm text-muted-foreground">Chargement…</p>}
        {error && (
          <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
            {error} <br />
            <span className="text-muted-foreground">Connectez-vous via Supabase Auth pour voir les leads (RLS).</span>
          </div>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-muted text-left">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Nom</th>
                  <th className="p-3">Téléphone</th>
                  <th className="p-3">Ville</th>
                  <th className="p-3">Produit</th>
                  <th className="p-3">Message</th>
                  <th className="p-3">Lang</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id} className="border-t border-border/60">
                    <td className="p-3 whitespace-nowrap">{new Date(l.created_at).toLocaleString()}</td>
                    <td className="p-3">{l.name}</td>
                    <td className="p-3">{l.phone}</td>
                    <td className="p-3">{l.city}</td>
                    <td className="p-3">{l.product_interest}</td>
                    <td className="p-3 max-w-xs truncate">{l.message}</td>
                    <td className="p-3">{l.language}</td>
                  </tr>
                ))}
                {!leads.length && (
                  <tr><td colSpan={7} className="p-6 text-center text-muted-foreground">Aucun lead pour le moment.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}