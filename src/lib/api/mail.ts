/**
 * Postfach-Zentrale: Migadu-Domains und -Postfächer für Teilnehmer.
 *
 * Migadu kennt keine Schlüssel je Domain — ihr API-Schlüssel gilt fürs ganze
 * Konto. Deshalb bekommt ihn kein Teilnehmer zu sehen: Er benutzt seinen
 * mm_-Schlüssel, und diese Schicht lässt nur Domains durch, die IHM gehören.
 *
 * Wem eine Domain gehört, steht im Beschreibungsfeld der Domain BEI MIGADU
 * ("mm:<userId>") — nicht im Arbeitsspeicher. Auf Vercel beantwortet sonst
 * mal die eine, mal die andere Instanz die Anfrage, und die Zuordnung wäre
 * beim nächsten Aufruf weg.
 */

export type MailDomain = {
  domain: string;
  angelegt: string;
};

/** Markierung im Beschreibungsfeld der Migadu-Domain */
const marke = (userId: string) => `mm:${userId}`;

export const MAX_MAIL_DOMAINS = 3;
export const MAX_POSTFAECHER = 10;
/** Tageslimit je Postfach — schützt die Zustellbarkeit aller Teilnehmer */
export const TAGESLIMIT = 200;

const API = "https://api.migadu.com/v1";

export function mailKonfiguriert(): boolean {
  return Boolean(process.env.MIGADU_USER && process.env.MIGADU_KEY);
}

function kopf() {
  const auth = Buffer.from(
    `${process.env.MIGADU_USER}:${process.env.MIGADU_KEY}`
  ).toString("base64");
  return { Authorization: `Basic ${auth}`, "Content-Type": "application/json" };
}

/** Alle Domains des Kontos bei Migadu holen */
async function alleDomains(): Promise<
  { name: string; description: string; created?: string }[]
> {
  const r = await migadu("/domains");
  const liste = (r.daten.domains ?? []) as Record<string, unknown>[];
  return liste.map((d) => ({
    name: d.name as string,
    description: (d.description as string) ?? "",
  }));
}

export async function mailDomainsVon(userId: string): Promise<MailDomain[]> {
  const meine = (await alleDomains()).filter((d) => d.description === marke(userId));
  return meine.map((d) => ({ domain: d.name, angelegt: "" }));
}

export async function gehoertNutzer(userId: string, domain: string): Promise<boolean> {
  const r = await migadu(`/domains/${domain}`);
  return r.ok && (r.daten.description as string) === marke(userId);
}

async function migadu(
  pfad: string,
  init?: { method?: string; body?: unknown }
): Promise<{ ok: boolean; daten: Record<string, unknown>; status: number }> {
  const r = await fetch(`${API}${pfad}`, {
    method: init?.method ?? "GET",
    headers: kopf(),
    body: init?.body ? JSON.stringify(init.body) : undefined,
    signal: AbortSignal.timeout(20_000),
  });
  let daten: Record<string, unknown> = {};
  try {
    daten = (await r.json()) as Record<string, unknown>;
  } catch {
    // manche Antworten sind leer — Status genügt
  }
  return { ok: r.ok, daten, status: r.status };
}

/** Domain für Postfächer anlegen und dem Nutzer zuordnen */
export async function domainAnlegen(
  userId: string,
  domainRoh: string
): Promise<{ domain?: string; fehler?: string }> {
  const domain = domainRoh
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "");
  if (!/^[a-z0-9äöüß-]+(\.[a-z0-9-]+)+$/.test(domain)) {
    return { fehler: "Das sieht nicht wie eine Domain aus. Beispiel: meine-firma.de" };
  }
  // Gibt es die Domain schon im Konto? Dann entscheidet die Markierung.
  const vorhanden = (await alleDomains()).find((d) => d.name === domain);
  if (vorhanden) {
    if (vorhanden.description === marke(userId)) return { domain };
    // Alles andere wird abgelehnt — auch Domains ohne Markierung. Wer eine
    // fremde oder unzugeordnete Domain einfach beanspruchen könnte, käme
    // sonst an deren Postfächer.
    return {
      fehler:
        "Diese Domain liegt schon im System und gehört nicht zu deinem Konto. Melde dich bei uns, wenn das ein Irrtum ist.",
    };
  }

  if ((await mailDomainsVon(userId)).length >= MAX_MAIL_DOMAINS) {
    return { fehler: `Mehr als ${MAX_MAIL_DOMAINS} Domains pro Konto gehen nicht — meld dich bei uns.` };
  }

  const r = await migadu("/domains", { method: "POST", body: { name: domain } });
  if (!r.ok) {
    return { fehler: `Migadu meldet: ${r.daten.error ?? r.status}` };
  }
  // Zuordnung dauerhaft bei Migadu hinterlegen
  await migadu(`/domains/${domain}`, {
    method: "PUT",
    body: { description: marke(userId) },
  });
  return { domain };
}

export async function postfaecherVon(domain: string) {
  const r = await migadu(`/domains/${domain}/mailboxes`);
  const liste = (r.daten.mailboxes ?? []) as Record<string, unknown>[];
  return liste.map((m) => ({
    adresse: m.address as string,
    name: m.name as string,
    tageslimit: m.daily_outgoing_limit as number,
  }));
}

export async function postfachAnlegen(
  domain: string,
  teil: string,
  name: string,
  passwort: string
): Promise<{ adresse?: string; fehler?: string }> {
  if ((await postfaecherVon(domain)).length >= MAX_POSTFAECHER) {
    return { fehler: `Mehr als ${MAX_POSTFAECHER} Postfächer pro Domain gehen nicht.` };
  }
  const r = await migadu(`/domains/${domain}/mailboxes`, {
    method: "POST",
    body: {
      local_part: teil,
      name,
      password: passwort,
      daily_outgoing_limit: TAGESLIMIT,
    },
  });
  if (!r.ok) return { fehler: `Migadu meldet: ${r.daten.error ?? r.status}` };
  return { adresse: r.daten.address as string };
}

export async function postfachLoeschen(domain: string, teil: string) {
  const r = await migadu(`/domains/${domain}/mailboxes/${teil}`, { method: "DELETE" });
  return r.ok;
}

export async function aliasAnlegen(
  domain: string,
  teil: string,
  ziele: string[]
): Promise<{ adresse?: string; fehler?: string }> {
  const r = await migadu(`/domains/${domain}/aliases`, {
    method: "POST",
    body: { local_part: teil, destinations: ziele },
  });
  if (!r.ok) return { fehler: `Migadu meldet: ${r.daten.error ?? r.status}` };
  return { adresse: r.daten.address as string };
}
