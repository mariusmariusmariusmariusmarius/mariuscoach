/**
 * DNS-Zentrale: Teilnehmer-Domains als Zonen im Cloudflare-Konto der
 * Plattform, plus je Domain ein Cloudflare-Token, das NUR diese eine Zone
 * bearbeiten darf (DNS Write, zone-scoped — Cloudflare erzwingt das).
 *
 * Der Teilnehmer gibt seine Domain ein und bekommt die zwei Nameserver
 * und sein Token zurück. Registriert bleibt die Domain, wo sie ist —
 * nur das Adressbuch zieht hierher um.
 *
 * Ablage in-memory wie der Userstore; die echten Daten (Zone, Token)
 * leben bei Cloudflare und überleben jeden Neustart. Verloren geht beim
 * Kaltstart also nur die Zuordnung Nutzer→Domain — die bauen wir beim
 * Wechsel auf die Datenbank dauerhaft.
 */

export type DomainEintrag = {
  domain: string;
  zoneId: string;
  nameServers: string[];
  /** Cloudflare-Token, nur für diese Zone (DNS Write) */
  token: string;
  tokenId: string;
  angelegt: string;
};

const store = globalThis as unknown as {
  __mcDomains?: Map<string, DomainEintrag[]>;
};
if (!store.__mcDomains) {
  store.__mcDomains = new Map();
}
const domains = store.__mcDomains;

export const MAX_DOMAINS_PRO_KONTO = 3;

const API = "https://api.cloudflare.com/client/v4";

function kopf() {
  return {
    Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
    "Content-Type": "application/json",
  };
}

export function dnsKonfiguriert(): boolean {
  return Boolean(
    process.env.CLOUDFLARE_API_TOKEN && process.env.CLOUDFLARE_ACCOUNT_ID
  );
}

export function domainsVon(userId: string): DomainEintrag[] {
  return domains.get(userId) ?? [];
}

export function domainSchonVergeben(domain: string): boolean {
  for (const liste of domains.values()) {
    if (liste.some((d) => d.domain === domain)) return true;
  }
  return false;
}

type CfAntwort<T> = {
  success: boolean;
  errors?: { code: number; message: string }[];
  result: T;
};

/** Rechtegruppe "DNS Write" — einmal nachschlagen, dann gemerkt */
let dnsWriteGruppe: string | null = null;
async function holeDnsWriteGruppe(): Promise<string> {
  if (dnsWriteGruppe) return dnsWriteGruppe;
  const acct = process.env.CLOUDFLARE_ACCOUNT_ID;
  const r = (await fetch(`${API}/accounts/${acct}/tokens/permission_groups`, {
    headers: kopf(),
  }).then((x) => x.json())) as CfAntwort<{ id: string; name: string }[]>;
  const g = r.result?.find((x) => x.name === "DNS Write");
  if (!g) throw new Error("Rechtegruppe 'DNS Write' nicht gefunden.");
  dnsWriteGruppe = g.id;
  return g.id;
}

export async function zoneAnlegen(
  userId: string,
  domainRoh: string
): Promise<{ eintrag?: DomainEintrag; fehler?: string }> {
  const domain = domainRoh.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  if (!/^[a-z0-9äöüß-]+(\.[a-z0-9-]+)+$/.test(domain)) {
    return { fehler: "Das sieht nicht wie eine Domain aus. Beispiel: meine-firma.de" };
  }
  const eigene = domainsVon(userId);
  if (eigene.some((d) => d.domain === domain)) {
    return { eintrag: eigene.find((d) => d.domain === domain) };
  }
  if (eigene.length >= MAX_DOMAINS_PRO_KONTO) {
    return { fehler: `Mehr als ${MAX_DOMAINS_PRO_KONTO} Domains pro Konto gehen nicht — meld dich bei uns.` };
  }
  if (domainSchonVergeben(domain)) {
    return { fehler: "Diese Domain ist auf der Plattform schon einem anderen Konto zugeordnet." };
  }

  const acct = process.env.CLOUDFLARE_ACCOUNT_ID;

  // 1) Zone anlegen
  const zone = (await fetch(`${API}/zones`, {
    method: "POST",
    headers: kopf(),
    body: JSON.stringify({ name: domain, account: { id: acct }, type: "full" }),
  }).then((x) => x.json())) as CfAntwort<{
    id: string;
    name_servers: string[];
  }>;
  if (!zone.success) {
    const m = zone.errors?.[0]?.message ?? "Unbekannter Fehler bei Cloudflare.";
    // 1061 = Zone existiert bereits (in irgendeinem Cloudflare-Konto)
    if (zone.errors?.[0]?.code === 1061) {
      return { fehler: "Diese Domain liegt schon bei Cloudflare (vielleicht ein altes Konto?). Meld dich bei uns, wir lösen das." };
    }
    return { fehler: `Cloudflare sagt: ${m}` };
  }

  // 2) Token nur für diese Zone prägen
  const gruppe = await holeDnsWriteGruppe();
  const token = (await fetch(`${API}/accounts/${acct}/tokens`, {
    method: "POST",
    headers: kopf(),
    body: JSON.stringify({
      name: `mm-dns ${domain}`,
      policies: [
        {
          effect: "allow",
          resources: { [`com.cloudflare.api.account.zone.${zone.result.id}`]: "*" },
          permission_groups: [{ id: gruppe }],
        },
      ],
    }),
  }).then((x) => x.json())) as CfAntwort<{ id: string; value: string }>;
  if (!token.success) {
    // Zone wieder wegräumen, sonst bleibt eine halbe Baustelle liegen
    await fetch(`${API}/zones/${zone.result.id}`, { method: "DELETE", headers: kopf() });
    return { fehler: `Token ließ sich nicht erzeugen: ${token.errors?.[0]?.message ?? "unbekannt"}` };
  }

  const eintrag: DomainEintrag = {
    domain,
    zoneId: zone.result.id,
    nameServers: zone.result.name_servers ?? [],
    token: token.result.value,
    tokenId: token.result.id,
    angelegt: new Date().toISOString().slice(0, 10),
  };
  domains.set(userId, [...eigene, eintrag]);
  return { eintrag };
}

/** Zonen-Status live bei Cloudflare nachsehen (active = Nameserver umgestellt) */
export async function zonenStatus(zoneId: string): Promise<string> {
  const r = (await fetch(`${API}/zones/${zoneId}`, { headers: kopf() }).then((x) =>
    x.json()
  )) as CfAntwort<{ status: string }>;
  return r.success ? r.result.status : "unbekannt";
}

/** Not-Aus: Zone samt Token entfernen (nur eigene) */
export async function zoneEntfernen(
  userId: string,
  domain: string
): Promise<{ ok: boolean; fehler?: string }> {
  const eigene = domainsVon(userId);
  const eintrag = eigene.find((d) => d.domain === domain);
  if (!eintrag) return { ok: false, fehler: "Diese Domain gehört nicht zu deinem Konto." };
  const acct = process.env.CLOUDFLARE_ACCOUNT_ID;
  await fetch(`${API}/accounts/${acct}/tokens/${eintrag.tokenId}`, {
    method: "DELETE",
    headers: kopf(),
  });
  const r = (await fetch(`${API}/zones/${eintrag.zoneId}`, {
    method: "DELETE",
    headers: kopf(),
  }).then((x) => x.json())) as CfAntwort<unknown>;
  if (!r.success) return { ok: false, fehler: r.errors?.[0]?.message ?? "Löschen fehlgeschlagen." };
  domains.set(
    userId,
    eigene.filter((d) => d.domain !== domain)
  );
  return { ok: true };
}
