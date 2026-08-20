"use client";

import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { CopyButton } from "@/components/ui/copy-button";

type Eintrag = {
  domain: string;
  nameServers: string[];
  token: string;
  status: string;
};

const STATUS_TEXT: Record<string, string> = {
  active: "aktiv",
  pending: "wartet auf Nameserver",
};

/**
 * Nur-Lese-Übersicht der angeschlossenen Domains — für Einstellungen und
 * Dashboard. Angeschlossen wird in der Lektion; hier findet der Nutzer
 * Nameserver und Token jederzeit wieder.
 */
export function DomainUebersicht({ kompakt = false }: { kompakt?: boolean }) {
  const [eintraege, setEintraege] = useState<Eintrag[] | null>(null);

  useEffect(() => {
    fetch("/api/dns")
      .then((r) => (r.ok ? r.json() : { domains: [] }))
      .then((d: { domains: Eintrag[] }) => setEintraege(d.domains))
      .catch(() => setEintraege([]));
  }, []);

  // Nichts anzuzeigen, solange noch keine Domain angeschlossen ist
  if (!eintraege || eintraege.length === 0) return null;

  return (
    <section
      className={
        kompakt
          ? "rounded-3xl border border-white/8 bg-surface-900/70 p-6"
          : "rounded-3xl border border-white/8 bg-surface-900/70 p-7"
      }
    >
      <h2 className="mb-1 flex items-center gap-2 text-lg font-semibold text-white">
        <Globe className="size-5 text-brand-300" />
        Deine Domains
      </h2>
      <p className="mb-5 text-sm text-zinc-400">
        Nameserver und dein DNS-Token — jederzeit hier nachschlagbar. Behandle
        das Token wie ein Passwort.
      </p>

      <ul className="space-y-4">
        {eintraege.map((e) => (
          <li
            key={e.domain}
            className="rounded-2xl border border-white/8 bg-surface-950/40 p-5"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-sm font-semibold text-white">
                {e.domain}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  e.status === "active"
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "bg-amber-500/15 text-amber-300"
                }`}
              >
                {STATUS_TEXT[e.status] ?? e.status}
              </span>
            </div>

            <p className="mb-1 text-xs uppercase tracking-widest text-zinc-500">
              Nameserver
            </p>
            <div className="mb-3 space-y-1.5">
              {e.nameServers.map((ns) => (
                <div
                  key={ns}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-surface-950/60 px-3 py-2"
                >
                  <code className="min-w-0 truncate font-mono text-xs text-zinc-200">
                    {ns}
                  </code>
                  <CopyButton text={ns} />
                </div>
              ))}
            </div>

            <p className="mb-1 text-xs uppercase tracking-widest text-zinc-500">
              DNS-Token
            </p>
            <div className="flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-surface-950/60 px-3 py-2">
              <code className="min-w-0 truncate font-mono text-xs text-zinc-200">
                {e.token}
              </code>
              <CopyButton text={e.token} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
