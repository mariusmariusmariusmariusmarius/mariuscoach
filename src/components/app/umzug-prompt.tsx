"use client";

import { useMemo, useState } from "react";
import { Truck } from "lucide-react";
import { CopyButton } from "@/components/ui/copy-button";

/**
 * Der Umzugs-Prompt mit Anbieter-Auswahl: Wer seinen alten Mail-Anbieter
 * wählt, bekommt den passenden IMAP-Server automatisch in den Prompt.
 * Hostnamen sind per DNS geprüft (Stand August 2026).
 */

type Anbieter = {
  id: string;
  gruppe: string;
  name: string;
  /** IMAP-Server; leer = Nutzer trägt selbst ein */
  server?: string;
  /** Eingabefeld-Platzhalter, wenn der Server individuell ist */
  platzhalter?: string;
  /** Zusatz, der mit in den Prompt wandert */
  hinweis?: string;
};

const ANBIETER: Anbieter[] = [
  // — Webhoster & Domain-Anbieter (Deutschland) —
  { id: "ionos", gruppe: "Webhoster & Domain-Anbieter (DE)", name: "IONOS (1&1)", server: "imap.ionos.de" },
  { id: "strato", gruppe: "Webhoster & Domain-Anbieter (DE)", name: "Strato", server: "imap.strato.de" },
  {
    id: "allinkl",
    gruppe: "Webhoster & Domain-Anbieter (DE)",
    name: "All-Inkl",
    platzhalter: "w0123456.kasserver.com",
    hinweis:
      "Der Servername steht im KAS unter „Technische Verwaltung“ — Muster wXXXXXXX.kasserver.com.",
  },
  {
    id: "netcup",
    gruppe: "Webhoster & Domain-Anbieter (DE)",
    name: "Netcup",
    platzhalter: "mx1234.netcup.net",
    hinweis:
      "Der Servername ist bei Netcup individuell — er steht im Kundenportal (CCP/WCP) bei den E-Mail-Einstellungen, Muster mxXXXX.netcup.net.",
  },
  { id: "udag", gruppe: "Webhoster & Domain-Anbieter (DE)", name: "united-domains", server: "imap.udag.de" },
  { id: "df", gruppe: "Webhoster & Domain-Anbieter (DE)", name: "domainfactory", server: "sslin.df.eu" },
  {
    id: "hosteurope",
    gruppe: "Webhoster & Domain-Anbieter (DE)",
    name: "Host Europe",
    server: "mail.hosteurope.de",
    hinweis: "Klappt die Anmeldung nicht, steht dein Server im KIS unter E-Mail — sag es Claude einfach.",
  },
  { id: "hetzner", gruppe: "Webhoster & Domain-Anbieter (DE)", name: "Hetzner Webhosting", server: "mail.your-server.de" },
  { id: "einsblu", gruppe: "Webhoster & Domain-Anbieter (DE)", name: "1blu", server: "imap.1blu.de" },
  {
    id: "webgo",
    gruppe: "Webhoster & Domain-Anbieter (DE)",
    name: "webgo",
    server: "imap.webgo24.de",
    hinweis: "Klappt die Anmeldung nicht, nimm den Servernamen aus deinem webgo-Kundenportal (Muster sXX.goserver.host).",
  },
  { id: "goneo", gruppe: "Webhoster & Domain-Anbieter (DE)", name: "goneo", server: "imap.goneo.de" },
  { id: "manitu", gruppe: "Webhoster & Domain-Anbieter (DE)", name: "Manitu", server: "mail.manitu.de" },
  { id: "variomedia", gruppe: "Webhoster & Domain-Anbieter (DE)", name: "Variomedia", server: "imap.variomedia.de" },
  { id: "dogado", gruppe: "Webhoster & Domain-Anbieter (DE)", name: "dogado", server: "imap.dogado.de" },
  { id: "limacity", gruppe: "Webhoster & Domain-Anbieter (DE)", name: "lima-city", server: "imap.lima-city.de" },
  {
    id: "alfahosting",
    gruppe: "Webhoster & Domain-Anbieter (DE)",
    name: "Alfahosting",
    platzhalter: "alfa3123.alfahosting-server.de",
    hinweis: "Der Servername ist individuell — er steht im Alfahosting-Kundencenter, Muster alfa3XXX.alfahosting-server.de.",
  },
  {
    id: "mittwald",
    gruppe: "Webhoster & Domain-Anbieter (DE)",
    name: "Mittwald",
    platzhalter: "mail.deine-domain.de",
    hinweis: "Der Servername ist individuell — er steht im Mittwald-Kundencenter bei den E-Mail-Einstellungen.",
  },
  // — Internet- & Mail-Anbieter —
  { id: "gmx", gruppe: "Internet- & Mail-Anbieter", name: "GMX", server: "imap.gmx.net", hinweis: "Bei GMX muss IMAP in den Postfach-Einstellungen einmal aktiviert sein." },
  { id: "webde", gruppe: "Internet- & Mail-Anbieter", name: "WEB.DE", server: "imap.web.de", hinweis: "Bei WEB.DE muss IMAP in den Postfach-Einstellungen einmal aktiviert sein." },
  { id: "tonline", gruppe: "Internet- & Mail-Anbieter", name: "T-Online", server: "secureimap.t-online.de", hinweis: "T-Online verlangt ein eigenes „Passwort für E-Mail-Programme“ — nicht das Kundencenter-Passwort." },
  { id: "freenet", gruppe: "Internet- & Mail-Anbieter", name: "Freenet", server: "mx.freenet.de", hinweis: "Bei Freenet muss IMAP je nach Tarif in den Einstellungen freigeschaltet sein." },
  { id: "vodafone", gruppe: "Internet- & Mail-Anbieter", name: "Vodafone Mail", server: "imap.vodafonemail.de" },
  { id: "arcor", gruppe: "Internet- & Mail-Anbieter", name: "Arcor", server: "imap.arcor.de" },
  { id: "gmail", gruppe: "Internet- & Mail-Anbieter", name: "Google / Gmail", server: "imap.gmail.com", hinweis: "Google verlangt ein App-Passwort (Google-Konto → Sicherheit), das normale Passwort funktioniert nicht." },
  { id: "outlook", gruppe: "Internet- & Mail-Anbieter", name: "Microsoft / Outlook / 365", server: "outlook.office365.com", hinweis: "Bei Microsoft 365 muss IMAP für das Postfach erlaubt sein — sag mir, wenn die Anmeldung scheitert." },
  { id: "yahoo", gruppe: "Internet- & Mail-Anbieter", name: "Yahoo", server: "imap.mail.yahoo.com", hinweis: "Yahoo verlangt ein App-Passwort, das normale Passwort funktioniert nicht." },
  { id: "icloud", gruppe: "Internet- & Mail-Anbieter", name: "Apple iCloud", server: "imap.mail.me.com", hinweis: "Apple verlangt ein anwendungsspezifisches Passwort (appleid.apple.com → Anmeldung & Sicherheit)." },
  { id: "zoho", gruppe: "Internet- & Mail-Anbieter", name: "Zoho Mail", server: "imap.zoho.eu", hinweis: "IMAP muss in den Zoho-Einstellungen aktiviert sein. US-Konten nutzen imap.zoho.com." },
  { id: "mailboxorg", gruppe: "Internet- & Mail-Anbieter", name: "mailbox.org", server: "imap.mailbox.org" },
  { id: "posteo", gruppe: "Internet- & Mail-Anbieter", name: "Posteo", server: "posteo.de" },
  // — Baukästen —
  {
    id: "squarespace",
    gruppe: "Baukästen",
    name: "Squarespace (Google Workspace)",
    server: "imap.gmail.com",
    hinweis: "Squarespace-Postfächer laufen über Google Workspace — App-Passwort nötig (Google-Konto → Sicherheit).",
  },
  {
    id: "wix",
    gruppe: "Baukästen",
    name: "Wix (Google Workspace)",
    server: "imap.gmail.com",
    hinweis: "Wix-Postfächer laufen über Google Workspace — App-Passwort nötig (Google-Konto → Sicherheit).",
  },
  { id: "jimdo", gruppe: "Baukästen", name: "Jimdo", server: "imap.jimdo.com", hinweis: "Klappt die Anmeldung nicht, sag es Claude — er findet den richtigen Server für dein Jimdo-Paket." },
  // — Österreich —
  { id: "world4you", gruppe: "Österreich", name: "World4You", server: "imap.world4you.com" },
  { id: "easyname", gruppe: "Österreich", name: "easyname", server: "imap.easyname.com" },
  { id: "a1", gruppe: "Österreich", name: "A1", server: "securemail.a1.net" },
  // — Schweiz —
  { id: "hostpoint", gruppe: "Schweiz", name: "Hostpoint", server: "imap.mail.hostpoint.ch" },
  { id: "infomaniak", gruppe: "Schweiz", name: "Infomaniak", server: "mail.infomaniak.com" },
  { id: "metanet", gruppe: "Schweiz", name: "METANET", server: "mail.metanet.ch" },
  { id: "swisscom", gruppe: "Schweiz", name: "Swisscom / Bluewin", server: "imaps.bluewin.ch" },
  // — International —
  { id: "onecom", gruppe: "International", name: "one.com", server: "imap.one.com" },
  { id: "hostinger", gruppe: "International", name: "Hostinger", server: "imap.hostinger.com" },
  {
    id: "godaddy",
    gruppe: "International",
    name: "GoDaddy",
    server: "imap.secureserver.net",
    hinweis: "Gilt für die klassischen GoDaddy-Postfächer (Workspace Email). Neuere laufen über Microsoft 365 — dann „Microsoft“ wählen.",
  },
  { id: "ovh", gruppe: "International", name: "OVH", server: "ssl0.ovh.net" },
  { id: "namecheap", gruppe: "International", name: "Namecheap (Private Email)", server: "mail.privateemail.com" },
  { id: "andere", gruppe: "International", name: "Anderer Anbieter …", platzhalter: "imap.mein-anbieter.de" },
];

