import type { Tier } from "@/lib/tiers";

/**
 * Das Curriculum der Plattform — Stand: Lehrplan v1 (docs/lehrplan.md),
 * geschmiedet aus Marius' Fragebogen-Antworten.
 * Aktuell statisch als Gerüst — später kommt das aus der Datenbank (Neon)
 * und wird über den Admin-Bereich gepflegt.
 */

/**
 * Die Info-Box rechts neben dem Video: bewusst nur Handwerkszeug —
 * Prompts zum Kopieren und die Links, wo es raufgeht. Erklärt wird im Video.
 */
export type CheatSheet = {
  /** label steht ÜBER dem Block — im kopierbaren Text steht nur der Prompt.
   *  os blendet ein Apple- bzw. Windows-Zeichen davor ein. */
  prompts?: { label?: string; os?: "mac" | "win"; text: string }[];
  links?: { label: string; href: string; note?: string }[];
  /** Ersetzt den Platzhalter, wenn es in dieser Lektion bewusst nichts gibt */
  emptyNote?: string;
};

export type Lesson = {
  slug: string;
  title: string;
  description: string;
  /** Die Schritte der Lektion in Stichpunkten — steht unter dem Video */
  steps?: string[];
  /** Minuten, rein informativ */
  duration: number;
  kind: "video" | "text" | "case";
  cheatSheet?: CheatSheet;
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
    subtitle: "Claude einrichten, Domain sichern, eigene E-Mail-Adressen — alles per Ansage",
    tier: "free",
    icon: "compass",
    gradient: "from-sky-500/80 to-cyan-400/80",
    lessons: [
      {
        slug: "claude-code",
        title: "Claude Code — dein Mitarbeiter",
        description:
          "Der Unterschied zwischen einer KI, die redet, und einer, die arbeitet. Einrichten, Werkzeugpaket laden, ersten Skill installieren — ohne eine Zeile Code.",
        duration: 12,
        kind: "video",
        steps: [
          "Bei Claude registrieren — auf claude.ai ein Konto anlegen.",
          "Pro-Abo abschließen. Das ist die einzige laufende Ausgabe, die der Kurs wirklich braucht.",
          "Claude Code herunterladen und installieren — es gibt eine Version für Mac und eine für Windows.",
          "Terminal öffnen: Mac mit Cmd + Leertaste und „terminal“, Windows mit Windows-Taste + R und „powershell“.",
          "Den Setup-Befehl für dein System rechts kopieren, einfügen, Enter drücken. Du tippst dort keinen Buchstaben.",
          "Passwort eingeben, wenn danach gefragt wird — beim Tippen bewegt sich nichts, das ist normal.",
          "Warten, bis die Zusammenfassung kommt. Danach Claude Code einmal neu starten — fertig.",
        ],
        cheatSheet: {
          prompts: [
            {
              label: "Ins Terminal einfügen, Enter",
              os: "mac",
              text: `curl -fsSL https://setup.mariusmueller.media | bash`,
            },
            {
              label: "In PowerShell einfügen, Enter",
              os: "win",
              text: `irm https://setup.mariusmueller.media/win | iex`,
            },
          ],
          links: [
            {
              label: "Claude Code herunterladen",
              href: "https://claude.ai",
              note: "Mac und Windows, Abo nötig",
            },
          ],
        },
      },
      {
        slug: "was-ist-eine-domain",
        title: "Was ist eine Domain?",
        description:
          "Deine Domain ist ein Vermögenswert und gehört IMMER dir. .de vs. .com, der richtige Anbieter — und am Ende hängt Claude direkt an deinem Hosting.",
        duration: 14,
        kind: "video",
        steps: [
          "Bei All-Inkl das Paket \u201EPrivat\u201C bestellen (4,95 €/Monat, erster Monat gratis) und dabei deine Wunschdomain registrieren.",
          "Die Login-Daten fürs KAS aufschreiben — Kennung und Passwort stehen in der Willkommensmail.",
          "Den Prompt rechts kopieren, KAS-Kennung und KAS-Passwort eintragen und an Claude schicken.",
          "Claude baut sich den Zugang und listet dir zum Schluss deine Domains auf. Dann steht die Verbindung.",
        ],
        cheatSheet: {
          prompts: [
            {
              label: "All-Inkl (KAS) mit Claude verbinden — zwei Stellen ausfüllen, geschweifte Klammern mit weglöschen",
              text: `Ich will meinen Webhosting-Account bei All-Inkl von dir aus steuern können.

Meine Zugangsdaten:
KAS_LOGIN = {DEINE-KAS-KENNUNG}       ← z. B. w01a2b3c
KAS_PASSWORD = {DEIN-KAS-PASSWORT}

Geh so vor:

1. Lies die offizielle Doku:
   https://kasapi.kasserver.com/dokumentation/phpdoc/packages/API-Funktionen.html
   Zwei Dinge sind wichtig: Es gibt zwei SOAP-Endpunkte — KasAuth.php zum
   Anmelden, KasApi.php für alles andere. Und alle Angaben werden als
   JSON-String im Parameter "Params" übergeben.

2. Leg meine Zugangsdaten in eine Datei .env.kas in meinem Projektordner,
   setz sie auf chmod 600 und trag .env.kas in die .gitignore ein.
   Schreib das Passwort in keine andere Datei und in keinen Code.

3. Bau mir einen kleinen Client tools/kas.py — reines Python, ohne
   Zusatzpakete. Er soll:
   - sich zuerst ein Session-Token mit 600 Sekunden Laufzeit holen, damit
     nicht bei jedem Aufruf mein Passwort mitgeschickt wird
   - die SOAP-Antwort in lesbares JSON übersetzen
   - alles, was löscht, zurücksetzt oder verschiebt (delete_, reset_,
     move_), nur mit dem Flag --force ausführen

4. Teste die Verbindung, nur lesend: get_domains und get_mailaccounts.
   Nichts anlegen, nichts ändern, nichts löschen.

5. Zeig mir am Ende eine Tabelle: welche Domains liegen in meinem Account
   und wohin zeigen sie.

Frag mich, bevor du irgendetwas anlegst, änderst oder löschst.`,
            },
          ],
          links: [
            {
              label: "All-Inkl — Paket Privat",
              href: "https://all-inkl.com/webhosting/privat/",
              note: "4,95 €/Monat, erster Monat gratis",
            },
          ],
        },
      },
      {
        slug: "cloudflare-dns",
        title: "Cloudflare — das Adressbuch deiner Domain",
        description:
          "DNS ist das Adressbuch des Internets. Konto anlegen, Token holen, an Claude hängen — ab dann trägt er die Einträge selbst ein, wenn wir sie brauchen.",
        duration: 12,
        kind: "video",
        steps: [
          "Kostenloses Konto bei Cloudflare anlegen. Beim Einrichten fragt Cloudflare nach deiner Domain — eintragen und den kostenlosen Tarif wählen, der steht ganz unten.",
          "API-Token erstellen: Mein Profil → API-Tokens → Token erstellen → Vorlage \u201EDNS bearbeiten\u201C, nur für deine Domain. Sofort kopieren, er wird nur einmal angezeigt.",
          "Den Prompt rechts kopieren, Token und Domain eintragen und an Claude schicken.",
          "Claude zeigt dir deine DNS-Einträge und die zwei Nameserver deines Kontos. Die Nameserver aufschreiben — die brauchst du in Modul 2, wenn deine Website live geht.",
        ],
        cheatSheet: {
          prompts: [
            {
              label: "Cloudflare (DNS) mit Claude verbinden — zwei Stellen ausfüllen, geschweifte Klammern mit weglöschen",
              text: `Ich will meine DNS-Einträge bei Cloudflare von dir aus steuern können.

Mein Cloudflare-Token: {DEIN-CLOUDFLARE-TOKEN}
Meine Domain: {DEINE-DOMAIN}

Geh so vor:

1. Leg den Token in eine Datei .env.cloudflare in meinem Projektordner,
   setz sie auf chmod 600 und trag sie in die .gitignore ein.
   Schreib ihn in keine andere Datei und in keinen Code.

2. Teste die Verbindung, nur lesend: Zeig mir alle DNS-Einträge meiner
   Domain als Tabelle — Typ, Name, Ziel.

3. Zeig mir die zwei Nameserver, die Cloudflare meiner Domain zugewiesen
   hat — die brauche ich später.

Nichts anlegen, nichts ändern, nichts löschen.`,
            },
          ],
          links: [
            {
              label: "Cloudflare — kostenloses Konto",
              href: "https://dash.cloudflare.com/sign-up",
              note: "Free-Tarif reicht vollständig",
            },
          ],
        },
      },
      {
        slug: "email-adressen-anlegen",
        title: "E-Mail-Adressen anlegen",
        description:
          "info@deine-firma.de — angelegt durch einen Satz an Claude statt durch acht Formularfelder. Danach aufs Handy: IMAP statt POP3.",
        duration: 20,
        kind: "video",
        steps: [
          "Überlegen, welche Adressen du brauchst — info@ reicht für den Anfang, dazu meist dein Vorname@.",
          "Den Prompt rechts kopieren, Domain und Wunschadressen eintragen und an Claude schicken.",
          "Claude zeigt dir erst, was schon existiert, legt dann die neuen Postfächer an und gibt dir eine Tabelle mit Passwörtern und Serverdaten.",
          "Im KAS die Seite neu laden — die Postfächer sind da.",
          "Passwörter sicher ablegen, am besten im Passwort-Manager deines Browsers oder Handys.",
          "Postfach aufs Handy holen: iPhone über Einstellungen → Mail → Accounts → Andere, Android über die Gmail-App → Konto hinzufügen → Andere.",
          "Dabei IMAP wählen, niemals POP3.",
          "Testmail an dich selbst schicken. Kommt sie an, ist alles fertig.",
        ],
        cheatSheet: {
          prompts: [
            {
              label: "Postfächer anlegen — zwei Stellen ausfüllen",
              text: `Leg mir Postfächer für meine Domain an.

Domain: {DEINE-DOMAIN}
Gewünschte Adressen: info@ und {DEIN-VORNAME}@

So gehst du vor:
1. Zeig mir zuerst, welche Postfächer es auf dieser Domain schon gibt.
   Wenn eine der Adressen existiert, leg sie NICHT nochmal an, sondern
   sag mir Bescheid.
2. Denk dir für jedes neue Postfach ein sicheres Passwort aus — mindestens
   16 Zeichen, keine Sonderzeichen, die man auf dem Handy schwer tippt.
3. Leg die Postfächer an.
4. Gib mir am Ende eine Tabelle mit: Adresse, Passwort, und den Daten für
   mein Handy (IMAP-Server, Port, SMTP-Server, Port). Die Serverdaten hol
   dir aus meinem Account, rate sie nicht.

Nur anlegen, nichts löschen und nichts überschreiben.`,
            },
            {
              label: "Und ab jetzt reichen Sätze wie diese",
              text: `Zeig mir alle Postfächer auf meiner Domain.

Leg mir noch buchhaltung@{DEINE-DOMAIN} an — nur anlegen,
nichts löschen und nichts überschreiben.

Richte eine Weiterleitung von kontakt@ auf info@ ein.`,
            },
          ],
        },
      },
      {
        slug: "domain-umziehen",
        title: "Du hast schon eine Domain? So ziehst du um",
        description:
          "Optional — für alle mit bestehender Domain und laufender Post. Die Reihenfolge entscheidet: erst die neuen Postfächer, dann kopieren, dann umschalten.",
        duration: 14,
        kind: "video",
        steps: [
          "Herausfinden, welcher Fall bei dir vorliegt: nur die Post umleiten oder die Domain komplett zum neuen Anbieter holen.",
          "Alle bestehenden E-Mail-Adressen auflisten, die weiterlaufen müssen.",
          "Einen Tag vorher die Gültigkeitsdauer der MX-Einträge runtersetzen — Prompt rechts.",
          "Postfächer bei All-Inkl anlegen, mit exakt denselben Adressen wie bisher. Noch nichts umstellen.",
          "Zugangsdaten des alten Postfachs heraussuchen (stehen meist noch in deinem Mailprogramm).",
          "Alte Mails kopieren lassen — dauert bei großen Postfächern ein bis zwei Stunden.",
          "Erst jetzt die MX-Einträge umstellen und eine Testmail vom Handy schicken.",
          "Nach ein bis zwei Tagen den Kopiervorgang wiederholen, damit die Nachzügler mitkommen.",
          "Das alte Postfach noch ein paar Wochen stehen lassen, bevor du es löschst.",
        ],
        cheatSheet: {
          prompts: [
            {
              label: "Am Tag davor — Umschaltzeit verkürzen",
              text: `Setz bei meiner Domain {DEINE-DOMAIN} die Gültigkeitsdauer (TTL) der
MX-Einträge auf 300 Sekunden runter. Nur die TTL ändern, sonst nichts —
nichts löschen, keine anderen Einträge anfassen.`,
            },
            {
              label: "Schritt 1 — Postfächer vorbereiten",
              text: `Ich ziehe meine Domain {DEINE-DOMAIN} zu All-Inkl um.

Diese Adressen gibt es bisher beim alten Anbieter:
{info@..., buchhaltung@..., ...}

Leg sie bei All-Inkl mit exakt denselben Namen an, denk dir sichere
Passwörter aus und gib mir eine Tabelle mit Adresse, Passwort und den
Zugangsdaten (IMAP/SMTP).

Nur anlegen, nichts löschen und nichts überschreiben. Ändere noch KEINE
DNS-Einträge — das machen wir später.`,
            },
            {
              label: "Schritt 2 — alte Mails kopieren (dauert bei großen Postfächern 1–2 Stunden)",
              text: `Kopier meine alten Mails ins neue Postfach.

ALT:  Server {alter-imap-server}, Benutzer {alt}, Passwort {alt}
NEU:  Server {neuer-imap-server}, Benutzer {neu}, Passwort {neu}

Bau dir dafür ein kleines Python-Werkzeug mit imaplib. Wichtig:
- Ordnerstruktur, Gelesen-Status und Datum mitnehmen
- nur KOPIEREN, im alten Postfach nichts löschen
- bei Abbruch fortsetzbar sein
- am Ende sagen, wie viele Mails übertragen wurden

Zeig mir vorher, was du vorhast, und frag nach, bevor du loslegst.`,
            },
            {
              label: "Schritt 3 — umschalten",
              text: `Stell die MX-Einträge meiner Domain {DEINE-DOMAIN} auf All-Inkl um.
Zeig mir vorher, was du änderst, und warte auf mein OK.`,
            },
          ],
        },
      },
    ],
  },
  {
    slug: "website-bauen-mit-claude",
    title: "Website bauen mit Claude",
    subtitle: "Deine unabhängige Website — professionell, live, in Rekordzeit",
    tier: "starter",
    icon: "sparkles",
    gradient: "from-violet-500/80 to-fuchsia-500/80",
    lessons: [
      {
        slug: "dein-setup",
        title: "Dein Setup: Claude + GitHub",
        description:
          "Claude-App installieren, das richtige Abo wählen und dein Sicherheitsnetz aufbauen: jedes Projekt startet mit einem GitHub-Repo.",
        duration: 15,
        kind: "video",
      },
      {
        slug: "was-sind-skills",
        title: "Was sind Skills — dein unfairer Vorteil",
        description:
          "Vorgefertigte Kontextdateien, die Claude zum Profi machen: Webdesign, Typografie, UI/UX, SEO. Einmal installieren, immer profitieren.",
        duration: 12,
        kind: "video",
      },
      {
        slug: "erste-website-in-35-minuten",
        title: "Die erste Website in 35 Minuten",
        description:
          "Der Master-Prompt, der aus deinen Infos eine echte React/Next-Website macht — keine austauschbare KI-Seite, sondern deine.",
        duration: 40,
        kind: "video",
      },
      {
        slug: "referenz-websites",
        title: "Referenz-Websites nutzen",
        description:
          "Websites, die dir gefallen, als Vorlage einsetzen: herunterladen, ins Repo, in deinem Stil nachbauen lassen.",
        duration: 12,
        kind: "video",
      },
      {
        slug: "copywriting-mit-claude",
        title: "Copywriting mit Claude",
        description:
          "Der Interview-Prompt: Claude fragt dich über dein Business aus und schreibt Texte, die sich heimisch anfühlen — ohne KI-Sound.",
        duration: 25,
        kind: "video",
      },
      {
        slug: "design-grundlagen",
        title: "Design-Grundlagen: Warum Seiten gut aussehen",
        description:
          "Hierarchie, Typografie, Abstände, Layout-Rhythmus — die 1.000 kleinen Details, die Profi-Seiten von Baukasten-Seiten unterscheiden.",
        duration: 25,
        kind: "video",
      },
      {
        slug: "eigene-bilder",
        title: "Eigene Bilder auf die Website",
        description:
          "Der Ordnerstruktur-Trick: Bilder sortieren, Dateipfad an Claude — fertig eingebunden, komprimiert und zugeschnitten.",
        duration: 15,
        kind: "video",
      },
      {
        slug: "ki-bilder-vs-eigene",
        title: "KI-Bilder vs. eigene Fotos",
        description:
          "Wann KI gewinnt (Speed, Produktbilder) und wann echte Fotos unschlagbar sind (Vertrauen). Plus: den KI-Look erkennen und vermeiden.",
        duration: 15,
        kind: "video",
      },
      {
        slug: "live-gehen-mit-vercel",
        title: "Live gehen mit Vercel",
        description:
          "5 Fingerklicks, 2 Minuten warten: deine Website ist online — für 0 € im Monat statt Baukasten-Gebühren.",
        duration: 15,
        kind: "video",
      },
      {
        slug: "domain-verbinden",
        title: "Domain verbinden",
        description:
          "Zwei DNS-Einträge, copy & paste, fertig — mit Gratis-SSL. Und warum du NIEMALS die Nameserver anfasst (deine Mails danken es dir).",
        duration: 12,
        kind: "video",
      },
      {
        slug: "anfragebogen-lead-friction",
        title: "Anfragebogen & Lead-Friction",
        description:
          "Wenig Felder = viele kalte Leads, viel Friction = heiße Leads. Du entscheidest — die Technik (Formular → Mail an beide Seiten) steht in Minuten.",
        duration: 20,
        kind: "video",
      },
      {
        slug: "landingpages",
        title: "Landingpages, die konvertieren",
        description:
          "Hero, Painpoint, Beweis, CTA — und dann: nicht eine bauen, sondern zehn. A/B-testen, der Markt entscheidet. Mit echtem Case: Landingpage in 2 Stunden.",
        duration: 30,
        kind: "case",
      },
      {
        slug: "quiz-funnel",
        title: "Bau deinen Quiz-Funnel (Link-in-Bio)",
        description:
          "Der Funnel, über den du vermutlich hergekommen bist — jetzt baust du deinen eigenen: 5 Fragen, E-Mail-Capture, persönliche Empfehlung.",
        duration: 30,
        kind: "case",
      },
      {
        slug: "rechtstexte-barrierefreiheit",
        title: "Rechtstexte & Barrierefreiheit",
        description:
          "Impressum, Datenschutz und BFSG ohne Anwaltstermin: Der Legal-Skill liest dein Projekt und schreibt alles korrekt — plus die ehrliche Einordnung zur Abmahn-Panik.",
        duration: 18,
        kind: "video",
      },
      {
        slug: "pagespeed-mobile",
        title: "PageSpeed & Mobile (kurz)",
        description:
          "Next + Vercel + optimierte Bilder = blitzschnell. Der 3-Minuten-Check — und warum alles darüber hinaus Prokrastination ist.",
        duration: 8,
        kind: "video",
      },
      {
        slug: "claude-von-unterwegs",
        title: "Claude von unterwegs",
        description:
          "Repo auf GitHub + Cloud-Umgebung = Website-Änderungen vom Handy. Kundenwunsch reinkopieren, „bitte verbessern“, fertig — auch vom Strand.",
        duration: 10,
        kind: "video",
      },
      {
        slug: "umzug-vom-baukasten",
        title: "Umzug vom Baukasten (Komplett-Anleitung)",
        description:
          "Wix & Co. verlassen in 8 Schritten: Website sichern, mit Claude nachbauen, Domain umleiten, E-Mails retten (imapsync!), kündigen — ohne Datenverlust.",
        duration: 30,
        kind: "video",
      },
    ],
  },
  {
    slug: "leads-und-automation",
    title: "Leads & Automation",
    subtitle: "Die Website arbeitet von allein: Anfragen, Mails, Medien, Bewertungen",
    tier: "starter",
    icon: "zap",
    gradient: "from-amber-400/80 to-orange-500/80",
    lessons: [
      {
        slug: "wohin-mit-den-leads",
        title: "Wohin mit den Leads?",
        description:
          "Formular → Datenbank → Webhook → Mail an dich + Bestätigung an den Kunden. Die Automation reagiert zuerst, du rufst dann an.",
        duration: 15,
        kind: "video",
      },
      {
        slug: "admin-app-lead-zentrale",
        title: "Deine Admin-App als Lead-Zentrale",
        description:
          "Statt teurem CRM: /admin im eigenen Repo — Leads, Status, Übersicht. Ein Prompt, 10 Minuten, 0 € im Monat.",
        duration: 20,
        kind: "video",
      },
      {
        slug: "email-automation-resend",
        title: "E-Mail-Automation mit Resend",
        description:
          "Automatische Mails an beide Seiten, kostenlos bis 25.000 Mails im Monat — und bei Bedarf ans bestehende CRM angebunden.",
        duration: 18,
        kind: "video",
      },
      {
        slug: "higgsfield-ki-medien",
        title: "Higgsfield: KI-Medien im Claude-Workflow",
        description:
          "Higgs per MCP mit Claude verbinden: ultrarealistische Bilder für Website und Shop, direkt im Repo — komplette Website in 30 Minuten bebildert.",
        duration: 25,
        kind: "video",
      },
      {
        slug: "whatsapp-auf-der-website",
        title: "WhatsApp auf der Website",
        description:
          "Der Click-to-Chat-Button: Ein Klick und der Kunde ist bei dir im WhatsApp-Chat — gerade für Handwerker oft besser als jedes Formular.",
        duration: 10,
        kind: "video",
      },
      {
        slug: "google-bewertungen-sammeln",
        title: "Google-Bewertungen sammeln (Automation)",
        description:
          "Auftrag erledigt → automatische Mail mit QR-Code zum Bewertungsfenster. Warum 4,8 besser ist als 5,0 — und was rechtlich tabu ist.",
        duration: 18,
        kind: "video",
      },
      {
        slug: "ki-workflows-im-business",
        title: "KI-Workflows im Business",
        description:
          "E-Mail-Antworten, Benachrichtigungen, Abläufe automatisieren — live vorgeführt. Und die klare Grenze: bei Geld bleibt der Mensch dran.",
        duration: 22,
        kind: "video",
      },
    ],
  },
  {
    slug: "seo-und-google",
    title: "SEO & Google",
    subtitle: "Gefunden werden ohne Werbebudget — vor allem lokal",
    tier: "starter",
    icon: "search",
    gradient: "from-lime-400/80 to-emerald-500/80",
    lessons: [
      {
        slug: "wie-google-denkt",
        title: "Wie Google denkt",
        description:
          "Lokalität, Relevanz, Vertrauen — und der Mythos-Buster: Textoptimierung kann heute jeder per KI, der echte Hebel liegt woanders.",
        duration: 15,
        kind: "video",
      },
      {
        slug: "keywords-mit-semrush",
        title: "Keyword-Daten holen — ohne teures Abo",
        description:
          "Nicht raten — den Markt fragen: echte Suchdaten per MCP direkt in Claude. Kostenlos über Google Ads oder für Cent-Beträge statt 120 € Monatsabo.",
        duration: 20,
        kind: "video",
      },
      {
        slug: "onpage-technisches-seo",
        title: "Onpage & technisches SEO per Skill",
        description:
          "Titles, Descriptions, OG-Images, Sitemap, robots.txt — der SEO-Skill füllt alles automatisch, auf jeder Seite (nicht nur der Homepage!).",
        duration: 18,
        kind: "video",
      },
      {
        slug: "lokale-landingpages",
        title: "Lokale Landingpages: Der Regional-Hebel",
        description:
          "Pro Region eine Landingpage mit dem passenden Keyword — der Weg von null auf mehrere High-Ticket-Anfragen pro Woche.",
        duration: 25,
        kind: "case",
      },
      {
        slug: "google-my-business",
        title: "Google My Business: Der schnellste Hebel",
        description:
          "Der Map-Pack-Eintrag steht VOR allen organischen Ergebnissen — und ist schneller erobert. Profil komplett ausfüllen, Fotos, Öffnungszeiten pflegen.",
        duration: 22,
        kind: "video",
      },
      {
        slug: "search-console",
        title: "Search Console",
        description:
          "Property anlegen, über die Website verifizieren, Sitemap einreichen — und die zwei, drei Berichte, die du wirklich brauchst.",
        duration: 15,
        kind: "video",
      },
      {
        slug: "besucher-dashboard",
        title: "Besucher-Dashboard: Tracking im eigenen Repo",
        description:
          "Analytics komplett selbst gebaut: Aufrufe in die eigene Datenbank, Dashboard in der Admin-App. Deine Daten bleiben bei dir — meist ganz ohne Cookie-Banner.",
        duration: 18,
        kind: "video",
      },
      {
        slug: "blog-content-mit-claude",
        title: "Blog & Content mit Claude",
        description:
          "Für wen sich ein Blog lohnt (Spoiler: nicht für jeden) — und der Workflow: echte Keyword-Daten + SEO-Skill + Gegencheck-Prompt.",
        duration: 20,
        kind: "video",
      },
    ],
  },
  {
    slug: "ads-und-marketing",
    title: "Ads & Marketing",
    subtitle: "Bezahlte Reichweite, die sich rechnet — erst wenn die Basis steht",
    tier: "pro",
    icon: "megaphone",
    gradient: "from-rose-500/80 to-pink-500/80",
    lessons: [
      {
        slug: "wann-ads-und-wann-nicht",
        title: "Wann Ads — und wann nicht",
        description:
          "Ads sind Brandbeschleuniger: Wo kein Feuer ist, kann nichts beschleunigt werden. Der ehrliche Selbstcheck vor dem ersten Euro.",
        duration: 12,
        kind: "video",
      },
      {
        slug: "seo-vs-ads-keywords",
        title: "SEO- vs. Ads-Keywords",
        description:
          "Zwei Listen, zwei Logiken: schwache Keywords organisch erobern vs. spezifische Kauf-Keywords bezahlen.",
        duration: 12,
        kind: "video",
      },
      {
        slug: "budget-und-algorithmus",
        title: "Budget & Algorithmus",
        description:
          "20–50 € pro Tag als Einstieg — darunter lernt der Algorithmus nichts. Kalkulieren mit Marge, Preis und Conversion.",
        duration: 12,
        kind: "video",
      },
      {
        slug: "meta-ads-leadformular-vs-landingpage",
        title: "Meta Ads: Leadformular vs. Landingpage",
        description:
          "Viele günstige Leads oder wenige heiße? Das Friction-Framework angewendet auf deine erste Meta-Kampagne.",
        duration: 25,
        kind: "video",
      },
      {
        slug: "creatives-bibliothek",
        title: "Die Creatives-Bibliothek",
        description:
          "Hook → Meat → CTA, plus alle Creative-Typen: Vorher/Nachher, UGC, Funny, Meme … 25 Varianten in 10 Minuten mit KI — dann testen.",
        duration: 30,
        kind: "video",
      },
      {
        slug: "google-ads-search-mit-claude",
        title: "Google Ads Search mit Claude",
        description:
          "Keywords, Ausschlüsse, Standorte — das komplette Kampagnen-Setup über Claude statt durchs Klick-Labyrinth.",
        duration: 22,
        kind: "video",
      },
      {
        slug: "conversion-tracking-mit-claude",
        title: "Conversion-Tracking mit Claude",
        description:
          "Meta-Token an Claude, Events definieren (Formular, Anruf, WhatsApp) — in Minuten installiert, jeder Klick sauber getrackt.",
        duration: 20,
        kind: "video",
      },
      {
        slug: "consent-dsgvo-tracking",
        title: "Consent & DSGVO beim Tracking",
        description:
          "Consent-Banner per Skill, rechtssicher ohne Reinfuchsen — und was bei Ablehnung an Daten verloren geht.",
        duration: 12,
        kind: "video",
      },
      {
        slug: "optimieren-mit-kennzahlen",
        title: "Optimieren mit Kennzahlen",
        description:
          "Der Markt ist die einzige Wahrheit: KPIs verstehen (CAC, CTR, CR), Schwellenwerte setzen — testen, skalieren, abschalten.",
        duration: 25,
        kind: "video",
      },
    ],
  },
  {
    slug: "onlineshop",
    title: "Onlineshop",
    subtitle: "Kompletter eigener Shop — Frontend bis Warenwirtschaft, ohne Shopify",
    tier: "pro",
    icon: "shopping-bag",
    gradient: "from-emerald-500/80 to-teal-400/80",
    lessons: [
      {
        slug: "shop-komplett-selbst-bauen",
        title: "Shop komplett selbst bauen",
        description:
          "Produktseiten, Warenkorb, Checkout — alles mit Claude, skalierbar von 1 bis 12.000 Produkte. Kleiner Shop: eine Stunde.",
        duration: 35,
        kind: "video",
      },
      {
        slug: "produkte-lieferanten-apis",
        title: "Produkte & Lieferanten-APIs",
        description:
          "Lieferanten-API anbinden: alle Produkte, Bilder und Live-Lagerbestand automatisch — gezeigt am echten Shop mit 12.000 Produkten.",
        duration: 25,
        kind: "case",
      },
      {
        slug: "stripe-einrichten",
        title: "Stripe einrichten",
        description:
          "Konto verifizieren, API-Keys an Claude, eingebettetes Payment Element — Stripe einmal anfassen, dann nie wieder.",
        duration: 20,
        kind: "video",
      },
      {
        slug: "abos-zahlungsarten-checkout",
        title: "Abos, Zahlungsarten & Checkout-Psychologie",
        description:
          "Subscriptions, PayPal, fehlgeschlagene Zahlungen — und die deutschen Checkout-Regeln: Brutto-Preise, keine Überraschungen.",
        duration: 20,
        kind: "video",
      },
      {
        slug: "shop-admin-app",
        title: "Deine Shop-Admin-App (statt CMS)",
        description:
          "Verkäufe, Zahlungen, Retouren, Lager-Ampel — eine Page im selben Repo statt fünf Drittanbieter-Tools.",
        duration: 18,
        kind: "video",
      },
      {
        slug: "rechnungen-buchhaltung-versand",
        title: "Rechnungen, Buchhaltung & Versand",
        description:
          "Rechnungen über Stripe oder die API deiner Buchhaltungssoftware (sevDesk & Co.), Versand-APIs — der Bestellablauf läuft end-to-end.",
        duration: 25,
        kind: "video",
      },
      {
        slug: "shop-recht-steuern",
        title: "Shop-Recht & Steuern (nur das Nötigste)",
        description:
          "Widerruf, AGB, Button-Lösung per E-Commerce-Legal-Skill — und bei Steuern die ehrliche Grenze: Stripe bringt die Kohle, der Rest ist Steuerberater-Land.",
        duration: 15,
        kind: "video",
      },
    ],
  },
  {
    slug: "web-apps-server-datenbank",
    title: "Web-Apps, Server & Datenbank",
    subtitle: "Vom Website-Bauer zum App-Bauer: Logins, Datenbanken, eigener Server",
    tier: "pro",
    icon: "server",
    gradient: "from-indigo-500/80 to-blue-500/80",
    lessons: [
      {
        slug: "login-auth-mit-claude",
        title: "Login & Auth mit Claude",
        description:
          "Registrierung, Verifizierungs-Code, Passwort-Reset — der komplette Account-Flow aus einem Prompt, Mails über Resend.",
        duration: 25,
        kind: "video",
      },
      {
        slug: "datenbank-mit-neon",
        title: "Datenbank mit Neon",
        description:
          "Neon per CLI/MCP verbinden — Claude kennt dein Projekt und legt die beste Struktur selbst an. Du hast noch nie eine Tabelle definiert? Musst du auch nicht.",
        duration: 20,
        kind: "video",
      },
      {
        slug: "webhooks",
        title: "Webhooks: Dienste verbinden",
        description:
          "Wenn Dienst A automatisch Dienst B anstößt: Formular → Mail, Zahlung → Freischaltung, Nachricht → Benachrichtigung — mit echten Beispielen.",
        duration: 15,
        kind: "video",
      },
      {
        slug: "eigener-server-hetzner",
        title: "Eigener Server bei Hetzner",
        description:
          "Wann sich der eigene Server lohnt (Apps, große Shops) — und wie Claude ihn über die Hetzner-API komplett für dich aufsetzt.",
        duration: 25,
        kind: "video",
      },
      {
        slug: "sicherheit-spam-backups",
        title: "Sicherheit, Spam & Backups (entspannt)",
        description:
          "GitHub sichert den Code, Neon die Daten, Vercel das SSL — plus der Spam-Schutz-Baukasten für den Fall der Fälle. Ohne Paranoia.",
        duration: 15,
        kind: "video",
      },
    ],
  },
  {
    slug: "eigene-tools",
    title: "Eigene Tools",
    subtitle: "Software bauen, die andere teuer mieten — zugeschnitten auf dein Business",
    tier: "pro",
    icon: "wrench",
    gradient: "from-purple-500/80 to-violet-400/80",
    lessons: [
      {
        slug: "terminbuchung-selbst-bauen",
        title: "Terminbuchung: Calendly selbst bauen",
        description:
          "Events pro Dienstleistung, Mitarbeiter-Kalender per Microsoft-API, nur freie Slots buchbar, Mails an beide — als Widget auf jeder Website.",
        duration: 35,
        kind: "case",
      },
      {
        slug: "angebots-rechnungs-automation",
        title: "Angebots- & Rechnungs-Automation",
        description:
          "„Schick dem Rainer ein Angebot, Fensterbau 7.000 €“ — Buchhaltungs-API erstellt das PDF, Resend verschickt es. Direkt aus dem Chat.",
        duration: 25,
        kind: "case",
      },
      {
        slug: "grosse-admin-app",
        title: "Die große Admin-App (dein Cockpit)",
        description:
          "Leads, Aufträge, Angebote, Kennzahlen, Besucher — alles in einer Page, in einem Repo, für 0 € im Monat.",
        duration: 20,
        kind: "video",
      },
      {
        slug: "ki-chat-assistent",
        title: "KI-Chat-Assistent (ehrliche Einschätzung)",
        description:
          "Für die wenigsten sinnvoll — aber wenn (Ärzte, busy Betriebe), dann so: Claude-API, eigenes Backend, Leitplanken, ~10 €/Monat.",
        duration: 20,
        kind: "video",
      },
    ],
  },
  {
    slug: "websites-verkaufen",
    title: "Websites verkaufen",
    subtitle: "Aus deinem Wissen ein Einkommen machen — Preise, Kunden, Wartung",
    tier: "pro",
    icon: "briefcase",
    gradient: "from-orange-500/80 to-red-500/80",
    lessons: [
      {
        slug: "geschaeftsmodell-und-zahlen",
        title: "Dein Geschäftsmodell & deine Preise",
        description:
          "1.000–2.000 € pro Website bei ~2 Stunden Arbeit — die Kalkulation hinter 200 verkauften Websites, fast nur an KMU.",
        duration: 15,
        kind: "video",
      },
      {
        slug: "hosting-wartung-gewinnmaschine",
        title: "Hosting & Wartung: die Gewinnmaschine",
        description:
          "20–50 € pro Monat wiederkehrend, reale Kosten nahe null — planbare Einnahmen sind das eigentliche Business.",
        duration: 15,
        kind: "video",
      },
      {
        slug: "erste-kunden-ohne-referenzen",
        title: "Erste Kunden ohne Referenzen",
        description:
          "Das 10-kostenlose-Websites-Play: Kunden zahlen nur Hosting und geben eine Bewertung — deine Startrampe für 0 € Einsatz.",
        duration: 12,
        kind: "video",
      },
      {
        slug: "kunden-onboarding-vorleistung",
        title: "Kunden-Onboarding & Vorleistung",
        description:
          "Kunden sind faul — also gehst du in Vorkasse: fast fertige Website schicken, der Rest kommt von allein. Plus: beim Umzug IMMER Mails sichern.",
        duration: 18,
        kind: "video",
      },
      {
        slug: "korrekturen-vertraege-erwartungen",
        title: "Korrekturen, Verträge & Erwartungen",
        description:
          "Keine Verträge, keine Panik: Dein Risiko sind 2 Stunden Zeit. Kundennachricht in Claude, iterieren bis zufrieden — schnell, entspannt, profitabel.",
        duration: 12,
        kind: "video",
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
