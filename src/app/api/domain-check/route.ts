import { NextRequest, NextResponse } from "next/server";

/**
 * Domain-Verfügbarkeit über RDAP — das offizielle, kostenlose
 * Auskunftsprotokoll der Registrierungsstellen (Nachfolger von Whois).
 *
 * rdap.org leitet zur zuständigen Stelle der jeweiligen Endung weiter
 * (.de → DENIC usw.). 404 heißt: nicht registriert, also frei.
 * Kein Konto, keine Kosten — deshalb braucht die Abfrage auch keine
 * Anmeldung.
 */

export async function GET(req: NextRequest) {
  const roh = req.nextUrl.searchParams.get("domain") ?? "";
  const domain = roh
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "");

  if (!/^[a-z0-9äöüß-]+(\.[a-z0-9-]+)+$/.test(domain)) {
    return NextResponse.json(
      { fehler: "Das sieht nicht wie eine Domain aus. Beispiel: meine-firma.de" },
      { status: 400 }
    );
  }

  try {
    const antwort = await fetch(
      `https://rdap.org/domain/${encodeURIComponent(domain)}`,
      { redirect: "follow", signal: AbortSignal.timeout(10_000) }
    );

    if (antwort.status === 404) {
      return NextResponse.json({ domain, status: "frei" });
    }
    if (antwort.ok) {
      // Ablaufdatum mitliefern, wenn die Auskunft eines nennt
      let ablauf: string | null = null;
      try {
        const d = (await antwort.json()) as {
          events?: { eventAction: string; eventDate: string }[];
        };
        ablauf =
          d.events?.find((e) => e.eventAction === "expiration")?.eventDate?.slice(0, 10) ??
          null;
      } catch {
        // Auskunft ohne lesbares JSON — Status reicht uns
      }
      return NextResponse.json({ domain, status: "vergeben", ablauf });
    }
    return NextResponse.json({ domain, status: "unbekannt" });
  } catch {
    return NextResponse.json({ domain, status: "unbekannt" });
  }
}