const GRUPPEN = [...new Set(ANBIETER.map((a) => a.gruppe))];

type Zeile = { adresse: string; passwort: string };

export function UmzugPrompt({ prompt }: { prompt: string }) {
  const [id, setId] = useState("ionos");
  const [eigenerServer, setEigenerServer] = useState("");
  const [zeilen, setZeilen] = useState<Zeile[]>([{ adresse: "", passwort: "" }]);

  const anbieter = ANBIETER.find((a) => a.id === id)!;
  const brauchtEingabe = !anbieter.server;

  const zeileAendern = (i: number, feld: keyof Zeile, wert: string) =>
    setZeilen((z) => z.map((r, j) => (j === i ? { ...r, [feld]: wert } : r)));

  const fertig = useMemo(() => {
    const server = anbieter.server ?? eigenerServer.trim();
    const serverText = server
      ? server + (anbieter.hinweis ? `\n  Hinweis: ${anbieter.hinweis}` : "")
      : "unbekannt — find ihn über die Hilfeseiten meines Anbieters heraus oder frag mich";
    const gefuellt = zeilen.filter((z) => z.adresse.trim());
    const adressBlock = gefuellt.length
      ? "MEINE BESTEHENDEN ADRESSEN (mit Passwort für den Sync):\n" +
        gefuellt
          .map(
            (z) =>
              `- ${z.adresse.trim()} — Passwort: ${z.passwort.trim() || "frag mich"}`
          )
          .join("\n")
      : "MEINE BESTEHENDEN ADRESSEN: frag mich — ich sag sie dir im Chat.";
    return prompt
      .replaceAll("{ALTER-ANBIETER}", anbieter.name.replace(" …", ""))
      .replaceAll("{ALTER-IMAP-SERVER}", serverText)
      .replaceAll("{MEINE-ADRESSEN}", adressBlock);
  }, [prompt, anbieter, eigenerServer, zeilen]);

  return (
    <div className="rounded-3xl border border-brand-500/25 bg-brand-500/5 p-6">
      <h2 className="mb-1 flex items-center gap-2 text-base font-semibold text-white">
        <Truck className="size-5 text-brand-300" />
        Der Umzugs-Prompt
      </h2>
      <p className="mb-5 text-xs leading-relaxed text-zinc-400">
        Alten Anbieter auswählen — der richtige Mail-Server steht automatisch
        im Prompt. Domain und Adressen trägst du im Text noch ein.
      </p>

      <div className="mb-5 space-y-4">
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-zinc-500">
            Wo liegen deine Postfächer bisher?
          </label>
          <select
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-surface-950/60 px-3 py-2.5 text-sm text-zinc-200 focus:border-brand-500/50 focus:outline-none"
          >
            {GRUPPEN.map((g) => (
              <optgroup key={g} label={g}>
                {ANBIETER.filter((a) => a.gruppe === g).map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          {anbieter.hinweis && !brauchtEingabe ? (
            <p className="mt-2 text-xs leading-relaxed text-amber-300/90">
              {anbieter.hinweis}
            </p>
          ) : null}
        </div>

        {brauchtEingabe ? (
          <div>
            <label className="mb-2 block text-xs uppercase tracking-widest text-zinc-500">
              IMAP-Server deines Anbieters
            </label>
            <input
              value={eigenerServer}
              onChange={(e) => setEigenerServer(e.target.value)}
              placeholder={anbieter.platzhalter}
              className="w-full rounded-xl border border-white/10 bg-surface-950/60 px-3 py-2.5 font-mono text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-brand-500/50 focus:outline-none"
            />
            {anbieter.hinweis ? (
              <p className="mt-2 text-xs leading-relaxed text-amber-300/90">
                {anbieter.hinweis}
              </p>
            ) : (
              <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                Leer lassen ist okay — dann findet Claude den Server heraus.
              </p>
            )}
          </div>
        ) : null}
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-xs uppercase tracking-widest text-zinc-500">
          Deine bestehenden Adressen — mit Passwort
        </label>
        <div className="space-y-2">
          {zeilen.map((z, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={z.adresse}
                onChange={(e) => zeileAendern(i, "adresse", e.target.value)}
                placeholder="info@meine-firma.de"
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-surface-950/60 px-3 py-2.5 font-mono text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-brand-500/50 focus:outline-none"
              />
              <input
                value={z.passwort}
                onChange={(e) => zeileAendern(i, "passwort", e.target.value)}
                placeholder="Passwort"
                className="w-36 rounded-xl border border-white/10 bg-surface-950/60 px-3 py-2.5 font-mono text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-brand-500/50 focus:outline-none"
              />
              {zeilen.length > 1 ? (
                <button
                  type="button"
                  onClick={() => setZeilen((r) => r.filter((_, j) => j !== i))}
                  className="shrink-0 rounded-xl border border-white/10 px-3 text-sm text-zinc-500 transition hover:border-red-500/40 hover:text-red-300"
                  aria-label="Adresse entfernen"
                >
                  ×
                </button>
              ) : null}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setZeilen((r) => [...r, { adresse: "", passwort: "" }])}
          className="mt-2 rounded-xl border border-white/10 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-brand-500/40 hover:text-brand-300"
        >
          + weitere Adresse
        </button>
        <p className="mt-2 text-xs leading-relaxed text-zinc-500">
          Beides wandert in den Prompt, damit Claude direkt loslegen kann. Der
          Chat bleibt in deinem eigenen Claude-Konto — Passwort leer lassen
          geht auch, dann fragt Claude dich danach.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface-950/60">
        <div className="flex items-center justify-between gap-3 border-b border-white/5 px-3 py-2">
          <span className="text-xs text-zinc-400">Dein fertiger Prompt</span>
          <CopyButton text={fertig} />
        </div>
        <pre className="max-h-72 overflow-auto whitespace-pre-wrap p-3 font-mono text-xs leading-relaxed text-zinc-300">
          {fertig}
        </pre>
      </div>
    </div>
  );
}
