import type { Tier } from "@/lib/tiers";

/**
 * Das Curriculum der Plattform.
 * Aktuell statisch als Gerüst — später kommt das aus der Datenbank (Neon)
 * und wird über den Admin-Bereich gepflegt.
 */

export type Lesson = {
  slug: string;
  title: string;
  description: string;
  /** Minuten, rein informativ */
  duration: number;
  kind: "video" | "text" | "case";
};

export type CourseModule = {
  slug: string;
  title: string;
  subtitle: string;
  /** Mindest-Stufe, um das Modul zu öffnen */
  tier: Tier;
  /** Name eines lucide-Icons, Zuordnung in components/icon-map */
  icon: string;
  /** Tailwind-Gradient für die Modul-Karte */
  gradient: string;
  lessons: Lesson[];
};

export const CURRICULUM: CourseModule[] = [
  {
    slug: "basics",
    title: "Basics",
    subtitle: "Das Fundament: Domain, E-Mail & Website verstehen",
    tier: "free",
    icon: "compass",
    gradient: "from-sky-500/80 to-cyan-400/80",
    lessons: [
      {
        slug: "was-ist-eine-domain",
        title: "Was ist eine Domain?",
        description:
          "Wie Domains funktionieren, was sie kosten und wie du die richtige für dein Projekt findest.",
        duration: 12,
        kind: "video",
      },
      {
        slug: "email-adressen-anlegen",
        title: "E-Mail-Adressen anlegen",
        description:
          "Professionelle E-Mail-Adressen auf deiner eigenen Domain einrichten — Schritt für Schritt.",
        duration: 15,
        kind: "video",
      },
      {
        slug: "was-ist-eine-webseite",
        title: "Was ist eine Webseite?",
        description:
          "HTML, Server, Browser: Wie eine Website wirklich funktioniert — einfach erklärt.",
        duration: 18,
        kind: "video",
      },
    ],
  },
  {
    slug: "website-bauen-mit-claude",
    title: "Website bauen mit Claude",
    subtitle: "Deine unabhängige Website — selbst gebaut, selbst gehostet",
    tier: "starter",
    icon: "sparkles",
    gradient: "from-violet-500/80 to-fuchsia-500/80",
    lessons: [
      {
        slug: "unabhaengige-website-mit-claude",
        title: "Eine unabhängige Website mit Claude bauen",
        description:
          "Von der leeren Datei zur fertigen Website: Wie du mit Claude eine Seite baust, die dir gehört — ohne Baukasten.",
        duration: 45,
        kind: "video",
      },
      {
        slug: "selbst-hosten",
        title: "Selbst hosten",
        description:
          "Deine Website live bringen: Hosting-Optionen im Vergleich und dein erstes eigenes Deployment.",
        duration: 30,
        kind: "video",
      },
      {
        slug: "domain-mit-website-verbinden",
        title: "Domain mit Website verbinden",
        description:
          "DNS ohne Kopfschmerzen: Deine Domain zeigt auf deine Website — mit SSL.",
        duration: 20,
        kind: "video",
      },
      {
        slug: "anfragebogen-integrieren",
        title: "Anfragebogen integrieren",
        description:
          "Ein Formular, das Anfragen sammelt statt nur hübsch auszusehen — Validierung inklusive.",
        duration: 25,
        kind: "video",
      },
      {
        slug: "eigene-bilder-einbinden",
        title: "Eigene Bilder auf die Website bringen",
        description:
          "Bilder richtig einbinden: Formate, Größen, Ladezeit — damit deine Seite schnell bleibt.",
        duration: 18,
        kind: "video",
      },
      {
        slug: "ki-bilder-vs-eigene-bilder",
        title: "KI-Bilder vs. eigene Bilder",
        description:
          "Wann KI-Bilder überzeugen, wann eigene Fotos gewinnen — und wie du beides kombinierst.",
        duration: 15,
        kind: "video",
      },
      {
        slug: "rechtstexte",
        title: "Rechtstexte",
        description:
          "Impressum, Datenschutz & Co.: Was auf deine Seite muss und wo du es herbekommst.",
        duration: 20,
        kind: "text",
      },
      {
        slug: "landingpages-erstellen",
        title: "Landingpages erstellen",
        description:
          "Landingpages, die konvertieren: Aufbau, Headline, Call-to-Action — mit echten Beispielen.",
        duration: 35,
        kind: "video",
      },
    ],
  },
  {
    slug: "leads-und-automation",
    title: "Leads & Automation",
    subtitle: "Aus Besuchern werden Anfragen — vollautomatisch",
    tier: "starter",
    icon: "zap",
    gradient: "from-amber-400/80 to-orange-500/80",
    lessons: [
      {
        slug: "lead-automation",
        title: "Lead-Automation: Wo kommen die Leads hin?",
        description:
          "Vom Formular in dein System: Leads automatisch erfassen, speichern und weiterverarbeiten.",
        duration: 30,
        kind: "video",
      },
      {
        slug: "speicherung-der-daten",
        title: "Speicherung der Daten",
        description:
          "Wo deine Lead-Daten sicher liegen: Datenbank-Grundlagen und DSGVO-Basics.",
        duration: 22,
        kind: "video",
      },
      {
        slug: "email-automation",
        title: "E-Mail-Automation",
        description:
          "Kunden bekommen automatisch eine E-Mail: Bestätigungen, Follow-ups und Sequenzen einrichten.",
        duration: 28,
        kind: "video",
      },
      {
        slug: "higgs-integration",
        title: "Higgs-Integration",
        description:
          "KI-Medien direkt in deinen Workflow: Bilder, Videos und Audio automatisiert erzeugen.",
        duration: 25,
        kind: "video",
      },
    ],
  },
  {
    slug: "ads-und-marketing",
    title: "Ads & Marketing",
    subtitle: "Besucher kaufen: Meta Ads, Google Ads & Tracking",
    tier: "pro",
    icon: "megaphone",
    gradient: "from-rose-500/80 to-pink-500/80",
    lessons: [
      {
        slug: "meta-ads",
        title: "Meta Ads",
        description:
          "Kampagnen auf Facebook & Instagram aufsetzen: Zielgruppen, Creatives, Budget.",
        duration: 40,
        kind: "video",
      },
      {
        slug: "google-ads",
        title: "Google Ads",
        description:
          "Gefunden werden, wenn Leute suchen: Search-Kampagnen, die sich rechnen.",
        duration: 40,
        kind: "video",
      },
      {
        slug: "conversion-tracking",
        title: "Conversion-Tracking",
        description:
          "Wissen, was funktioniert: Pixel, Events und serverseitiges Tracking sauber einrichten.",
        duration: 30,
        kind: "video",
      },
      {
        slug: "anzeigen-optimieren",
        title: "Optimierung der Anzeigen",
        description:
          "Aus Daten Entscheidungen machen: Anzeigen testen, skalieren, abschalten.",
        duration: 25,
        kind: "case",
      },
    ],
  },
  {
    slug: "onlineshop",
    title: "Onlineshop",
    subtitle: "Verkaufen: Shop, Zahlungen, Abos & Warenwirtschaft",
    tier: "pro",
    icon: "shopping-bag",
    gradient: "from-emerald-500/80 to-teal-400/80",
    lessons: [
      {
        slug: "onlineshop-erstellen",
        title: "Onlineshop erstellen",
        description:
          "Dein eigener Shop von Grund auf: Produktseiten, Warenkorb, Checkout.",
        duration: 50,
        kind: "video",
      },
      {
        slug: "zahlungsanbieter",
        title: "Zahlungsanbieter: Einmalzahlung & Abos",
        description:
          "Stripe & Co. anbinden: Einmalzahlungen, Abo-Modelle und was bei Steuern zu beachten ist.",
        duration: 35,
        kind: "video",
      },
      {
        slug: "cms-und-produkte",
        title: "CMS & Produkte anbinden",
        description:
          "Produkte pflegen ohne Code: Ein CMS anbinden und Inhalte strukturieren.",
        duration: 30,
        kind: "video",
      },
      {
        slug: "warenwirtschaft-lager-versand",
        title: "Warenwirtschaft, Lager & Versand-API",
        description:
          "Der Maschinenraum: Bestände, Bestellungen und Versand automatisch abwickeln.",
        duration: 40,
        kind: "video",
      },
    ],
  },
  {
    slug: "server-und-auth",
    title: "Server, Datenbank & Auth",
    subtitle: "Advanced: Login-Bereiche, eigener Server, Webhooks",
    tier: "pro",
    icon: "server",
    gradient: "from-indigo-500/80 to-blue-500/80",
    lessons: [
      {
        slug: "login-bereich-und-auth",
        title: "Login-Bereich & Authentifizierung",
        description:
          "Geschützte Bereiche bauen: Sessions, Tokens und sichere Logins verstehen.",
        duration: 40,
        kind: "video",
      },
      {
        slug: "nutzer-anlegen-passwort-vergessen",
        title: "Nutzer anlegen & Passwort vergessen",
        description:
          "Der komplette Account-Flow: Registrierung, E-Mail-Bestätigung, Passwort-Reset.",
        duration: 30,
        kind: "video",
      },
      {
        slug: "eigener-server-hosting",
        title: "Eigener Server & Hosting",
        description:
          "Vom Managed Hosting zum eigenen Server: Wann sich der Schritt lohnt und wie er geht.",
        duration: 35,
        kind: "video",
      },
      {
        slug: "datenbank",
        title: "Datenbank",
        description:
          "Daten strukturiert speichern: Tabellen, Relationen und deine erste eigene Datenbank.",
        duration: 35,
        kind: "video",
      },
      {
        slug: "webhooks",
        title: "Webhooks",
        description:
          "Systeme verbinden: Wenn Dienst A automatisch Dienst B anstößt — live gebaut.",
        duration: 25,
        kind: "video",
      },
    ],
  },
  {
    slug: "eigene-tools",
    title: "Eigene Tools bauen",
    subtitle: "Terminbuchung, Angebote, Admin-App — Software für dein Business",
    tier: "pro",
    icon: "wrench",
    gradient: "from-purple-500/80 to-violet-400/80",
    lessons: [
      {
        slug: "terminbuchung",
        title: "Terminbuchungs-Tool",
        description:
          "Nie wieder E-Mail-Ping-Pong: Ein eigenes Buchungstool mit Kalender-Logik bauen.",
        duration: 45,
        kind: "case",
      },
      {
        slug: "angebotserstellung",
        title: "Angebotserstellung",
        description:
          "Angebote in Minuten statt Stunden: Ein Tool, das PDFs generiert und versendet.",
        duration: 40,
        kind: "case",
      },
      {
        slug: "admin-app",
        title: "Eigene Admin-App",
        description:
          "Dein Cockpit: Eine Admin-Oberfläche für Kunden, Aufträge und Inhalte.",
        duration: 50,
        kind: "case",
      },
    ],
  },
];

export function getModule(slug: string): CourseModule | undefined {
  return CURRICULUM.find((m) => m.slug === slug);
}

export function getLesson(
  moduleSlug: string,
  lessonSlug: string
): { module: CourseModule; lesson: Lesson; index: number } | undefined {
  const courseModule = getModule(moduleSlug);
  if (!courseModule) return undefined;
  const index = courseModule.lessons.findIndex((l) => l.slug === lessonSlug);
  if (index === -1) return undefined;
  return { module: courseModule, lesson: courseModule.lessons[index], index };
}

export function totalLessons(): number {
  return CURRICULUM.reduce((sum, m) => sum + m.lessons.length, 0);
}
