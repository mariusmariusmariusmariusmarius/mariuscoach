/**
 * Postfach-Zentrale: Migadu-Domains und -Postfächer für Teilnehmer.
 *
 * Migadu kennt keine Schlüssel je Domain — ihr API-Schlüssel gilt fürs ganze
 * Konto. Deshalb bekommt ihn kein Teilnehmer zu sehen: Er benutzt seinen
 * mm_-Schlüssel, und diese Schicht lässt nur Domains durch, die IHM gehören.
 *
 * Zuordnung wie überall in-memory (bis die Datenbank kommt) — die Daten
 * selbst leben bei Migadu und überstehen jeden Neustart.
 */

export type MailDomain = {
  domain: string;
  angelegt: string;
};

const store = globalThis as unknown as {
  __mcMailDomains?: Map<string, MailDomain[]>;
};
if (!store.__mcMailDomains) store.__mcMailDomains = new Map();
const registry = store.__mcMailDomains;

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

export function mailDomainsVon(userId: string): MailDomain[] {
  return registry.get(userId) ?? [];
}

export function gehoertNutzer(userId: string, domain: string): boolean {
  return mailDomainsVon(userId).some((d) => d.domain === domain);
}

function schonVergeben(domain: string): boolean {
  for (const liste of registry.values()) {
    if (liste.some((d) => d.domain === domain)) return true;
  }
  return false;
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
  if (gehoertNutzer(userId, domain)) return { domain };
  if (schonVergeben(domain)) {
    return { fehler: "Diese Domain ist bereits einem anderen Konto zugeordnet." };
  }
  if (mailDomainsVon(userId).length >= MAX_MAIL_DOMAINS) {
    return { fehler: `Mehr als ${MAX_MAIL_DOMAINS} Domains pro Konto gehen nicht — meld dich bei uns.` };
  }

  const r = await migadu("/domains", { method: "POST", body: { name: domain } });
  if (!r.ok) {
    return { fehler: `Migadu meldet: ${r.daten.error ?? r.status}` };
  }
  registry.set(userId, [
    ...mailDomainsVon(userId),
    { domain, angelegt: new Date().toISOString().slice(0, 10) },
  ]);
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
