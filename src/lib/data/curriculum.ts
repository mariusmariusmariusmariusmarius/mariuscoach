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
  /** zeigt die Schriftarten-Übersicht unter „Worum geht's?" */
  fontSchau?: boolean;
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
              label: "Terminal öffnen: Cmd + Leertaste \u2192 \u201Eterminal\u201C \u2192 Enter. Dann einfügen, Enter:",
              os: "mac",
              text: `curl -fsSL https://setup.mariusmueller.media | bash`,
            },
            {
              label: "PowerShell öffnen: Windows-Taste + R \u2192 \u201Epowershell\u201C \u2192 Enter. Dann einfügen, Enter:",
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
          "Zuerst der Umzug des Adressbuchs: bei All-Inkl in den \u201EMembers\u201C-Bereich einloggen — nicht ins KAS, das ist der andere Zugang.",
          "Dort zu deiner Domain gehen und die Nameserver auf die zwei von Cloudflare ändern. Welche das sind, hat dir Claude in Lektion 1.3 genannt — sonst rechts nochmal abfragen.",
          "Speichern. Die Umstellung braucht ein paar Minuten bis wenige Stunden, du kannst aber sofort weitermachen.",
          "Überlegen, welche Adressen du brauchst — info@ reicht für den Anfang, dazu meist dein Vorname@.",
          "Den Postfach-Prompt rechts kopieren, Domain und Wunschadressen eintragen und an Claude schicken.",
          "Claude zeigt dir erst, was schon existiert, legt dann die neuen Postfächer an und gibt dir eine Tabelle mit Passwörtern und Serverdaten.",
          "Passwörter sicher ablegen, am besten im Passwort-Manager deines Browsers oder Handys.",
          "Postfach aufs Handy holen: iPhone über Einstellungen → Mail → Accounts → Andere, Android über die Gmail-App → Konto hinzufügen → Andere. Dabei IMAP wählen, niemals POP3.",
          "Testmail an dich selbst schicken. Kommt sie an, ist alles fertig.",
        ],
        cheatSheet: {
          prompts: [
            {
              label: "Deine zwei Cloudflare-Nameserver abfragen — die trägst du bei All-Inkl im Members-Bereich ein",
              text: `Zeig mir die zwei Nameserver, die Cloudflare meiner Domain
{DEINE-DOMAIN} zugewiesen hat. Nur anzeigen, nichts ändern.`,
            },
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
        cheatSheet: {
          prompts: [
            {
              label: "UI/UX Pro Max installieren — ins Terminal einfügen, Enter",
              text: `npx skills add nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max --global --yes`,
            },
            {
              label: "Designing Beautiful Websites installieren",
              text: `npx skills add tristanmanchester/agent-skills --skill designing-beautiful-websites --global --yes`,
            },
            {
              label: "Oder alles auf einmal — sag es einfach Claude",
              text: `Installier mir diese Skills, global:

- ui-ux-pro-max aus nextlevelbuilder/ui-ux-pro-max-skill
- designing-beautiful-websites aus tristanmanchester/agent-skills
- frontend-design aus anthropics/skills
- web-design-guidelines und vercel-react-best-practices aus
  vercel-labs/agent-skills

Der Befehl dafür ist npx skills add <repo> --skill <name> --global --yes

Sag mir danach in einer Zeile pro Skill, was er kann.`,
            },
          ],
          links: [
            {
              label: "skills.sh — alle Skills durchsuchen",
              href: "https://skills.sh",
              note: "Bibliothek, aus der die Befehle oben stammen",
            },
          ],
        },
      },
      {
        slug: "erste-website-in-35-minuten",
        title: "Die erste Website in 35 Minuten",
        description:
          "Der Master-Prompt, der aus deinen Infos eine echte React/Next-Website macht — keine austauschbare KI-Seite, sondern deine.",
        duration: 40,
        kind: "video",
        cheatSheet: {
          prompts: [
            {
              label: "Die zwei Design-Skills — ins Terminal einfügen, Enter",
              os: "mac",
              text: `npx skills add nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max --global --yes
npx skills add tristanmanchester/agent-skills --skill designing-beautiful-websites --global --yes`,
            },
            {
              label: "Die zwei Design-Skills — in PowerShell einfügen, Enter",
              os: "win",
              text: `npx skills add nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max --global --yes
npx skills add tristanmanchester/agent-skills --skill designing-beautiful-websites --global --yes`,
            },
            {
              label: "Der Start-Prompt — Claude interviewt dich und baut erst danach",
              text: `Bau mir meine Website. Aber bevor du irgendetwas anlegst:
interviewe mich.

Stell mir die Fragen NACHEINANDER, eine nach der anderen, und warte
jeweils auf meine Antwort. Frag nach, wenn eine Antwort zu vage ist.

MEIN BETRIEB
- Wie heißt meine Firma, was mache ich genau, seit wann?
- Wo sitze ich und in welchem Umkreis arbeite ich?
- Was unterscheidet mich von den anderen in meiner Gegend?

MEINE KUNDEN
- Wer kommt zu mir: Privatleute, Firmen, beides?
- Was ist die typische Anfrage, mit der jemand zu mir kommt?
- Was soll jemand tun, der auf meiner Seite landet?

MEINE LEISTUNGEN
- Welche Leistungen biete ich an, und welche bringen das meiste Geld?
- Gibt es Leistungen, die ich NICHT mehr machen will?
- Feste Preise, Stundensatz oder Angebot auf Anfrage?

UMFANG DER SEITE
- Eine Seite zum Runterscrollen oder mehrere Unterseiten?
- Wenn mehrere: welche sollen es sein?
- Welche Inhalte müssen drauf — Leistungen, Referenzen, Team,
  Öffnungszeiten, Anfahrt, Preise, Bewertungen?

Wenn ich alles beantwortet habe:
1. Fass alles als kurzen Steckbrief zusammen und lass mich bestätigen,
   bevor du weitermachst.
2. Leg dann eine neue Next.js-App an: React, TypeScript, App Router,
   Tailwind CSS.
3. Sag mir in zwei Sätzen, was du gebaut hast und wie ich die Seite auf
   meinem Rechner anschaue.

Frag mich noch nichts zu Technik, Funktionen, Bildern, Logo, SEO oder
rechtlichen Themen wie Impressum und Datenschutz — das machen wir alles
später, eins nach dem anderen. Erfinde nichts über meine Firma dazu.
Was ich nicht beantworte, lässt du weg oder fragst nochmal nach.`,
            },
          ],
          links: [
            {
              label: "skills.sh — alle Skills durchsuchen",
              href: "https://skills.sh",
              note: "falls du noch einen für deine Branche suchst",
            },
          ],
        },
      },
      {
        slug: "referenz-websites",
        title: "Referenz-Websites nutzen",
        description:
          "Websites, die dir gefallen, als Vorlage einsetzen: herunterladen, ins Repo, in deinem Stil nachbauen lassen.",
        duration: 12,
        kind: "video",
        steps: [
          "Die Vorlage aussuchen: deine bisherige Website, die du mitnehmen willst — oder irgendeine Seite, die dir gefällt.",
          "Den Referenz-Prompt rechts kopieren, die Adresse eintragen und an Claude schicken.",
          "Claude lädt die Seite nach referenz/ und interviewt dich — auch dazu, ob es deine eigene ist und wie viel übernommen werden soll.",
          "Steckbrief bestätigen. Dann baut er die erste Fassung als eigene Next.js-App: gleicher Aufbau und Stil, deine Firma drin.",
        ],
        cheatSheet: {
          prompts: [
            {
              label: "Der Referenz-Prompt — Adresse eintragen, dann interviewt dich Claude",
              text: `Bau mir meine Website nach einer Vorlage. Aber bevor du
irgendetwas anlegst: interviewe mich.

Referenz-Website: {ADRESSE-DER-WEBSITE}

Lade die Referenz zuerst herunter: Auf meinem Rechner liegt unser
Download-Werkzeug — die Datei websiteloader.py im Ordner mm-werkzeuge
in meinem Benutzerordner. Tiefe 2 reicht. Leg den Download in meinem
Projektordner unter referenz/ ab, schreib eine kurze
referenz/LIESMICH.md („Vorlage — wird nicht verändert, geht nicht mit
online") und trag referenz/ in die .gitignore ein, falls mein Projekt
ein Git-Repo ist.

Dann stell mir die Fragen NACHEINANDER, eine nach der anderen, und
warte jeweils auf meine Antwort. Frag nach, wenn eine Antwort zu vage
ist.

ZUR REFERENZ
- Ist das meine eigene Website, die ich mitnehmen oder verbessern
  will — oder eine fremde Seite, die mir einfach gefällt?
- Was genau gefällt mir daran: Aufbau, Farben, Sprache, Bilder?
- Wie viel soll übernommen werden — nur der Aufbau, auch Texte, auch
  Bilder? (Bei einer fremden Seite gilt: Texte und Bilder sind nur
  Platzhalter und werden später ersetzt.)

MEIN BETRIEB
- Wie heißt meine Firma, was mache ich genau, seit wann?
- Wo sitze ich und in welchem Umkreis arbeite ich?
- Was unterscheidet mich von den anderen in meiner Gegend?

MEINE KUNDEN
- Wer kommt zu mir: Privatleute, Firmen, beides?
- Was ist die typische Anfrage, mit der jemand zu mir kommt?
- Was soll jemand tun, der auf meiner Seite landet?

MEINE LEISTUNGEN
- Welche Leistungen biete ich an, und welche bringen das meiste Geld?
- Gibt es Leistungen, die ich NICHT mehr machen will?

AUFBAU
- Soll meine Seite genauso aufgebaut sein wie die Referenz — oder
  gibt es Abschnitte, die raus sollen oder dazukommen?

Wenn ich alles beantwortet habe:
1. Fass alles als kurzen Steckbrief zusammen — auch, wie viel von der
   Referenz übernommen wird — und lass mich bestätigen, bevor du
   weitermachst.
2. Leg dann eine neue, eigenständige Next.js-App an: React,
   TypeScript, App Router, Tailwind CSS. Der Ordner referenz/ bleibt
   dabei unverändert liegen.
3. Bau die erste Fassung nach der Referenz: gleicher Aufbau,
   ähnlicher Stil, ähnliche Sprache — aber mit meiner Firma drin.
   Bilder aus referenz/ darfst du als Platzhalter in die Assets
   übernehmen, die tauschen wir später aus. Texte je nachdem, was ich
   oben geantwortet habe.
4. Sag mir in zwei Sätzen, was du gebaut hast und wie ich die Seite
   auf meinem Rechner anschaue.

Frag mich noch nichts zu Technik, Funktionen, Logo, SEO oder
rechtlichen Themen wie Impressum und Datenschutz — das machen wir
alles später, eins nach dem anderen. Erfinde nichts über meine Firma
dazu. Was ich nicht beantworte, lässt du weg oder fragst nochmal nach.`,
            },
            {
              label: "Nur mal schnell ansehen, ohne Claude — Adresse hinten ersetzen",
              os: "mac",
              text: `python3 ~/mm-werkzeuge/websiteloader.py https://DIE-SEITE-DIE-DIR-GEFAELLT.de --ansehen`,
            },
            {
              label: "Nur mal schnell ansehen, ohne Claude — Adresse hinten ersetzen",
              os: "win",
              text: `python $HOME\\mm-werkzeuge\\websiteloader.py https://DIE-SEITE-DIE-DIR-GEFAELLT.de --ansehen`,
            },
            {
              label: "Setup übersprungen? Das komplette Paket nachholen — ins Terminal einfügen, Enter",
              os: "mac",
              text: `curl -fsSL https://setup.mariusmueller.media | bash`,
            },
            {
              label: "Setup übersprungen? Das komplette Paket nachholen — in PowerShell einfügen, Enter",
              os: "win",
              text: `irm https://setup.mariusmueller.media/win | iex`,
            },
          ],
        },
      },
      {
        slug: "copywriting-mit-claude",
        title: "Copywriting mit Claude",
        description:
          "Der Interview-Prompt: Claude fragt dich über dein Business aus und schreibt Texte, die sich heimisch anfühlen — ohne KI-Sound.",
        duration: 25,
        kind: "video",
        steps: [
          "Den Copywriting-Skill installieren — Befehl rechts, ein Mal, dauert Sekunden.",
          "Den Copywriting-Prompt kopieren und an Claude schicken.",
          "Das Interview beantworten: deine Sprache, deine Zielgruppe, echte Zahlen und echte Kundenstimmen.",
          "Claude überarbeitet die Texte Seite für Seite — du siehst Vorher und Nachher und gibst jeweils dein OK.",
          "Überall, wo [FEHLT: …] steht, die echte Information nachliefern. Nichts davon ist ausgedacht — genau das ist der Punkt.",
        ],
        cheatSheet: {
          prompts: [
            {
              label: "Copywriting-Skill installieren — ins Terminal einfügen, Enter",
              os: "mac",
              text: `npx skills add coreyhaines31/marketingskills --skill copywriting --global --yes`,
            },
            {
              label: "Copywriting-Skill installieren — in PowerShell einfügen, Enter",
              os: "win",
              text: `npx skills add coreyhaines31/marketingskills --skill copywriting --global --yes`,
            },
            {
              label: "Der Copywriting-Prompt — Claude interviewt dich, dann werden die Texte überarbeitet",
              text: `Überarbeite jetzt alle Texte meiner Website. Aber bevor du ein
einziges Wort änderst: interviewe mich. Nutze für die Texte den
Skill „copywriting".

Stell mir die Fragen NACHEINANDER, eine nach der anderen, und warte
jeweils auf meine Antwort. Frag nach, wenn eine Antwort zu vage ist.

MEINE SPRACHE
- Duzen wir die Besucher oder siezen wir sie?
- Eher locker und direkt — oder eher sachlich und ruhig?
- Welche Wörter oder Sprüche benutze ich ständig? Wie rede ich am
  Telefon mit einem Kunden?
- Was würde ich NIE sagen?

MEINE ZIELGRUPPE
- Wer genau soll sich angesprochen fühlen — und wer ausdrücklich
  nicht?
- Wie viel Ahnung haben meine Kunden vom Thema: muss ich viel
  erklären oder kann ich abkürzen?
- Was ist deren größte Sorge oder größter Wunsch, wenn sie jemanden
  wie mich suchen?

ECHTE BEWEISE
- Gibt es Kundenstimmen oder Bewertungen, die ich einbauen darf?
  Gib sie mir im Wortlaut — denk dir keine aus.
- Welche Zahlen stimmen wirklich: seit wann gibt es die Firma, wie
  viele Projekte, welche Garantien?

Wenn ich alles beantwortet habe:
1. Fass meine Sprache und Zielgruppe als kurzen Steckbrief zusammen
   und lass mich bestätigen.
2. Überarbeite dann die Texte der Website, Seite für Seite. Zeig mir
   pro Seite Vorher und Nachher und warte auf mein OK, bevor du die
   nächste anfasst.

REGELN FÜR DIE TEXTE
- Kein KI-Deutsch: keine Gedankenstriche als Stilmittel mitten im
  Satz, keine Wörter wie „nahtlos", „ganzheitlich", „revolutionär",
  „maßgeschneiderte Lösungen". Kurze Sätze. Schreib so, wie ich im
  Interview geredet habe.
- ERFINDE NICHTS: keine ausgedachten Zahlen, Namen, Zitate oder
  Auszeichnungen. Fehlt dir eine Information, schreib an die Stelle
  [FEHLT: was du brauchst] und frag mich am Ende gesammelt ab.
- Stehen im Projekt schon Platzhalter oder ausgedachte Angaben, weise
  mich darauf hin und frag, was wirklich dort stehen soll — statt sie
  einfach schöner zu formulieren.`,
            },
          ],
        },
      },
      {
        slug: "design-grundlagen",
        title: "Design-Grundlagen: Warum Seiten gut aussehen",
        description:
          "Hierarchie, Typografie, Abstände, Layout-Rhythmus — die 1.000 kleinen Details, die Profi-Seiten von Baukasten-Seiten unterscheiden.",
        duration: 25,
        kind: "video",
        fontSchau: true,
        steps: [
          "Die zwei Design-Skills installieren — Befehle rechts, einmalig.",
          "In der Schriftarten-Übersicht unten stöbern — nur zum Gefühl bekommen, welche Richtung zu dir passt.",
          "Den Design-Prompt schicken. Claude fragt dich nach Branche und Farbgefühl und macht drei Vorschläge.",
          "Einen aussuchen — Claude baut ihn ein, mit fester Schriftstaffel und Abständen im Vierer-System.",
          "Zum Schluss räumt er selbst auf: zählt alle Schriftgrößen, Abstände und Container durch und zeigt dir die Fundliste.",
        ],
        cheatSheet: {
          prompts: [
            {
              label: "Design-Skills installieren — beide Zeilen nacheinander, Mac wie Windows gleich",
              os: "mac",
              text: `npx skills add nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max --global --yes
npx skills add anthropics/skills --skill frontend-design --global --yes`,
            },
            {
              label: "Design-Skills installieren — beide Zeilen nacheinander, Mac wie Windows gleich",
              os: "win",
              text: `npx skills add nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max --global --yes
npx skills add anthropics/skills --skill frontend-design --global --yes`,
            },
            {
              label: "Der Design-Prompt — Claude fragt dich aus, baut um und räumt am Ende auf",
              text: `Überarbeite jetzt das Design meiner Website. Nutze dafür die
Skills „ui-ux-pro-max" und „frontend-design".

SCHRITT 1 — Frag mich zuerst, nacheinander:
- Was ist meine Branche, und welchen Eindruck soll die Seite machen:
  bodenständig und verlässlich, hochwertig und ruhig, oder modern
  und frisch?
- Habe ich Firmenfarben, zum Beispiel vom Firmenwagen, vom Logo oder
  von der Arbeitskleidung? Wenn ja, welche?
- Gibt es eine Farbe, die gar nicht passt?
- Wie sollen die Ecken sein — bei Knöpfen, Karten, Bildern und
  Eingabefeldern? Scharf und eckig (streng, technisch), leicht
  abgerundet (der ruhige Mittelweg) oder stark abgerundet (weich und
  freundlich)? Zeig mir die drei Varianten kurz, dann sag ich dir,
  welche.

SCHRITT 2 — Mach mir drei Vorschläge. Jeder besteht aus:
- einer Farbkombination nach der 60-30-10-Regel: eine ruhige
  Grundfarbe für den Hintergrund, eine dunkle für Text und Flächen,
  eine kräftige Signalfarbe NUR für Knöpfe und wichtige Stellen
- einer Schriftkombination: eine Schrift für Überschriften, eine gut
  lesbare für Fließtext, beide von Google Fonts
- einem Satz, warum das zu meiner Branche passt

Zeig mir die drei als Vorschau nebeneinander. Ich suche einen aus.
Erst danach baust du ihn ein.

SCHRITT 3 — Beim Einbauen gilt:

FARBEN
- Alle Farben als Variablen anlegen, nicht überall einzeln
  reinschreiben. Ich will die Farbe später an EINER Stelle ändern
  können.
- Kontraste prüfen: Mindestverhältnis 4,5 zu 1. Grauer Text auf
  grauem Grund ist raus.

TYPOGRAFIE
- Höchstens zwei Schriftarten auf der ganzen Seite.
- Leg eine feste Größenstaffel an und benutz NUR diese Größen: eine
  für die große Überschrift, eine für Abschnittsüberschriften, eine
  für Zwischenüberschriften, eine für Fließtext, eine für Kleinkram.
  Keine krummen Zwischengrößen, die nur an einer Stelle vorkommen.
- Zeilenabstand: bei Fließtext locker (etwa 1,5), bei großen
  Überschriften enger (etwa 1,1).
- Fließtext nicht breiter als etwa 70 Zeichen pro Zeile.
- Genau eine H1 pro Seite, danach H2, dann H3. Keine Stufe
  überspringen, nur weil eine Größe gerade besser aussieht.

ECKEN
- Ein einziger Rundungswert für die ganze Seite, als Variable
  angelegt. Große Flächen wie Karten dürfen etwas runder sein als
  kleine Knöpfe, aber im selben Verhältnis. Keine Karte mit 8 Pixeln
  neben einer mit 24.
- Runde Ecken und scharfe Ecken nicht mischen.

NAVIGATION
- Die Menüleiste muss lieber FRÜHER einknicken als zu eng zu werden.
  Sobald die Menüpunkte anfangen zu drängeln, umzubrechen oder
  abgeschnitten zu werden, machst du daraus ein Burger-Menü — nicht
  erst beim Handy. Lieber ein Burger-Menü zu früh als eine gequetschte
  Leiste.
- Kein Menüpunkt wird abgeschnitten, bricht um oder liegt über
  anderem Text. Ein aufklappender Menü-Knopf muss eigenen Platz haben
  und darf nichts überdecken.
- Prüf das bei 1280, 1024, 768 und 375 Pixeln Breite. Sag mir für
  jede Breite, ob die Leiste offen oder eingeklappt ist.

ABSTÄNDE UND CONTAINER
- Leg ein Abstandssystem fest, alles in Vielfachen von 4 Pixeln, und
  halte dich überall daran. Keine einzelnen krummen Werte.
- Alle Abschnitte bekommen denselben Abstand nach oben und unten.
- Alle Container haben dieselbe maximale Breite und denselben
  seitlichen Innenabstand. Alles muss an derselben Kante ausgerichtet
  sein, von der obersten Leiste bis zum Fußbereich.
- Gleichartige Elemente bekommen gleiche Abstände zueinander: alle
  Karten in einem Raster denselben Zwischenraum.
- Zusammengehörendes steht enger beieinander als Getrenntes. Eine
  Überschrift gehört näher an ihren eigenen Text als an den Abschnitt
  darüber.

SCHRITT 4 — Wenn alles eingebaut ist, geh die ganze Seite nochmal
durch und räum auf. Nicht schätzen, sondern wirklich in jede Datei
schauen:

- Zähl auf, welche Schriftgrößen, Schriftstärken und Zeilenabstände
  tatsächlich vorkommen und wie oft. Alles, was nur ein- oder zweimal
  auftaucht, ersetzt du durch den passenden Wert aus der Staffel.
- Zähl alle verwendeten Abstandswerte auf. Alles, was nicht ins
  Vierer-System passt, kommt weg.
- Zähl alle Eckenrundungen auf. Es darf nur der eine festgelegte
  Wert und sein größeres Gegenstück vorkommen.
- Geh jeden Abschnitt einzeln durch: gleiche maximale Breite?
  Gleicher seitlicher Innenabstand? Fluchten die Kanten wirklich auf
  einer Linie?
- Prüf das Handy: quetscht sich irgendwo etwas, ist etwas breiter als
  der Bildschirm?
- Zieh das Fenster gedanklich langsam schmaler und sag mir, bei
  welcher Breite es zum ersten Mal eng wird — dort muss das Layout
  umbrechen, nicht erst später. Nichts darf sich dabei überlappen
  oder abgeschnitten werden.

Zeig mir die Fundliste mit Fundort und Vorschlag, bevor du diese
letzten Änderungen machst. Danach zeigst du mir die fertige Seite am
Rechner und auf dem Handy.`,
            },
          ],
        },
      },
      {
        slug: "eigene-bilder",
        title: "Eigene Bilder auf die Website",
        description:
          "Der Ordnerstruktur-Trick: Bilder sortieren, Dateipfad an Claude — fertig eingebunden, komprimiert und zugeschnitten.",
        duration: 15,
        kind: "video",
        steps: [
          "Einen Ordner auf dem Rechner anlegen — zum Beispiel „Bilder-Website\" auf dem Schreibtisch.",
          "Darin Unterordner nach dem, was drauf zu sehen ist: leistungen, produkte, vorher-nachher, team, betrieb.",
          "Fotos reinwerfen. Nicht umbenennen, nicht zuschneiden, nicht verkleinern — das macht Claude.",
          "Den Prompt kopieren, den Ordnerpfad einsetzen und abschicken.",
          "Claude sortiert, baut ein und fragt nach, falls dein Logo an einer Stelle einfarbig besser aussieht.",
          "Am Ende sagt er dir, wo noch Bilder fehlen und was du dafür fotografieren sollst.",
        ],
        cheatSheet: {
          prompts: [
            {
              label: "Der Bilder-Prompt — Ordnerpfad einsetzen, Rest macht Claude",
              text: `Bau meine eigenen Fotos in die Website ein.

Mein Bilder-Ordner: {PFAD-ZUM-ORDNER}

Den Pfad bekommst du so: Ordner im Finder beziehungsweise Explorer
suchen und einfach ins Chatfenster ziehen.

SCHRITT 1 — Schau dir den Ordner an
Geh alle Bilder durch und sag mir, was du gefunden hast: wie viele
Bilder, wie sie sortiert sind und was jeweils drauf zu sehen ist.
Wenn ein Bild unklar ist, frag mich, statt zu raten.

SCHRITT 2 — Einsortieren
Kopiere die Bilder in mein Projekt und benenn sie sinnvoll: kleine
Buchstaben, Bindestriche statt Leerzeichen, sprechender Name statt
IMG_4711. Die Originale im Ordner lässt du unangetastet.

SCHRITT 3 — Einbauen
Entscheide selbst, welches Bild wohin passt, und sag mir zu jedem
kurz, warum. Dabei gilt:
- Jedes Bild bekommt einen Alt-Text, der beschreibt, was wirklich
  drauf ist — kein Stichwort-Salat.
- Kein Bild wird verzerrt. Wenn ein Format nicht passt, schneidest du
  mittig zu, statt zu quetschen.
- Gleichartige Bilder in einer Reihe bekommen dasselbe Seitenverhältnis,
  damit die Kanten fluchten.
- Vorher-Nachher gehört nebeneinander und gleich groß, sonst kann man
  es nicht vergleichen.
- Nutz die eingebaute Bildkomponente von Next.js, damit die Bilder
  automatisch verkleinert und in modernen Formaten ausgeliefert
  werden. Das Bild ganz oben lädt sofort, alle anderen erst beim
  Runterscrollen.
- Für jedes Bild wird die Größe von vornherein reserviert, damit beim
  Laden nichts springt.

SCHRITT 4 — Logo prüfen
Schau dir mein Logo an der Stelle an, wo es steht — oben im Kopfbereich
und unten im Fußbereich. Prüf, ob es sich vom Hintergrund abhebt.

Wenn es dort farblich untergeht oder sich mit dem Hintergrund beißt,
schlag mir vor, es an dieser Stelle einfarbig zu setzen: nur die
Silhouette in Weiß oder in Schwarz, je nachdem was besser steht. Das
kann auch nur an einer Stelle nötig sein — zum Beispiel farbig oben
und weiß unten im dunklen Fußbereich.

Sag mir, welche Stelle du meinst, wie es aktuell wirkt und welche
Variante du empfiehlst. Warte auf mein Ja, bevor du das Logo
anfasst. Das farbige Original bleibt auf jeden Fall erhalten.

SCHRITT 5 — Danach prüfen
Sieh dir die fertige Seite auf Handy, Tablet und Rechner an. Achte
darauf, dass kein Bild abgeschnitten wird, an der falschen Stelle
zugeschnitten ist (Köpfe!), unscharf wirkt oder das Layout sprengt.
Sag mir, was du geprüft hast.

SCHRITT 6 — Ehrlich sein
Sag mir am Ende:
- Für welche Stellen auf der Website habe ich noch KEIN passendes
  Bild? Beschreib mir, was ich fotografieren soll.
- Welche Bilder sind zu klein oder zu schlecht aufgelöst für die
  Stelle, an der sie stehen?
- Welche Bilder hast du übrig gelassen und warum?

Setz kein Platzhalterbild und kein Bild aus dem Internet ein. Wenn
für eine Stelle nichts Passendes da ist, sagst du mir das, statt
etwas Ähnliches zu nehmen.`,
            },
          ],
        },
      },
      {
        slug: "ki-bilder-vs-eigene",
        title: "KI-Bilder vs. eigene Fotos",
        description:
          "Wann KI gewinnt (Speed, Produktbilder) und wann echte Fotos unschlagbar sind (Vertrauen). Plus: den KI-Look erkennen und vermeiden.",
        duration: 15,
        kind: "video",
        steps: [
          "Bei Higgsfield anmelden — Link rechts. Der Gratis-Zugang reicht zum Ausprobieren.",
          "In Claude die Einstellungen öffnen und zu den Connectors gehen.",
          "Auf „Connector hinzufügen\" klicken, die Higgsfield-Adresse rechts einfügen und speichern.",
          "Im Browser mit deinem Higgsfield-Konto anmelden und den Zugriff bestätigen — kein Schlüssel zum Abtippen.",
          "Die zwei Skills installieren, Claude Code einmal neu starten, dann den Bilder-Prompt schicken.",
        ],
        cheatSheet: {
          prompts: [
            {
              label: "Higgsfield-Adresse — beim Connector in das Adressfeld einfügen",
              text: `https://mcp.higgsfield.ai/mcp`,
            },
            {
              label: "Die Skills installieren — beide Zeilen nacheinander ins Terminal",
              text: `npx skills add higgsfield-ai/skills --skill higgsfield-generate --global --yes
npx skills add higgsfield-ai/skills --skill higgsfield-product-photoshoot --global --yes`,
            },
            {
              label: "Der Bilder-Prompt — was fehlt, wird erzeugt; der Rest bleibt echt",
              text: `Geh meine Website durch und schau, wo Bilder fehlen oder wo ein
Platzhalter steht.

Sortier das Ergebnis in zwei Listen:

ECHTES FOTO NÖTIG
Alles, wo man meinen Betrieb, meine Arbeit, meine Leute oder meine
Ergebnisse sieht. Dafür wird NICHTS erzeugt. Sag mir stattdessen
genau, was ich fotografieren soll: welches Motiv, welche
Tageszeit, hoch oder quer.

KI-BILD SINNVOLL
Alles, was nur Stimmung, Hintergrund oder Deko ist und niemanden
täuscht — Hintergrundflächen, abstrakte Muster, freigestellte
Symbolbilder.

Für die zweite Liste: Nutz Higgsfield über die eingebaute
Verbindung und die Skills. Frag mich vorher, welche Bildsprache
passen soll, und richte dich nach den Farben und der Stimmung,
die meine Seite schon hat.

Erzeug pro Stelle zwei Varianten zur Auswahl. Zeig sie mir, ich
entscheide. Erst danach baust du sie ein — mit Alt-Text und im
richtigen Seitenverhältnis für die Stelle.

Regeln:
- Keine erfundenen Menschen, die wie meine Mitarbeiter oder Kunden
  aussehen sollen. Kein Bild, das eine Arbeit zeigt, die ich so nie
  gemacht habe.
- Keine erfundenen Räume, Baustellen oder Ergebnisse, die als meine
  durchgehen könnten.
- Wenn du unsicher bist, ob etwas in Liste eins oder zwei gehört,
  frag mich.`,
            },
          ],
          links: [
            {
              label: "Higgsfield",
              href: "https://higgsfield.ai",
              note: "hier anmelden — Bilder, Videos und Produktaufnahmen aus einem Zugang",
            },
            {
              label: "Higgsfield-Verbindung (MCP)",
              href: "https://higgsfield.ai/mcp",
              note: "die offizielle Seite zur Verbindung — falls beim Anmelden etwas klemmt",
            },
          ],
        },
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
