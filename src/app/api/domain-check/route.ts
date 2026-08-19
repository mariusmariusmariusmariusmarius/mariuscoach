import { NextRequest, NextResponse } from "next/server";

/**
 * Domain-Verfügbarkeit über RDAP — das offizielle Auskunftsprotokoll der
 * Registrierungsstellen (Nachfolger von Whois).
 *
 * Wir fragen die zuständige Stelle DIREKT: Die IANA veröffentlicht ein
 * Verzeichnis, welche Endung zu welchem RDAP-Server gehört. Der Umweg über
 * Sammeldienste wie rdap.org war unzuverlässig (mal Zeitüberschreitung, mal
 * falsche Antwort bei .de).
 *
 * 404 heißt: nicht registriert, also frei.
 */

type Verzeichnis = Map<string, string>;
let verzeichnis: Verzeichnis | null = null;
let geladenAm = 0;

/** IANA-Verzeichnis holen und einen Tag lang behalten */
async function holeVerzeichnis(): Promise<Verzeichnis> {
  const einTag = 24 * 60 * 60 * 1000;
  if (verzeichnis && Date.now() - geladenAm < einTag) return verzeichnis;

  const r = await fetch("https://data.iana.org/rdap/dns.json", {
    signal: AbortSignal.timeout(8_000),
  });
  const d = (await r.json()) as { services: [string[], string[]][] };
  const karte: Verzeichnis = new Map();
  for (const [endungen, server] of d.services) {
    for (const e of endungen) {
      if (server[0]) karte.set(e.toLowerCase(), server[0].replace(/\/$/, ""));
    }
  }
  verzeichnis = karte;
  geladenAm = Date.now();
  return karte;
}

export async function GET(req: NextRequest) {
  const roh = req.nextUrl.searchParams.get("domain") ?? "";
  const domain = roh
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
    .replace(/^www\./, "") // „www.meine-firma.de" ist keine eigene Domain
    .replace(/\.$/, "");

  if (!/^[a-z0-9äöüß-]+(\.[a-z0-9-]+)+$/.test(domain)) {
    return NextResponse.json(
      { fehler: "Das sieht nicht wie eine Domain aus. Beispiel: meine-firma.de" },
      { status: 400 }
    );
  }

  const endung = domain.slice(domain.lastIndexOf(".") + 1);

  try {
    let basis: string | undefined;
    try {
      basis = (await holeVerzeichnis()).get(endung);
    } catch {
      // Verzeichnis nicht erreichbar — unten fällt es auf rdap.org zurück
    }

    const quellen = [
      basis ? `${basis}/domain/${encodeURIComponent(domain)}` : null,
      `https://rdap.org/domain/${encodeURIComponent(domain)}`,
    ].filter(Boolean) as string[];

    for (const quelle of quellen) {
      let antwort: Response;
      try {
        antwort = await fetch(quelle, {
          redirect: "follow",
          headers: { Accept: "application/rdap+json" },
          signal: AbortSignal.timeout(9_000),
        });
      } catch {
        continue; // nächste Quelle probieren
      }

      if (antwort.status === 404) {
        return NextResponse.json({ domain, status: "frei" });
      }
      if (antwort.ok) {
        let ablauf: string | null = null;
        try {
          const d = (await antwort.json()) as {
            events?: { eventAction: string; eventDate: string }[];
          };
          ablauf =
            d.events
              ?.find((e) => e.eventAction === "expiration")
              ?.eventDate?.slice(0, 10) ?? null;
        } catch {
          // Auskunft ohne lesbares JSON — der Status reicht
        }
        return NextResponse.json({ domain, status: "vergeben", ablauf });
      }
      // 429/5xx: nächste Quelle probieren
    }

    return NextResponse.json({ domain, status: "unbekannt" });
  } catch {
    return NextResponse.json({ domain, status: "unbekannt" });
  }
}
