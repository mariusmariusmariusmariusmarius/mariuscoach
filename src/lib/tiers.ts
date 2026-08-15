/**
 * Account-Stufen der Plattform.
 * Die Reihenfolge definiert die Rangfolge: Jede Stufe schaltet
 * alle Inhalte der darunterliegenden Stufen mit frei.
 *
 * Später: Stufe wird über Stripe-Subscription gesetzt (Webhook → DB).
 */
export const TIERS = ["free", "starter", "pro"] as const;
export type Tier = (typeof TIERS)[number];

export type Role = "member" | "admin";

export const TIER_INFO: Record<
  Tier,
  {
    label: string;
    price: string;
    priceHint: string;
    tagline: string;
    features: string[];
    highlight?: boolean;
  }
> = {
  free: {
    label: "Free",
    price: "0 €",
    priceHint: "für immer",
    tagline: "Starte mit den Grundlagen",
    features: [
      "Basics-Modul komplett frei",
      "Eigene Domain + E-Mail in 30 Minuten",
      "Community lesen",
    ],
  },
  starter: {
    label: "Starter",
    price: "49,90 €",
    priceHint: "pro Monat",
    tagline: "Baue deine erste eigene Website",
    features: [
      "Alle Free-Inhalte",
      "Website bauen mit Claude (17 Lektionen)",
      "Leads & Automation",
      "SEO & Google — gefunden werden",
      "Infos zu jeder Lektion: fertige Prompts zum Kopieren",
      "Community aktiv nutzen",
    ],
    highlight: true,
  },
  pro: {
    label: "Pro",
    price: "79,90 €",
    priceHint: "pro Monat",
    tagline: "Vom Projekt zum Business",
    features: [
      "30 Min. 1:1-Coaching pro Woche",
      "Alle Starter-Inhalte",
      "Ads & Marketing",
      "Onlineshop mit Stripe & Lieferanten-APIs",
      "Web-Apps, Server & Datenbank",
      "Eigene Tools: Terminbuchung, Admin-App & Co.",
      "Websites verkaufen: Preise, Kunden, Wartung",
    ],
  },
};

export function tierRank(tier: Tier): number {
  return TIERS.indexOf(tier);
}

/** Hat ein Account mit `userTier` Zugriff auf Inhalte der Stufe `required`? */
export function hasAccess(userTier: Tier, required: Tier): boolean {
  return tierRank(userTier) >= tierRank(required);
}
