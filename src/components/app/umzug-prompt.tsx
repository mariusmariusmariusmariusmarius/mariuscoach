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
  name: string;
  /** IMAP-Server; leer = Nutzer trägt selbst ein */
  server?: string;
  /** Eingabefeld-Platzhalter, wenn der Server individuell ist */
  platzhalter?: string;
  /** Zusatz, der mit in den Prompt wandert */
  hinweis?: string;
};

const ANBIETER: Anbieter[] = [
  { id: "ionos", name: "IONOS (1&1)", server: "imap.ionos.de" },
  { id: "strato", name: "Strato", server: "imap.strato.de" },
  {
    id: "allinkl",
    name: "All-Inkl",
    platzhalter: "w0123456.kasserver.com",
    hinweis:
      "Der Servername steht im KAS unter „Technische Verwaltung“ — Muster wXXXXXXX.kasserver.com.",
  },
  { id: "gmx", name: "GMX", server: "imap.gmx.net", hinweis: "Bei GMX muss IMAP in den Postfach-Einstellungen einmal aktiviert sein." },
  { id: "webde", name: "WEB.DE", server: "imap.web.de", hinweis: "Bei WEB.DE muss IMAP in den Postfach-Einstellungen einmal aktiviert sein." },
  { id: "tonline", name: "T-Online", server: "secureimap.t-online.de", hinweis: "T-Online verlangt ein eigenes „Passwort für E-Mail-Programme“ — nicht das Kundencenter-Passwort." },
  { id: "gmail", name: "Google / Gmail", server: "imap.gmail.com", hinweis: "Google verlangt ein App-Passwort (Google-Konto → Sicherheit), das normale Passwort funktioniert nicht." },
  { id: "outlook", name: "Microsoft / Outlook / 365", server: "outlook.office365.com", hinweis: "Bei Microsoft 365 muss IMAP für das Postfach erlaubt sein — sag mir, wenn die Anmeldung scheitert." },
  { id: "yahoo", name: "Yahoo", server: "imap.mail.yahoo.com", hinweis: "Yahoo verlangt ein App-Passwort, das normale Passwort funktioniert nicht." },
  {
    id: "godaddy",
    name: "GoDaddy",
    server: "imap.secureserver.net",
    hinweis:
      "Gilt für die klassischen GoDaddy-Postfächer (Workspace Email). Neuere laufen über Microsoft 365 — dann oben „Microsoft“ wählen.",
  },
  {
    id: "squarespace",
    name: "Squarespace (Google Workspace)",
    server: "imap.gmail.com",
    hinweis:
      "Squarespace-Postfächer laufen über Google Workspace — es gilt der Google-Server, und du brauchst ein App-Passwort (Google-Konto → Sicherheit).",
  },
  {
    id: "netcup",
    name: "Netcup",
    platzhalter: "mx1234.netcup.net",
    hinweis:
      "Der Servername ist bei Netcup individuell — er steht im Kundenportal (CCP/WCP) bei den E-Mail-Einstellungen, Muster mxXXXX.netcup.net.",
  },
  { id: "udag", name: "united-domains", server: "imap.udag.de" },
  { id: "onecom", name: "one.com", server: "imap.one.com" },
  { id: "hostinger", name: "Hostinger", server: "imap.hostinger.com" },
  { id: "hetzner", name: "Hetzner Webhosting", server: "mail.your-server.de" },
  { id: "df", name: "domainfactory", server: "sslin.df.eu" },
  {
    id: "icloud",
    name: "Apple iCloud",
    server: "imap.mail.me.com",
    hinweis:
      "Apple verlangt ein anwendungsspezifisches Passwort (appleid.apple.com → Anmeldung & Sicherheit), das normale funktioniert nicht.",
  },
  {
    id: "zoho",
    name: "Zoho Mail",
    server: "imap.zoho.eu",
    hinweis:
      "IMAP muss in den Zoho-Einstellungen einmal aktiviert sein. Liegt dein Konto in den USA statt der EU, heißt der Server imap.zoho.com.",
  },
  { id: "mailboxorg", name: "mailbox.org", server: "imap.mailbox.org" },
  { id: "posteo", name: "Posteo", server: "posteo.de" },
  { id: "world4you", name: "World4You (AT)", server: "imap.world4you.com" },
  { id: "easyname", name: "easyname (AT)", server: "imap.easyname.com" },
  { id: "hostpoint", name: "Hostpoint (CH)", server: "imap.mail.hostpoint.ch" },
  { id: "andere", name: "Anderer Anbieter …", platzhalter: "imap.mein-anbieter.de" },
];

export function UmzugPrompt({ prompt }: { prompt: string }) {
  const [id, setId] = useState("ionos");
  const [eigenerServer, setEigenerServer] = useState("");

  const anbieter = ANBIETER.find((a) => a.id === id)!;
  const brauchtEingabe = !anbieter.server;

  const fertig = useMemo(() => {
    const server = anbieter.server ?? eigenerServer.trim();
    const serverText = server
      ? server + (anbieter.hinweis ? `\n  Hinweis: ${anbieter.hinweis}` : "")
      : "unbekannt — find ihn über die Hilfeseiten meines Anbieters heraus oder frag mich";
    return prompt
      .replaceAll("{ALTER-ANBIETER}", anbieter.name.replace(" …", ""))
      .replaceAll("{ALTER-IMAP-SERVER}", serverText);
  }, [prompt, anbieter, eigenerServer]);

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
            {ANBIETER.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
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
