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
  /** zeigt oben in der Box den persönlichen API-Schlüssel des Nutzers */
  apiKeyHint?: boolean;
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
  /** Pfad zum Kursvideo (unter public/), z. B. "/videos/modul-1/….mp4" */
  videoUrl?: string;
  /** zeigt die Schriftarten-Übersicht unter „Worum geht's?" */
  fontSchau?: boolean;
  /** zeigt das Domain-Anschließen-Feld (DNS-Zentrale) */
  dnsTool?: boolean;
  /** zeigt die Wunschdomain-Abfrage (frei / vergeben) */
  domainCheck?: boolean;
  /** zeigt den Baukasten für den Versand-Prompt (nutzt die eigenen Postfächer) */
  mailPrompt?: boolean;
  /** zeigt den Resend-Baukasten (Adressen von Hand eintragen) */
  resendPrompt?: boolean;
  /** zeigt den Audit-Prompt mit Einzugsgebiets-Regler */
  seoPrompt?: boolean;
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
  // ── Modul 1 (NEU): folgt den gedrehten Videos. Die Module darunter sind
  //    die alte Planung und bleiben zur Orientierung stehen, bis Marius sie
  //    ausdrücklich streicht.
  {
    slug: "modul-1-basics",
    title: "Modul 1: Basics",
    subtitle: "Claude Code einrichten, die erste Website bauen, Vorlagen nachbauen — die Grundlage für alles",
    tier: "free",
    icon: "rocket",
    gradient: "from-emerald-500/80 to-teal-400/80",
    lessons: [
      {
        // Video: „erstes.mp4" + „skill 2.mp4"
        slug: "claude-code-dein-mitarbeiter",
        title: "Claude Code, dein Mitarbeiter?",
        videoUrl: "https://videos.gefundenwerden.online/modul-1/claude-code-dein-mitarbeiter.mp4",
        description:
          "Claude Code ist das Herzstück dieses Kurses — die zentrale Steuerung für alles: Website, Hosting, Automationen, E-Mail-Marketing, Werbekampagnen. Hier richten wir es ein und laden die Werkzeuge, die Claude braucht.",
        duration: 12,
        kind: "video",
        steps: [
          "Die Claude-Desktop-App herunterladen — es gibt sie für Mac und für Windows.",
          "Den Pro-Tarif abschließen (18 € im Monat). Das ist die einzige laufende Ausgabe, die der Kurs wirklich braucht.",
          "Terminal öffnen: Mac mit Cmd + Leertaste und „terminal“, Windows mit Windows-Taste + R und „powershell“.",
          "Den Setup-Befehl rechts kopieren, einfügen, Enter. Das installiert die Entwicklerwerkzeuge — Pakete und Bibliotheken, die Claude braucht, um Websites lokal zu bauen und Verbindungen herzustellen. Claude kann nur mit dem arbeiten, was da ist.",
          "Skills verstehen: kurze Anleitungen, die Claude zum Spezialisten machen — auf skills.sh gibt es tausende. Bestes Beispiel: der SEO-Audit-Skill, den wir später oft verwenden.",
        ],
        cheatSheet: {
          prompts: [
            {
              label: "Terminal öffnen: Cmd + Leertaste → „terminal“ → Enter. Dann einfügen, Enter:",
              os: "mac",
              text: `curl -fsSL https://setup.mariusmueller.media | bash`,
            },
            {
              label: "PowerShell öffnen: Windows-Taste + R → „powershell“ → Enter. Dann einfügen, Enter:",
              os: "win",
              text: `irm https://setup.mariusmueller.media/win | iex`,
            },
          ],
          links: [
            {
              label: "Claude herunterladen",
              href: "https://claude.ai",
              note: "Desktop-App für Mac und Windows, Pro-Tarif nötig",
            },
            {
              label: "skills.sh — alle Skills durchsuchen",
              href: "https://skills.sh",
              note: "die Bibliothek, aus der unsere Skills kommen",
            },
          ],
        },
      },
      {
        // Video: „Claude - 16 August 2026.mp4"
        slug: "erste-website",
        title: "Die erste Website in 35 Minuten",
        videoUrl: "https://videos.gefundenwerden.online/modul-1/erste-website.mp4",
        description:
          "Wir starten direkt in Claude Code — mit einem echten Kundenauftrag: ein mittelständischer Möbel-Händler. Zwei Design-Skills, ein Start-Prompt, deine Antworten — und Claude baut das Fundament deiner Website.",
        duration: 40,
        kind: "video",
        steps: [
          "In der Claude-App oben „Code“ auswählen und einen Ordner anlegen, in dem das Projekt lebt.",
          "Die zwei Design-Skills installieren — sie sorgen für das richtige Design und die richtige Typografie. Befehle rechts, einmal ins Terminal.",
          "Den Start-Prompt rechts kopieren und abschicken. Claude interviewt dich: Firma, Kunden, Leistungen — eine Frage nach der anderen.",
          "Antworten, Zusammenfassung prüfen, bestätigen. Dann baut Claude — das dauert ruhig 20 Minuten, lass ihn arbeiten.",
          "Zum Modell: Opus reicht völlig aus. Fable wäre für so eine Aufgabe Overkill.",
          "Ergebnis ansehen: oben rechts das Welt-Symbol — der eingebaute Browser mit deinem lokalen Server. Auch die mobile Ansicht prüfen. Platzhalter-Texte und -Bilder sind normal, das ist das Fundament — die nächsten Schritte folgen.",
        ],
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
        // Video: „part 1.mp4" + „part 2.mp4"
        slug: "referenz-websites-nutzen",
        title: "Referenz-Websites nutzen",
        videoUrl: "https://videos.gefundenwerden.online/modul-1/referenz-websites-nutzen.mp4",
        description:
          "Der zweite Weg: Du hast schon eine Website und willst sie mitnehmen — oder dir gefällt eine fremde Seite und du willst sie als Vorlage. Das Download-Werkzeug aus dem Setup holt die komplette Seite, Claude baut sie mit deinen Inhalten nach. So kommst du auch raus aus Wix, IONOS oder WordPress.",
        duration: 15,
        kind: "video",
        steps: [
          "Die Vorlage aussuchen: deine bisherige Website — oder irgendeine Seite, die dir gefällt. Adresse kopieren.",
          "Neuen Projektordner anlegen, den Referenz-Prompt rechts mit der Adresse abschicken.",
          "Claude lädt die Seite komplett herunter — Texte, Bilder, Skripte — und interviewt dich wie in der ersten Website-Lektion.",
          "Antworten, Steckbrief bestätigen, bauen lassen. Dann vergleichen: Aufbau, Farben und Schriften sitzen, die Texte sind schon auf deine Firma angepasst.",
          "Fehlt ein Detail — etwa eine durchlaufende Schrift? Einfach benennen und Claude fragen: Er findet heraus, wie es gemacht wurde, und baut es nach.",
          "Setup übersprungen? Ohne das Werkzeugpaket geht der Download nicht — der Nachhol-Befehl steht rechts.",
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
        // Video: „Claude - 17 August 2026.mp4"
        slug: "copywriting-mit-claude",
        title: "Copywriting mit Claude",
        videoUrl: "https://videos.gefundenwerden.online/modul-1/copywriting-mit-claude.mp4",
        description:
          "Das Fundament steht — jetzt die Feinheiten. Erst siehst du, wie leicht sich die Seite in einfacher Sprache umbauen lässt, dann gehen wir an die Texte: Was die KI erfunden hat, fliegt raus — dein Ton, deine Zielgruppe, deine echten Daten rein.",
        duration: 25,
        kind: "video",
        steps: [
          "Warmwerden: Sag Claude in eigenen Worten, was dich stört — „großes Bild als Hintergrund in der ersten Sektion, Text darüber“ oder „diese Textpassage raus“. Er setzt es direkt um, und responsiv bleibt es von selbst.",
          "Den Copywriting-Skill installieren — Befehl rechts, einmal ins Terminal.",
          "Stimmen die Kontaktdaten nicht? Mach einen Screenshot vom Google-Unternehmensprofil und zieh ihn in den Chat — Claude übernimmt Adresse, Telefonnummer und Öffnungszeiten daraus.",
          "Den Copywriting-Prompt schicken und den Fragebogen beantworten: duzen oder siezen, wer deine Kunden sind — Privatleute, Mittelstand, gehobene Klasse. Davon hängt die ganze Sprache ab.",
          "Fragt Claude nach Bewertungen, Logo, Bildern oder Farben: Bewertungen kannst du schon von Hand einfügen, die richtige Einbindung kommt später — und Logo, Bilder und Farben kommen gebündelt in der nächsten Lektion. Diese Fragen einfach überspringen.",
          "Zusammenfassung kontrollieren, dann Go geben. Claude überarbeitet die Seite inhaltlich — Seite für Seite, mit deinem OK.",
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
  einfach schöner zu formulieren.

Fragen zu Logo, Bildern, Farben oder SEO stellst du mir jetzt noch
nicht — das kommt gleich danach, gebündelt.`,
            },
          ],
        },
      },
      {
        // Video: „KI Design Schritt für Schritt optimieren.mp4"
        slug: "design-grundlagen",
        title: "Design-Grundlagen: Warum Seiten gut aussehen",
        videoUrl: "https://videos.gefundenwerden.online/modul-1/design-grundlagen.mp4",
        description:
          "Fundament und Texte stehen — jetzt kommt das Design. Claude zieht die Farben aus deinem Logo, baut dir ein Designprofil mit drei Kombinationen zur Auswahl, und mit dem Stift-Trick schleifst du danach jede Kleinigkeit weg, ohne vom Fach zu sein.",
        duration: 25,
        kind: "video",
        fontSchau: true,
        steps: [
          "Erst mal genau hinschauen: Kleine Unstimmigkeiten wie ungleiche Abstände — oben in der Hero-Sektion mehr Luft als unten — fallen jetzt auf. Genau die räumen wir weg.",
          "Die Design-Skills installieren — Befehle rechts. Einen davon hast du vielleicht schon aus der Website-Lektion, das Ausführen schadet nicht.",
          "Den Design-Prompt schicken. Wenn Claude nach dem Logo fragt: Datei einfach in den Chat ziehen. Er zieht Farbkombinationen aus dem Logo und schlägt eine Schrift vor — eigene Wünsche wie „noch etwas Schwarz und Orange dazu“ sagst du einfach mit. Daraus entsteht dein Designprofil.",
          "Auswählen: erst den Stil für Eingabefelder, Knöpfe und Karten, dann eine der drei Farbkombinationen. Auf den ersten Blick sehen sie sich ähnlich — die Unterschiede stecken im Detail, schau genau hin.",
          "Die Schriftart in der Schriftarten-Übersicht unten vergleichen und entscheiden — die Wahl einfach herauskopieren und in den Chat geben.",
          "Der Stift-Trick fürs Feintuning: im eingebauten Browser aufs Stift-Symbol klicken, das Störende einkreisen, zum Chat hinzufügen und beschreiben. Auch die mobile Ansicht prüfen — zu viel Text auf dem Handy? Einkreisen, sagen, fertig. So schleifst du die Seite Schritt für Schritt.",
        ],
        cheatSheet: {
          prompts: [
            {
              label: "Design-Skills installieren — beide Zeilen nacheinander, ins Terminal",
              os: "mac",
              text: `npx skills add nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max --global --yes
npx skills add anthropics/skills --skill frontend-design --global --yes`,
            },
            {
              label: "Design-Skills installieren — beide Zeilen nacheinander, in PowerShell",
              os: "win",
              text: `npx skills add nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max --global --yes
npx skills add anthropics/skills --skill frontend-design --global --yes`,
            },
            {
              label: "Der Design-Prompt — Claude fragt dich aus, baut um und räumt am Ende auf",
              text: `Überarbeite jetzt das Design meiner Website. Nutze dafür die
Skills „ui-ux-pro-max" und „frontend-design".

SCHRITT 1 — Frag mich zuerst, nacheinander:
- Hab ich ein Logo? Wenn ja, schicke ich es dir in den Chat. Zieh
  die Farben daraus und schlag eine Schrift vor, die dazu passt.
  Wenn ich zusätzliche Farbwünsche habe, arbeite sie ein.
- Was ist meine Branche, und welchen Eindruck soll die Seite machen:
  bodenständig und verlässlich, hochwertig und ruhig, oder modern
  und frisch?
- Habe ich Firmenfarben, zum Beispiel vom Firmenwagen oder von der
  Arbeitskleidung? Wenn ja, welche?
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

Zeig mir die drei als Vorschau nebeneinander. Ich suche einen aus —
meine Schriftwahl treffe ich mit der Schriftarten-Übersicht aus dem
Kurs und sage sie dir dazu. Erst danach baust du ein.

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
  Auch innerhalb eines Abschnitts: gleich viel Luft über und unter
  dem Inhalt — nicht oben mehr als unten.
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
        // Video: „gefundenwerden.online Academy … - 18 August 2026.mp4"
        slug: "eigene-bilder",
        title: "Eigene Bilder auf die Website",
        videoUrl: "https://videos.gefundenwerden.online/modul-1/eigene-bilder.mp4",
        description:
          "Klingt aufwendig, geht aber schnell: Bilder grob nach Leistungen sortieren, Dateipfad an Claude — er baut ein, benennt, komprimiert und hängt dein Logo in Navigation und Fußzeile. Sogar ein Hintergrundvideo ist drin.",
        duration: 20,
        kind: "video",
        steps: [
          "Die Vorarbeit: Bilder auf den Rechner holen und grob sortieren — Ordner nach dem Sinn. Ein Ordner für den Betrieb (wie bei dir gearbeitet wird), dazu je einer pro Leistung oder Produktgruppe. Beim Elektriker etwa: Elektroinstallation, Smart Home, PV-Anschluss. Grob reicht völlig.",
          "Warum sortieren? Claude käme auch mit 500 unsortierten Bildern klar — er beschreibt dann jedes einzeln, und genau das frisst Tokens. Eine Struktur in zwei Minuten spart bares Geld.",
          "Den Dateipfad kopieren, nicht den Ordner: Claude greift direkt auf deinen Rechner zu und entscheidet selbst nach Motiv, Format und Auflösung, was wohin kommt. Auch ein kurzes Video darf in den Ordner — zum Beispiel als Hintergrundvideo für die erste Sektion.",
          "Den Bilder-Prompt rechts kopieren, Pfad einsetzen, abschicken. Falls dein Logo in der Design-Lektion noch nicht dabei war: jetzt mitschicken — es landet in der Navigationsleiste und in der Fußzeile.",
          "Nacharbeiten in eigenen Worten: Hintergrundbild auf den Produkt-Unterseiten? Das Hero-Video wurde vergessen? Einfach wörtlich sagen, Claude setzt es um. Und: Claude kann dein Logo umfärben — etwa weiß für dunkle Hintergründe. Das geht nur, wenn es als PNG ohne Hintergrund vorliegt.",
          "Kategorien ohne Fotos bleiben bewusst leer — die füllen wir in der nächsten Lektion mit KI-Bildern.",
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
- Liegt ein Video im Ordner, frag mich, wo es hin soll. Als
  Hintergrundvideo läuft es stumm, startet von selbst und wiederholt
  sich — und es bekommt ein Standbild als Ersatz, falls es auf dem
  Handy zu schwer ist.
- Nutz die eingebaute Bildkomponente von Next.js, damit die Bilder
  automatisch verkleinert und in modernen Formaten ausgeliefert
  werden. Das Bild ganz oben lädt sofort, alle anderen erst beim
  Runterscrollen.
- Für jedes Bild wird die Größe von vornherein reserviert, damit beim
  Laden nichts springt.

SCHRITT 4 — Logo
Ist mein Logo noch gar nicht auf der Seite, sag es mir — dann schick
ich es dir in den Chat, und du setzt es in die Navigationsleiste und
in die Fußzeile.

Steht es schon drin, prüf beide Stellen: Hebt es sich vom Hintergrund
ab? Wenn es irgendwo farblich untergeht, schlag mir vor, es an dieser
Stelle einfarbig zu setzen: nur die Silhouette in Weiß oder in
Schwarz, je nachdem was besser steht. Das kann auch nur eine Stelle
betreffen — zum Beispiel farbig oben und weiß unten im dunklen
Fußbereich.

Wichtig: Umfärben geht nur, wenn das Logo als PNG ohne Hintergrund
vorliegt. Hat meins einen festen Hintergrund, sag mir das — dann
besorge ich eine freigestellte Version.

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
für eine Stelle nichts Passendes da ist, lass sie leer und sag es
mir — leere Stellen füllen wir gleich danach mit KI-Bildern.`,
            },
          ],
        },
      },
      {
        // Video: „Higgsfield AI — AI-native creative suite - 18 August 2026.mp4"
        slug: "ki-bilder-vs-eigene",
        title: "KI-Bilder vs. eigene Fotos",
        videoUrl: "https://videos.gefundenwerden.online/modul-1/ki-bilder-vs-eigene.mp4",
        description:
          "Die leeren Stellen füllen wir jetzt mit KI: Higgsfield verbindet fast alle Bild- und Video-KIs — und hängt direkt an Claude. Der Gratis-Zugang reicht. Wo echte Fotos unschlagbar bleiben und wie KI-Bilder nicht nach KI aussehen, regelt der Prompt.",
        duration: 20,
        kind: "video",
        steps: [
          "Bei higgsfield.ai einen Account anlegen — der Gratis-Zugang reicht völlig. Higgsfield bündelt fast alle Bild- und Video-KIs unter einem Dach.",
          "Verbinden, direkt in der Claude-App: aufs Plus-Zeichen → Connectoren → durchsuchen → „Higgs“ eintippen → Plus. Bei Higgsfield anmelden und bestätigen — das Kaufangebot dazwischen lehnst du ab, weiter mit dem Gratis-Zugang. Danach steht Higgsfield unter Connectoren als verbunden.",
          "Die drei Skills installieren — zwei von Higgsfield selbst (damit Claude weiß, wie er promptet, herunterlädt und einbaut) plus nanorealism: Der lässt Bilder mit Nano Banana erzeugen, mit einem Prompt, der auf Realismus getrimmt ist. Danach Claude Code einmal neu starten.",
          "Den Bilder-Prompt schicken — oder es offen formulieren: „Füll die restlichen Seiten mit Bildern, nutz Higgsfield.“ Ab hier wird es individuell: Die Schritte sind eine Richtlinie, kein Rezept.",
          "Geduld mit der Gratis-Version: Sie braucht länger und hängt sich mal auf. Parallel in der Higgsfield-App unter „Image“ nachsehen, was gerade wirklich erstellt wird — dann weißt du, ob Claude noch wartet oder festhängt.",
          "Nachbessern in Alltagssprache: zu unrealistisch? KI-Schriftzug im Bild? Hochkant-Handyfoto passt nicht als Desktop-Hintergrund? Einfach sagen — neue Hero-Hintergründe je Unterseite erzeugt die KI passend im Querformat. Und bei Fragen: ab in die Community, dort wird geantwortet, oft mit Video.",
        ],
        cheatSheet: {
          prompts: [
            {
              label: "Die drei Skills installieren — drei Zeilen nacheinander ins Terminal, Mac wie Windows gleich",
              text: `npx skills add higgsfield-ai/skills --skill higgsfield-generate --global --yes
npx skills add higgsfield-ai/skills --skill higgsfield-product-photoshoot --global --yes
npx skills add mariusmariusmariusmariusmarius/nanorealism --global --yes`,
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
Symbolbilder, Produkt-Kategorien ohne eigenes Foto.

Für die zweite Liste: Nutz Higgsfield über die eingebaute
Verbindung und die Skills „higgsfield-generate" und
„higgsfield-product-photoshoot". Wenn ein Bild realistisch wirken
muss — Räume, Produkte, Stimmungen — nimm zusätzlich den Skill
„nanorealism", damit es nicht nach KI aussieht. Kein Schriftzug,
kein Wasserzeichen, kein KI-Label im Bild. Frag mich vorher, welche
Bildsprache passen soll, und richte dich nach den Farben und der
Stimmung, die meine Seite schon hat.

Erzeug pro Stelle zwei Varianten zur Auswahl. Zeig sie mir, ich
entscheide. Erst danach baust du sie ein — mit Alt-Text und im
richtigen Seitenverhältnis für die Stelle: Hintergründe im
Querformat, keine Hochkant-Fotos als Desktop-Hintergrund.

Die Gratis-Version von Higgsfield braucht manchmal länger. Wenn du
auf ein Bild wartest, sag mir das, statt still zu hängen — ich kann
in der Higgsfield-App nachsehen, ob es noch erstellt wird.

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
              note: "hier anmelden — der Gratis-Zugang reicht",
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
        // Video: „Website live stellen mit Vercel.mp4"
        slug: "live-gehen-mit-vercel",
        title: "Live gehen mit Vercel",
        videoUrl: "https://videos.gefundenwerden.online/modul-1/live-gehen-mit-vercel.mp4",
        description:
          "Die Seite geht online — gehostet bei Vercel, gesteuert von Claude, für die allermeisten komplett kostenlos. Du bekommst erst mal eine Vercel-Adresse; deine eigene Domain verbinden wir im nächsten Schritt.",
        duration: 20,
        kind: "video",
        steps: [
          "Worum es geht: hosten. Deine Seite wird von überall erreichbar — unter einer zugewiesenen Vercel-Adresse. Keine Sorge: Bei Google steht sie damit noch nicht, sichtbar ist sie nur für den, der die Adresse kennt.",
          "Konto bei Vercel anlegen — Link rechts. Das Dashboard brauchst du danach kaum: Hosting, Domains, später sogar Besucherzahlen — das steuert und prüft alles Claude für dich.",
          "Zu den Kosten: Für 99 % von euch ist das dauerhaft 0 €. Das Freivolumen reicht locker für 5.000 bis 10.000 Besucher im Monat; erst darüber kostet es ab etwa 20 € — fair nach Verbrauch. Zum Vergleich: Baukästen nehmen 15 bis 20 € — jeden Monat, ab Tag eins.",
          "Anmelden: den Befehl rechts ins Terminal, Enter. Der Browser geht auf, du autorisierst dein Gerät — das war's, kein Schlüssel zum Abtippen.",
          "Den Veröffentlichen-Prompt schicken: Claude legt das Projekt an, lädt die Seite hoch, baut sie und prüft selbst, ob sie unter der neuen Adresse wirklich lädt. Das Bauen dauert ein paar Minuten — lass ihn machen.",
          "Am Ende hast du deine Adresse zum Rumzeigen. Im nächsten Schritt besorgen wir deine eigene Domain und hängen sie davor.",
        ],
        cheatSheet: {
          prompts: [
            {
              label: "Anmelden — ins Terminal einfügen, Enter; der Browser geht auf, Gerät bestätigen",
              text: `npx vercel login`,
            },
            {
              label: "Veröffentlichen — damit geht deine Seite live",
              text: `Bring meine Website live. Wir nutzen dafür Vercel. Ich bin im
Terminal schon angemeldet, du kannst das Vercel-Werkzeug direkt
benutzen.

So gehst du vor:

1. Zeig mir zuerst, welche Projekte in meinem Vercel-Konto schon
   liegen. Wenn dort noch nichts ist, ist das richtig so.

2. Veröffentliche mein aktuelles Projekt als neues Projekt. Nimm
   den Namen meiner Firma als Projektnamen, klein geschrieben und
   mit Bindestrichen.

3. Wenn beim Veröffentlichen etwas schiefgeht, lies die
   Fehlermeldung, sag mir in einem Satz was los ist, und behebe es.
   Häufig sind es Kleinigkeiten im Code, die auf meinem Rechner
   nicht auffallen.

4. Wenn es steht, prüf selbst, ob die Seite unter der Adresse
   wirklich lädt — nicht nur, ob die Veröffentlichung durchgelaufen
   ist.

5. Gib mir die Adresse und sag mir in zwei Sätzen, wie ich künftig
   eine Änderung veröffentliche.

Nur anlegen und veröffentlichen. Lösch keine Projekte und ändere
keine Einstellungen an anderen Projekten in meinem Konto.`,
            },
          ],
          links: [
            {
              label: "Vercel — Konto erstellen",
              href: "https://vercel.com/signup",
              note: "kostenlos; am besten mit deinem GitHub-Konto anmelden",
            },
          ],
        },
      },
      {
        // Video: „…18 August 2026-2.mp4" + „Google Bewertungen per eindeutiger Business ID.mp4"
        slug: "bewertungen-einbinden",
        title: "Deine Bewertungen auf die Website",
        videoUrl: "https://videos.gefundenwerden.online/modul-1/bewertungen-einbinden.mp4",
        description:
          "140 Bewertungen von Hand kopieren? Die Google-API kann nur fünf und kostet extra. Wir gehen den dritten Weg: Über deinen Akademie-Zugang holt Claude die Bewertungen von Google, Trustpilot & Co. — und hält sie auf Wunsch automatisch aktuell.",
        duration: 20,
        kind: "video",
        steps: [
          "Die drei Wege kurz verstanden: Selbst kopieren scheitert am „Mehr“-Klick bei jeder Bewertung. Die Google-API zeigt nur fünf Stück live und kostet in der Vollversion — und wenn im Kurs jede Verbindung Geld kostet, summiert sich das. Also der Datenbroker-Weg über deinen Akademie-Zugang: unabhängig von der Plattform, ob Google, Trustpilot, ProvenExpert oder GetYourGuide.",
          "Rechts oben steht dein persönlicher API-Schlüssel — er ist im Prompt schon eingesetzt. Behandle ihn wie ein Passwort.",
          "Der Trick, der die Suche abkürzt: Geh auf dein Google-Unternehmensprofil und klick auf „Teilen“ — in dem Link steckt deine eindeutige Business-ID. Den Link in den Prompt statt nur einen Screenshot: Claude findet dein Profil sofort, statt lange zu suchen. Gleiches gilt für Trustpilot und Co.",
          "Filter überlegen: Bei Google kann man fünf Sterne ohne ein Wort dalassen — auf der Website wirkt das leer. Also zum Beispiel: nur Bewertungen mit mindestens fünf Wörtern Text, mindestens vier Sterne. Bei 140 Bewertungen kannst du wählerisch sein.",
          "Den Bewertungs-Prompt schicken. Claude holt alles, zeigt dir die stärksten Zitate, du entscheidest — eingebaut wird mit Quellen-Link und Echtheits-Hinweis, der rechtssicheren Variante.",
          "Den zweiten Prompt schicken: Danach prüft deine Website im gewählten Rhythmus — jede Woche oder jeden Monat — von selbst, ob neue Bewertungen da sind, und ergänzt sie mit denselben Filtern. Du fasst nichts mehr an.",
        ],
        cheatSheet: {
          apiKeyHint: true,
          prompts: [
            {
              label: "Der Bewertungs-Prompt — Profile eintragen, dein Schlüssel steckt schon drin",
              text: `Hol meine echten Kundenbewertungen und bau sie in meine Website
ein.

MEINE PROFILE (was es nicht gibt, einfach rauslöschen):
- Google: {TEILEN-LINK-DEINES-EINTRAGS — Profil öffnen, „Teilen" klicken, Link kopieren}
- Trustpilot: {DEINE-DOMAIN-AUF-TRUSTPILOT}
- Tripadvisor: {LINK-ZU-DEINEM-EINTRAG}

Die Links enthalten die eindeutige Kennung meines Profils — nutz
sie, statt nach dem Namen zu suchen.

MEIN ZUGANG
Wir nutzen die Bewertungs-API meiner Kursplattform.
Adresse: {PLATTFORM-URL}/api/bewertungen
Anmeldung: Kopfzeile "Authorization: Bearer {DEIN-API-KEY}"

So funktioniert sie:
- POST mit JSON { "pfad": "...", "daten": [...] } — pfad ist ein
  business_data-Endpunkt von DataForSEO, deren Doku liest du hier:
  https://docs.dataforseo.com/v3/business_data/
- Ablauf je Plattform: Aufgabe mit task_post anlegen, kurz warten,
  mit tasks_ready nachsehen und mit task_get abholen.
- GET auf dieselbe Adresse zeigt dir meinen Verbrauch und mein
  Monatslimit. Geh sparsam mit Abfragen um: erst denken, dann
  abfragen — und bleib deutlich unter dem Limit.

SO GEHST DU VOR
1. Frag mich zuerst nach meinen Filtern. Mein Vorschlag: nur
   Bewertungen mit Text (mindestens fünf Wörter) und mindestens
   vier Sternen — leere Sterne-Bewertungen ohne Kommentar wirken
   auf der Website nicht.
2. Hol zu jedem Profil oben alle Bewertungen: Text, Sterne, Name,
   Datum und den Link zur Originalbewertung.
3. Zeig mir eine Übersicht: Anzahl und Durchschnitt pro Plattform,
   dazu die fünf stärksten Zitate. Zeig mir auch die schlechten —
   ich entscheide, wie wir damit umgehen.
4. Frag mich, welche Bewertungen auf die Website sollen und wohin:
   Startseite, eigene Bewertungsseite oder beides.
5. Bau den Bewertungsbereich: Zitat, Sterne, Vorname, Datum und die
   Quelle als Link zur Originalbewertung auf der Plattform.
6. Direkt darunter setzt du diesen Hinweis, angepasst an die
   Plattformen, die wir wirklich zeigen:
   "Diese Bewertungen stammen unverändert von Google und
   Trustpilot. Wir prüfen sie nicht selbst — jeder Link führt zur
   Originalbewertung."

REGELN
- Nur echte Bewertungen, wortgleich übernommen. Nichts umschreiben,
  nichts erfinden, keine Namen dazudichten. Auch Tippfehler der
  Kunden bleiben drin — die machen es glaubwürdig.
- Volle Nachnamen kürzt du auf den ersten Buchstaben ab.
- Wenn du ein Profil nicht findest, sag es mir, statt zu raten.
- Der API-Schlüssel bleibt in diesem Chat. Schreib ihn in keine
  Datei meines Projekts.`,
            },
            {
              label: "Die Auto-Aktualisierung — neue Bewertungen kommen ab jetzt von selbst",
              text: `Meine Website zeigt jetzt Bewertungen — ab sofort sollen neue von
selbst dazukommen, ohne dass ich etwas anfasse.

So soll es laufen:
- In einem festen Rhythmus — frag mich, ob wöchentlich oder
  monatlich zu mir passt — prüft meine Website über meinen
  Kursplattform-Zugang (kennst du aus dem Bewertungs-Einbau), ob
  es neue Bewertungen gibt.
- Neue Bewertungen, die unsere Filter bestehen (dieselben wie beim
  Einbau: Mindestlänge, Mindeststerne), werden ergänzt. Bestehende
  bleiben unangetastet, gelöscht wird nichts ohne mich.
- Wortgleich, mit Quellen-Link, Nachname abgekürzt — dieselben
  Regeln wie beim Einbau.

WICHTIG
- Das läuft über Vercel, wo meine Seite gehostet ist — die können
  Aufgaben nach Zeitplan ausführen. Bau es so, dass die Abfrage
  NUR im Zeitplan läuft, nicht bei jedem Seitenaufruf — jede
  Abfrage kostet ein paar Cent.
- Der API-Schlüssel kommt als Umgebungsvariable ins Projekt und zu
  Vercel. Ich bin im Terminal bei Vercel angemeldet — mach das
  selbst, ich will nichts im Dashboard klicken. Der Schlüssel
  steht in keiner Datei meines Codes.
- Schlägt eine Abfrage fehl, bleibt die Seite einfach beim alten
  Stand — kein leerer Bewertungsbereich, kein Fehler für Besucher.

Zum Schluss: Erklär mir in zwei Sätzen, wie ich sehe, wann zuletzt
geprüft wurde — und stoß eine Prüfung einmal von Hand an, damit wir
sehen, dass alles läuft.`,
            },
          ],
        },
      },
      {
        // Video: „Anfrageformular und Lead-Weiterleitung umsetzen.mp4"
        //        + „Admin Übersicht für Anfragen und Workflow.mp4"
        slug: "anfragen-empfangen",
        title: "Das Anfrage-Formular",
        videoUrl: "https://videos.gefundenwerden.online/modul-1/anfragen-empfangen.mp4",
        description:
          "Die Website bekommt ihre wichtigste Funktion: den Anfragebogen, über den aus Besuchern Leads werden — plus deine eigene Admin-Übersicht unter /admin, in der jede Anfrage ihre Stufe hat, von neu bis gewonnen.",
        duration: 25,
        kind: "video",
        steps: [
          "Ersten Prompt schicken. Claude fragt dich, welche Felder rein sollen. Die Faustregel: nur, was du zum Zurückrufen brauchst — Name, E-Mail, Telefon, Nachricht ist meist der beste Fall. Dienstleistungs-Auswahl, Kalender-Anbindung und Co. kommen später im Automations-Modul.",
          "Ergebnis am Rechner und auf dem Handy anschauen. Der Absende-Knopf läuft noch ins Leere — das ist so gewollt, angeschlossen wird gleich.",
          "Nacharbeit in eigenen Worten: die Anfrage-Sektion weiter nach oben — und alle Knöpfe der Website („Termin vereinbaren“ und Co.) zeigen ab jetzt direkt auf den Bogen. Je kürzer der Weg zur Anfrage, desto mehr kommen an.",
          "Zweiten Prompt schicken: deine Admin-Übersicht unter /admin — nirgends verlinkt, passwortgeschützt, nur du kennst die Adresse. Claude schlägt dir Pipeline-Stufen vor: neu → Kontakt aufgenommen → Termin vereinbart → gewonnen / verloren. Nimm die Empfehlung oder beschreib deinen eigenen Ablauf, etwa mit Angebot gesendet und Rechnung bezahlt.",
          "Testen wie im Video: Anfrage abschicken — einmal absichtlich ohne Datenschutz-Häkchen, die Fehlermeldung muss kommen. Dann /admin öffnen: Die Anfrage steht in „neu“, du schreibst eine Notiz und schiebst sie eine Stufe weiter.",
          "Warum gewonnen/verloren dokumentieren? Erst mal nur für deinen Überblick. Später füttern genau diese Daten den Werbe-Algorithmus bei Meta und Google. Als Nächstes: Datenschutz, dann geht die Seite online — und danach der E-Mail-Weg: du wirst benachrichtigt, der Kunde bekommt seine Bestätigung.",
        ],
        cheatSheet: {
          prompts: [
            {
              label: "1. Der Anfragebogen — Claude fragt, was rein soll, und baut",
              text: `Bau mir das Anfrage-Formular für meine Website.

Erstmal nur den Bogen selbst: wie er aussieht, was drinsteht, wie er
sich anfühlt. Angeschlossen wird er im nächsten Schritt — bau also
noch keine Speicherung und verschick noch keine Mails.

SCHRITT 1 — Frag mich, welche Felder rein sollen
Mach mir einen Vorschlag und begründe ihn kurz. Meine Faustregel:
nur, was du brauchst, um mich zurückrufen zu können. Jedes Feld
mehr kostet Anfragen.

SCHRITT 2 — Bau den Bogen
- Er soll aussehen wie der Rest meiner Seite: gleiche Farben,
  gleiche Schrift, gleiche Ecken, gleiche Abstände.
- Überschrift und ein, zwei Sätze darüber, die zum Anfragen
  einladen — in meinem Ton, keine Floskeln.
- Wenn es zur Seite passt, ein Bild daneben: ich bei der Arbeit,
  mein Team oder mein Firmenwagen. Sag mir, welches Bild aus meinem
  Bilder-Ordner du nehmen würdest, oder ob es ohne besser wirkt.
- Pflichtfelder werden geprüft, bevor abgeschickt wird — mit
  freundlichen deutschen Hinweisen direkt am Feld, nicht als
  Fehlerblock oben.
- Telefonnummer und E-Mail nur grob prüfen. Lieber eine Anfrage mit
  krummer Nummer als eine abgewiesene echte Anfrage.
- Während des Absendens ist der Knopf gesperrt und zeigt, dass etwas
  passiert. Doppelklick darf keine zwei Anfragen auslösen.
- Danach sieht der Kunde eine klare Bestätigung auf der Seite: dass
  die Anfrage da ist und wann ich mich melde. Keine leere Seite,
  kein Sprung nach oben.
- Ein verstecktes Feld gegen Werbemüll: Füllt ein Roboter es aus,
  wird die Anfrage still verworfen.
- Pflicht-Häkchen für den Datenschutzhinweis, verlinkt auf meine
  Datenschutzseite. Die gibt es noch nicht und du baust sie AUCH
  NICHT — Impressum und Datenschutz machen wir später gemeinsam in
  einem eigenen Schritt. Setz den Link trotzdem schon, auch wenn er
  vorerst ins Leere zeigt, und erinner mich am Ende in einem Satz
  daran, dass das noch offen ist.
- Auf dem Handy: große Felder, richtige Tastatur je Feld (Zahlen bei
  Telefon, @ bei E-Mail), nichts, wofür man zoomen muss.

SCHRITT 3 — Zeig ihn mir und verdrahte die Knöpfe
Zeig mir den fertigen Bogen am Rechner und auf dem Handy. Der
Absende-Knopf darf noch ins Leere laufen — sag mir nur klar, dass er
noch nicht angeschlossen ist, damit ich mich nicht wundere.

Danach: Alle Handlungs-Knöpfe auf meiner Website — „Termin
vereinbaren", „Anfrage senden", „Kontakt" und wie sie heißen —
führen ab jetzt direkt zu diesem Bogen. Geh sie durch und sag mir,
welche du umgestellt hast.`,
            },
            {
              label: "2. Deine Admin-App — Anfragen sehen und nachhalten",
              text: `Jetzt schließen wir das Formular an und bauen mir eine kleine
Admin-App dazu.

TEIL 1 — Die Anfragen müssen irgendwo landen
Leg eine Empfangsstelle im Projekt an, die jede Anfrage mit Datum
und Uhrzeit speichert.

TEIL 2 — Die Admin-App
Erreichbar unter /admin. Nirgends auf der Website verlinkt — weder
im Menü noch im Fußbereich noch in der Sitemap. Setz sie außerdem
auf "noindex", damit Google sie nicht in den Suchergebnissen zeigt.

PASSWORT — nicht optional
Nicht verlinkt heißt nicht geschützt: Wer die Adresse errät, sieht
sonst die Namen, Telefonnummern und Adressen meiner Kunden. Das sind
personenbezogene Daten, dafür hafte ich.

Bau deshalb einen einfachen Passwortschutz davor. Das Passwort kommt
in die Umgebungsvariablen, nicht in den Code. Denk dir eins aus, sag
es mir, und erinner mich daran, es in meinem Passwort-Manager zu
speichern. Ohne richtiges Passwort ist unter /admin nichts zu sehen —
auch keine Zahlen.

ZAHLEN OBEN
- Anfragen heute
- Anfragen diese Woche
- Anfragen gesamt
- wie viele davon noch unbearbeitet sind

DIE PIPELINE — das Herzstück
Jede Anfrage hat einen Status. Frag mich ZUERST, welche Stufen zu
meinem Betrieb passen, und schlag mir diese vor:

  neu → Kontakt aufgenommen → Termin vereinbart → gewonnen / verloren

Ich kann Stufen streichen, umbenennen oder eigene ergänzen — zum
Beispiel „Angebot geschickt", „Rechnung gestellt", „bezahlt". Erst
wenn ich bestätigt habe, baust du.

Bau die Anfragen dann als Pipeline: die Stufen nebeneinander als
Spalten, jede Anfrage als Karte in ihrer Spalte. Ich will eine Karte
von einer Stufe in die nächste schieben oder per Auswahlfeld
umstellen können — nimm das, was auf dem Handy zuverlässiger
funktioniert, und sag mir, warum du dich so entschieden hast.

Auf jeder Karte: Datum, Name, Telefonnummer, E-Mail, worum es geht.
Telefonnummer und E-Mail als anklickbare Verweise, damit ich vom
Handy aus direkt anrufen kann. Karte antippen zeigt die ganze
Nachricht. Dazu ein Notizfeld pro Anfrage, in das ich reinschreiben
kann, was besprochen wurde — „wurde angerufen", „Einfamilienhaus,
will Angebot bis Freitag".

Gewonnen und verloren blende ich normalerweise aus — die hole ich
mir über einen Schalter dazu. Gelöscht wird trotzdem nichts: Diese
Daten brauchen wir später noch für die Werbung.

Halt es schlicht: Das ist mein Arbeitswerkzeug, kein Schaufenster.
Gut lesbar auf dem Handy ist wichtiger als schön.

TEIL 3 — Selbst testen
Schick eine echte Testanfrage über das Formular ab — und einmal
absichtlich ohne das Datenschutz-Häkchen: Da muss eine freundliche
Fehlermeldung kommen. Dann ruf /admin auf — einmal ohne Passwort,
einmal mit — und zeig mir, dass die Anfrage dort in der Spalte "neu"
steht. Schieb sie einmal eine Stufe weiter und lad die Seite neu:
Der Status muss erhalten bleiben.`,
            },
          ],
        },
      },
      {
        // Video: „Rechtstexte für Websites, Skill rechtssexte.de.mp4"
        slug: "rechtstexte-barrierefreiheit",
        title: "Rechtstexte & Barrierefreiheit",
        videoUrl: "https://videos.gefundenwerden.online/modul-1/rechtstexte-barrierefreiheit.mp4",
        description:
          "Sobald dein Formular Anfragen sammelt, erhebst du Daten dritter Personen — ab da sind Impressum und Datenschutz Pflicht. Der Skill kennt die aktuellen Gesetzestexte inklusive Barrierefreiheit, Claude liest dein Projekt und schreibt die Seiten. Ohne Anwaltstermin.",
        duration: 20,
        kind: "video",
        steps: [
          "Warum jetzt: Dein Anfragebogen speichert Namen, Nummern und Nachrichten fremder Menschen — genau ab diesem Moment braucht die Seite Impressum und Datenschutzerklärung.",
          "Den Skill „rechtstexte-de“ installieren — Befehl rechts, ins Terminal, mit Y bestätigen. Er enthält die aktuellen Gesetzestexte und Pflichten, auch zur Barrierefreiheit — und wird laufend aktualisiert, statt statisch auf deinem Rechner zu liegen.",
          "Den Rechtstexte-Prompt schicken. Claude durchsucht dein Projekt und listet jede Stelle, an der Daten anfallen — bei uns zum Beispiel das Vercel-Hosting, der Speicher hinter der Admin-App und der Bewertungs-Zeitplan. Genau dafür läuft alles zentral über Claude: Er sieht alles, menschliche Vergesslichkeit fällt weg.",
          "Die Fragen beantworten, die im Code nicht stehen — Rechtsform, Anschrift, Steuernummer. Dann entstehen /impressum und /datenschutz im Stil deiner Seite, mit Stand-Datum; der Datenschutz-Link im Formular-Häkchen zeigt jetzt auf die echte Seite.",
          "Zur Einordnung: Ein Anwalt schöpft aus denselben aktuellen Quellen wie der Skill — und nimmt dafür ein Honorar. Ob du zusätzlich prüfen lässt, entscheidest du. AGB sind optional: oft schickt man sie mit dem Angebot mit, statt sie auf die Website zu stellen — wenn du welche willst, nimm den AGB-Prompt rechts. Onlineshop-Rechtstexte sind ein eigenes Thema und kommen im Shop-Modul.",
          "Die Halbjahres-Routine: Trag dir einen Kalender-Termin ein — alle sechs Monate den Kontroll-Prompt rechts schicken. Gesetzesänderungen sind selten und haben Übergangsfristen von ein bis zwei Jahren; damit bist du dauerhaft abgesichert.",
        ],
        cheatSheet: {
          prompts: [
            {
              label: "Den Rechtstexte-Skill installieren — ins Terminal, Mac wie Windows gleich",
              text: `npx skills add mariusmariusmariusmariusmarius/rechtstexte-de --global --yes`,
            },
            {
              label: "Der Rechtstexte-Prompt — Claude liest dein Projekt und fragt den Rest",
              text: `Erstelle die Rechtstexte für diese Website. Nutz dafür den Skill
„rechtstexte-de".

Wichtig dabei:

- Durchsuch zuerst mein Projekt und zeig mir als Tabelle, welche
  Dienste du gefunden hast — Hosting, Formular, Datenspeicher,
  Zeitpläne und Automationen, Schriften, Karten, WhatsApp,
  Tracking. Ich bestätige oder streiche, bevor du schreibst.
- Nimm NUR auf, was ich wirklich einsetze. Keine Bausteine für
  Dienste, die ich nicht nutze, und nichts weglassen, was ich nutze.
- Stell mir dann die Fragen, die im Code nicht stehen können —
  gesammelt in einer Nachricht, nicht einzeln.
- Erfinde nichts. Keine ausgedachte Steuernummer, keine geratene
  Handelsregisternummer, keine erfundene Aufsichtsbehörde. Was du
  nicht von mir hast, bleibt als deutlich markierte Lücke stehen,
  und du fragst mich am Ende gesammelt danach.
- Bau /impressum und /datenschutz im Stil meiner Seite und verlink
  beide im Fußbereich, sodass sie von jeder Seite aus in maximal
  zwei Klicks erreichbar sind. Der Link im Datenschutz-Häkchen
  meines Anfrage-Formulars zeigt bisher ins Leere — der muss jetzt
  auf die neue Seite zeigen.
- Setz ein Stand-Datum unter jede Seite.
- Gib mir am Ende eine Checkliste: was erledigt ist, und was ich
  selbst noch tun muss.

Und sag mir zum Schluss in einem Satz, was diese Texte sind und was
sie nicht sind.`,
            },
            {
              label: "Optional: der AGB-Prompt — falls du Geschäftsbedingungen willst",
              text: `Ich möchte zusätzlich Allgemeine Geschäftsbedingungen für meinen
Betrieb. Nutz den Skill „rechtstexte-de".

Schau dir zuerst meine Website an, damit du weißt, was ich anbiete.
Dann frag mich NACHEINANDER durch meinen Ablauf:
- Wie läuft ein Auftrag bei mir — vom ersten Kontakt bis zur
  fertigen Leistung?
- Angebot, Preise, Zahlung: wann wird wie bezahlt? Gibt es
  Anzahlungen, Materialkosten, Anfahrt?
- Termine und Absagen: was gilt, wenn der Kunde kurzfristig absagt?
- Gewährleistung und Garantien: was verspreche ich — und was
  ausdrücklich nicht?

Danach schreibst du die AGB und sagst mir ehrlich dazu:
- ob sie auf die Website sollen oder besser jedem Angebot beiliegen —
  beides ist üblich, ich entscheide.
- was du nicht sicher abdecken kannst und wo im Zweifel doch ein
  Anwalt draufschauen sollte.

Erfinde nichts — was ich nicht beantwortet habe, bleibt draußen.`,
            },
            {
              label: "Alle sechs Monate: der Kontroll-Prompt — leg dir einen Kalender-Termin an",
              text: `Prüf meine Rechtstexte auf den aktuellen Stand. Nutz den Skill
„rechtstexte-de" — der wird laufend aktualisiert.

- Vergleich mein Impressum und meine Datenschutzerklärung mit dem
  heutigen Stand des Skills: Hat sich etwas geändert, das mich
  betrifft?
- Durchsuch auch mein Projekt: Sind seit dem letzten Mal Dienste
  dazugekommen — neue Verbindungen, neue Speicher, neue
  Automationen —, die in der Datenschutzerklärung fehlen?
- Wenn nichts zu tun ist, sag mir das in einem Satz. Wenn doch:
  zeig mir, was du ändern willst, und warte auf mein OK.
- Aktualisiere danach das Stand-Datum auf beiden Seiten.`,
            },
          ],
        },
      },
      {
        // Video: 7 Teile — „Domain und DNS für Cloud-Verwaltung verbinden" bis
        // „DNS Einträge bearbeiten, A und CNAME - 25 August 2026"
        slug: "domain-verbinden",
        title: "Domain verbinden",
        videoUrl: "https://videos.gefundenwerden.online/modul-1/domain-verbinden.mp4",
        description:
          "Deine Website bekommt ihren echten Namen. Unten prüfst du, ob die Wunschdomain frei ist, kaufst sie nackt für unter 5 € im Jahr — und schließt sie an: Claude bekommt per Token Zugriff auf die DNS-Einträge und verdrahtet alles selbst.",
        duration: 25,
        kind: "video",
        dnsTool: true,
        domainCheck: true,
        steps: [
          "Zwei Ausgangslagen: Du hast schon eine Domain — dann direkt zu Schritt 3. Noch keine? Erst unten in der Box prüfen, ob dein Wunschname frei ist — mit Alternativen, und der Bindestrich-Trick hilft oft.",
          "Kaufen, aber richtig: IONOS, Netcup, GoDaddy oder Squarespace — die nackte Domain kostet unter 5 € im Jahr, teils unter einem Euro. Alles andere abwählen! SSL gibt es vom Hosting geschenkt, DomainGuard ist sinnlos (DNS steuert bei uns Claude), und E-Mail-Postfächer kaufst du hier ausdrücklich NICHT — die bauen wir später selbst, samt E-Mail-Marketing. Die Hoster verdienen an den Extras, nicht an der Domain.",
          "Domain unten in die Box eintragen und anschließen — du bekommst dein DNS-Token (gleich für den Prompt) und zwei Nameserver.",
          "Beim Domain-Anbieter die zwei Nameserver eintragen. Keine Sorge: Alle bestehenden Einträge — auch deine Mail-Einträge — werden übernommen, gelöscht wird nichts. Danach 10 bis 15 Minuten warten, bis der Status in der Box auf aktiv springt; manchmal dauert es länger.",
          "Den Domain-Prompt mit Domain und Token schicken: Claude hängt die Domain an dein Vercel-Projekt, setzt die Einträge selbst und prüft, bis die Seite unter deiner Domain lädt — zwei, drei Minuten, dann bist du unter deinem Namen online.",
          "Du willst die Einträge lieber selbst pflegen? Der Kurz-Prompt gibt dir nur die Tabelle (A und www). Bei IONOS oder Squarespace unter DNS eintragen, TTL einfach lassen, wie es ist — und wenn du irgendwo unsicher bist: Frag Claude. Er ist mit allen Diensten verbunden und der beste Ansprechpartner.",
        ],
        cheatSheet: {
          prompts: [
            {
              label: "Der Domain-Prompt — Domain und Token aus der Box einsetzen",
              text: `Verbinde meine Domain mit meiner Website.

Meine Domain: {DEINE-DOMAIN}
Mein DNS-Token: {TOKEN-AUS-DER-BOX}

Das Token ist ein Cloudflare-Token und darf ausschließlich die
DNS-Einträge meiner Domain ändern. Benutz die Cloudflare-API
(api.cloudflare.com/client/v4, Kopfzeile "Authorization: Bearer …",
Zone über /zones?name=… finden).

So gehst du vor:

1. Prüf zuerst, ob die Zone schon auf "active" steht. Wenn nicht,
   sind die Nameserver beim Registrar noch nicht durch — sag mir
   das, erklär mir kurz, wie ich es prüfen kann, und hör hier auf.

2. Zeig mir die bestehenden DNS-Einträge, BEVOR du irgendetwas
   änderst.

3. Verbinde die Domain mit meinem Vercel-Projekt: Ich bin im
   Terminal bei Vercel angemeldet, füg die Domain dort dem Projekt
   hinzu. Dann setz die Einträge:
   - A-Eintrag für die nackte Domain auf 76.76.21.21
   - CNAME für www auf cname.vercel-dns.com
   Beide als "DNS only" — den orangenen Cloudflare-Proxy lässt du
   AUS, sonst klemmt das Zertifikat.

4. Warte, bis das Zertifikat da ist, und prüf selbst, ob die Seite
   unter https://… wirklich lädt — mit und ohne www.

5. E-Mail: Bestehende MX-, SPF- und Mail-Einträge lässt du exakt so,
   wie sie sind. Fehlen MX-Einträge komplett, frag mich, bevor du
   welche setzt — die Postfächer bauen wir in einem eigenen Schritt.

Nur diese Einträge anlegen. Nichts löschen, nichts überschreiben
ohne mein ausdrückliches Ja.`,
            },
            {
              label: "Kurz: nur die DNS-Einträge zeigen — falls du selbst eintragen willst",
              text: `Sag mir, welche DNS-Einträge ich brauche, damit meine Domain
auf meine Website zeigt.

Meine Domain: {DEINE-DOMAIN}

Gib mir nur eine Tabelle mit Typ, Name, Ziel und Proxy-Einstellung —
einmal für die Domain ohne www und einmal mit www. Keine langen
Erklärungen, ich trage sie selbst ein.`,
            },
          ],
        },
      },
      {
        // Video: „Safari - 25 August 2026.mp4"
        //        + „E-Mail Benachrichtigungen für neue Leads-2.mp4"
        slug: "firmen-email-anlegen",
        title: "Deine Firmen-E-Mail",
        videoUrl: "https://videos.gefundenwerden.online/modul-1/firmen-email-anlegen.mp4",
        description:
          "info@deine-firma.de statt gmx: Der Kurs hat einen eigenen Mail-Server, den Claude über deine API steuert. Postfächer anlegen, Mail-Einträge setzen, Handy einrichten — die Grundlage dafür, dass Anfragen gleich per Mail bei dir und beim Kunden landen.",
        duration: 15,
        kind: "video",
        steps: [
          "Das Ziel vor Augen: Wir vollenden das Anfrage-Formular — du bekommst bei jeder Anfrage eine Mail, der Kunde eine Bestätigung („wir melden uns innerhalb von 24 bis 48 Stunden“, bei einer Praxis: „im Notfall rufen Sie an unter …“). Dafür braucht es zuerst eins: eine eigene E-Mail.",
          "Der Kursweg: unser eigener Mail-Server, gesteuert über deine API — der Schlüssel rechts oben steckt schon im Prompt. Deshalb auch kein Postfach beim Domain-Hoster kaufen: Hier verwaltet Claude alles, und später laufen darüber E-Mail-Marketing und Automationen.",
          "Prompt kopieren, Wunschadressen eintragen — zum Beispiel info@ und rechnung@. Claude fragt nach dem Absender-Namen: dein Firmenname oder dein eigener Name als Chef — das ist, was Empfänger sehen.",
          "DNS bestätigen: Claude hat seit der Domain-Lektion Zugriff auf deine Einträge und stellt die Mail-Server-Einträge selbst um — vorher zeigt er sie dir.",
          "Zugangsdaten sichern: Du bekommst eine Tabelle mit Adresse und Passwort — ab damit in den Passwort-Manager. Dann das Postfach aufs Handy holen, die Serverdaten sagt dir Claude. Passwörter kannst du jederzeit später ändern.",
          "Du hast schon Postfächer auf der Domain? Dann warte auf die nächste Lektion — dort ziehst du bestehende Adressen mit auf den Kurs-Server um, damit auch sie über Claude laufen.",
        ],
        cheatSheet: {
          apiKeyHint: true,
          prompts: [
            {
              label: "Der Postfach-Prompt — Domain und Wunschadressen eintragen, dein Schlüssel steckt drin",
              text: `Leg mir Postfächer für meine Firmen-Domain an.

Meine Domain: {DEINE-DOMAIN}
Meine Wunschadressen: {Z-B-INFO-UND-RECHNUNG}

WICHTIG ZUERST
Für diese Domain läuft noch keine Mail — wir richten sie neu ein.
Prüf das bitte trotzdem: Gibt es schon MX-Einträge, sag mir das und
hör auf, bevor du irgendetwas änderst. Eine Umstellung würde sonst
meine bisherige Post umleiten — der Umzug bestehender Postfächer
ist ein eigener Schritt.

SO FUNKTIONIERT DAS (damit du nichts nachschlagen musst)
Die Postfächer liegen bei Migadu. Der Zugang läuft über den Schlüssel
der Kursplattform — den Migadu-Schlüssel selbst bekomme ich nie zu
sehen, meine Plattform spricht für mich mit Migadu. Sie lässt dabei
nur Domains durch, die zu meinem Konto gehören.

MEIN ZUGANG
Adresse: {PLATTFORM-URL}/api/mail
Anmeldung: Kopfzeile "Authorization: Bearer {DEIN-API-KEY}"

- POST { "aktion": "domain",   "domain": "..." }
- POST { "aktion": "postfach", "domain": "...", "adresse": "info",
         "name": "Firmenname", "passwort": "..." }
- POST { "aktion": "alias",    "domain": "...", "alias": "kontakt",
         "ziele": ["info@..."] }
- GET  auf dieselbe Adresse zeigt meine Domains und Postfächer.

SCHRITT 1 — Anlegen
Leg meine Domain an, dann die Wunschadressen von oben. Frag mich
vorher, wie der Absender-Name erscheinen soll — mein Firmenname
oder mein eigener Name. Das ist der Name, den Empfänger sehen,
wenn ich ihnen schreibe.
Denk dir sichere Passwörter aus, mindestens 16 Zeichen, ohne
Sonderzeichen, die man auf dem Handy schwer tippt.

SCHRITT 2 — Einträge setzen
Damit die Postfächer Mail empfangen und senden dürfen, brauchen sie
diese Einträge. Meine DNS läuft über die Kursplattform — du hast
den Zugriff aus der Domain-Lektion.

  MX    @   aspmx1.migadu.com   Priorität 10
  MX    @   aspmx2.migadu.com   Priorität 20
  TXT   @   v=spf1 include:spf.migadu.com -all
  CNAME key1._domainkey   key1.MEINE-DOMAIN._domainkey.migadu.com
  CNAME key2._domainkey   key2.MEINE-DOMAIN._domainkey.migadu.com
  CNAME key3._domainkey   key3.MEINE-DOMAIN._domainkey.migadu.com

Alle ohne Cloudflare-Proxy (DNS only). MEINE-DOMAIN ersetzt du durch
meine echte Domain.

Zeig mir die Einträge kurz, bevor du sie setzt. Prüf danach per
DNS-Abfrage, ob sie greifen, und sag mir, wenn Migadu die Domain
weiterhin als inaktiv führt.

SCHRITT 3 — Übergeben
Gib mir eine Tabelle mit Adresse, Passwort und den Daten fürs Handy.
Die Serverdaten sind bei Migadu für alle gleich:

  Posteingang (IMAP): imap.migadu.com, Port 993, SSL
  Postausgang (SMTP): smtp.migadu.com, Port 465, SSL
  Benutzername: die volle E-Mail-Adresse

Erinner mich daran, die Passwörter im Passwort-Manager zu speichern.
Sag mir zum Schluss in drei Schritten, wie ich das Postfach aufs
Handy hole — und dass ich dabei IMAP nehme, niemals POP3.

Nur anlegen. Lösch nichts und ändere keine Einträge, die nichts mit
Mail zu tun haben.`,
            },
          ],
        },
      },
      {
        // Video: „E-Mail Benachrichtigungen fürs Anfrageformular einrichten"
        //        + „E-Mail-Zugriff prüfen, Konto einrichten"
        //        + „E-Mail Passwort ändern per Cloud Prompt-2"
        slug: "anfragen-per-mail",
        title: "Anfragen landen im Postfach",
        videoUrl: "https://videos.gefundenwerden.online/modul-1/anfragen-per-mail.mp4",
        description:
          "Die Kette wird geschlossen: Jede Anfrage löst zwei Mails aus — die Benachrichtigung an dich, die Bestätigung an den Kunden. Verschickt über dein eigenes Postfach, zusammengeklickt im Baukasten unten. Danach holst du das Postfach ins Mail-Programm und lernst den Passwort-Trick.",
        duration: 25,
        kind: "video",
        mailPrompt: true,
        resendPrompt: true,
        steps: [
          "Der Baukasten unten kennt deine Postfächer schon — die Akademie erkennt automatisch, was du in der letzten Lektion angelegt hast. Absender auswählen, dann wohin die Benachrichtigung soll: deine Geschäftsadresse oder auch privat (Gmail und GMX gehen genauso).",
          "In einem Satz grob sagen, was in der Bestätigung stehen soll — „danke, wir melden uns innerhalb von 48 Stunden, im Notfall rufen Sie an unter …“. Du siehst unten, wie sich der Prompt beim Tippen live mitbaut. Es muss nicht perfekt formuliert sein, Claude baut die Nachricht daraus.",
          "Prompt kopieren, abschicken. Claude verknüpft deinen Mailserver mit Vercel und baut zwei Mails mit Variablen: An dich geht die Benachrichtigung mit allen Kontaktdaten — auf Antworten landest du direkt beim Kunden — und der Kunde bekommt seine Bestätigung mit Namen.",
          "Das Postfach ins Mail-Programm holen: Frag Claude nach Login- und Serverdaten (Prompt rechts). Dann Einstellungen → Accounts → Account hinzufügen → „Anderer Mail-Account“ — nicht Google und Co., du hast einen eigenen Server. Immer IMAP wählen: geräteübergreifend, Ordner und Gelesen-Status sind auf jedem Gerät gleich. Die Ports setzen moderne Programme von selbst.",
          "Der Live-Test: Anfrage über die echte Website abschicken. Die Benachrichtigung landet im Firmen-Postfach, die Bestätigung beim Kunden — Tipp: Apple und Gmail sortieren sie gern unter „Transaktionen“. Danach die Anfrage in der Admin-App einordnen.",
          "Passwort ändern oder vergessen? Ein Satz an Claude genügt — danach einmal das neue Passwort im Mail-Programm eintragen, wenn es meckert; Claude schickt zur Kontrolle eine Testmail. Und zum Vertrauen: Dein Chat liegt in deinem eigenen Claude-Konto — nicht anders als bei jeder Software, der du Passwörter anvertraust.",
        ],
        cheatSheet: {
          prompts: [
            {
              label: "Postfach ins Mail-Programm holen — Claude gibt dir alles als Tabelle",
              text: `Gib mir die Zugangsdaten meiner Postfächer als Tabelle: Adresse,
Passwort und die Serverdaten für Posteingang und Postausgang.
Sag mir dazu in drei Schritten, wie ich das Postfach in mein
Mail-Programm und aufs Handy hole — und dass ich IMAP nehme,
niemals POP3.`,
            },
            {
              label: "Passwort ändern — ein Satz reicht",
              text: `Ändere das Passwort meines Postfachs {ADRESSE} auf ein neues,
sicheres Passwort. Sag mir das neue Passwort und erinner mich:
in den Passwort-Manager damit — und in meinem Mail-Programm muss
ich es danach einmal neu eintragen.`,
            },
          ],
          links: [
            {
              label: "Resend — falls du lieber einen Versanddienst nutzt",
              href: "https://resend.com",
              note: "Alternative zum eigenen Postfach, Baukasten unten rechts",
            },
          ],
        },
      },
    ],
  },
  {
    slug: "basics",
    title: "Basics (alte Planung)",
    subtitle: "Bleibt zur Orientierung stehen, bis die neuen Video-Module komplett sind — Inhalte wandern nach und nach nach oben",
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
        domainCheck: true,
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
          "Higgsfield in der Liste auswählen und verbinden.",
          "Im Browser mit deinem Higgsfield-Konto anmelden und den Zugriff bestätigen — kein Schlüssel zum Abtippen.",
          "Die drei Skills installieren, Claude Code einmal neu starten, dann den Bilder-Prompt schicken.",
        ],
        cheatSheet: {
          prompts: [
            {
              label: "Die Skills installieren — drei Zeilen nacheinander ins Terminal",
              text: `npx skills add higgsfield-ai/skills --skill higgsfield-generate --global --yes
npx skills add higgsfield-ai/skills --skill higgsfield-product-photoshoot --global --yes
npx skills add mariusmariusmariusmariusmarius/nanorealism --global --yes`,
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
Verbindung und die Skills. Wenn auf einem Bild Menschen oder
echt wirkende Räume vorkommen sollen, nimm zusätzlich den Skill
„nanorealism" — der sorgt dafür, dass es nicht nach KI aussieht. Frag mich vorher, welche Bildsprache
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
        steps: [
          "Konto bei Vercel anlegen — Link rechts. Am einfachsten mit deinem GitHub-Konto anmelden, dann hängt beides gleich zusammen.",
          "Den ersten Prompt schicken. Claude startet die Anmeldung und gibt dir einen Link mit einem kurzen Code.",
          "Link öffnen, Code bestätigen — fertig. Kein Schlüssel zum Abtippen, kein Terminal.",
          "Den zweiten Prompt schicken. Claude veröffentlicht deine Seite und gibt dir die Adresse zurück.",
        ],
        cheatSheet: {
          prompts: [
            {
              label: "1. Anmeldung — Claude macht das, du bestätigst nur im Browser",
              text: `Melde mich bei Vercel an.

Führ dazu „npx vercel login" im Hintergrund aus — der Befehl wartet
auf mich und würde dich sonst blockieren.

In der Ausgabe steht eine Adresse mit einem kurzen Code, ungefähr so:
vercel.com/oauth/device?user_code=XXXX-XXXX

Gib mir diese Adresse. Ich öffne sie und bestätige im Browser.

Danach prüfst du mit „npx vercel whoami", ob die Anmeldung
angekommen ist, und sagst mir, mit welchem Konto ich jetzt
angemeldet bin.`,
            },
            {
              label: "2. Veröffentlichen — damit geht deine Seite live",
              text: `Bring meine Website live. Wir nutzen dafür Vercel. Ich bin im
Terminal schon angemeldet, du kannst das Vercel-Werkzeug direkt
benutzen.

So gehst du vor:

1. Zeig mir zuerst, welche Projekte in meinem Vercel-Konto schon
   liegen. Wenn dort noch nichts ist, ist das richtig so.

2. Veröffentliche mein aktuelles Projekt als neues Projekt. Nimm
   den Namen meiner Firma als Projektnamen, klein geschrieben und
   mit Bindestrichen.

3. Wenn beim Veröffentlichen etwas schiefgeht, lies die
   Fehlermeldung, sag mir in einem Satz was los ist, und behebe es.
   Häufig sind es Kleinigkeiten im Code, die auf meinem Rechner
   nicht auffallen.

4. Wenn es steht, prüf selbst, ob die Seite unter der Adresse
   wirklich lädt — nicht nur, ob die Veröffentlichung durchgelaufen
   ist.

5. Gib mir die Adresse und sag mir in zwei Sätzen, wie ich künftig
   eine Änderung veröffentliche.

Nur anlegen und veröffentlichen. Lösch keine Projekte und ändere
keine Einstellungen an anderen Projekten in meinem Konto.`,
            },
          ],
          links: [
            {
              label: "Vercel — Konto erstellen",
              href: "https://vercel.com/signup",
              note: "kostenlos; am besten mit deinem GitHub-Konto anmelden",
            },
          ],
        },
      },
      {
        slug: "bewertungen-einbinden",
        title: "Deine Bewertungen auf die Website",
        description:
          "Google, Trustpilot & Co.: Claude holt deine echten Bewertungen über unsere API und baut sie ein — mit Quellen-Link und rechtssicherem Hinweis.",
        duration: 20,
        kind: "video",
        steps: [
          "Rechts oben steht dein persönlicher API-Schlüssel — er ist im Prompt schon eingesetzt. Behandle ihn wie ein Passwort.",
          "Deine Profile raussuchen: Google-Eintrag (Firmenname und Stadt reichen), Trustpilot- oder Tripadvisor-Link, falls vorhanden.",
          "Den Prompt kopieren, Profile eintragen, abschicken. Was du nicht hast, löschst du einfach raus.",
          "Claude holt die Bewertungen und zeigt dir die stärksten Zitate — du entscheidest, welche auf die Seite kommen.",
          "Eingebaut wird jede Bewertung mit Link zum Original und dem Echtheits-Hinweis darunter — das ist die rechtssichere Variante.",
        ],
        cheatSheet: {
          apiKeyHint: true,
          prompts: [
            {
              label: "Der Bewertungs-Prompt — Profile eintragen, dein Schlüssel steckt schon drin",
              text: `Hol meine echten Kundenbewertungen und bau sie in meine Website
ein.

MEINE PROFILE (was es nicht gibt, einfach rauslöschen):
- Google: {FIRMENNAME-UND-STADT-ODER-LINK-ZUM-EINTRAG}
- Trustpilot: {DEINE-DOMAIN-AUF-TRUSTPILOT}
- Tripadvisor: {LINK-ZU-DEINEM-EINTRAG}

MEIN ZUGANG
Wir nutzen die Bewertungs-API meiner Kursplattform.
Adresse: {PLATTFORM-URL}/api/bewertungen
Anmeldung: Kopfzeile "Authorization: Bearer {DEIN-API-KEY}"

So funktioniert sie:
- POST mit JSON { "pfad": "...", "daten": [...] } — pfad ist ein
  business_data-Endpunkt von DataForSEO, deren Doku liest du hier:
  https://docs.dataforseo.com/v3/business_data/
- Ablauf je Plattform: Aufgabe mit task_post anlegen, kurz warten,
  mit tasks_ready nachsehen und mit task_get abholen.
- GET auf dieselbe Adresse zeigt dir meinen Verbrauch und mein
  Monatslimit. Geh sparsam mit Abfragen um: erst denken, dann
  abfragen — und bleib deutlich unter dem Limit.

SO GEHST DU VOR
1. Hol zu jedem Profil oben alle Bewertungen: Text, Sterne, Name,
   Datum und den Link zur Originalbewertung.
2. Zeig mir eine Übersicht: Anzahl und Durchschnitt pro Plattform,
   dazu die fünf stärksten Zitate. Zeig mir auch die schlechten —
   ich entscheide, wie wir damit umgehen.
3. Frag mich, welche Bewertungen auf die Website sollen und wohin:
   Startseite, eigene Bewertungsseite oder beides.
4. Bau den Bewertungsbereich: Zitat, Sterne, Vorname, Datum und die
   Quelle als Link zur Originalbewertung auf der Plattform.
5. Direkt darunter setzt du diesen Hinweis, angepasst an die
   Plattformen, die wir wirklich zeigen:
   "Diese Bewertungen stammen unverändert von Google und
   Trustpilot. Wir prüfen sie nicht selbst — jeder Link führt zur
   Originalbewertung."

REGELN
- Nur echte Bewertungen, wortgleich übernommen. Nichts umschreiben,
  nichts erfinden, keine Namen dazudichten. Auch Tippfehler der
  Kunden bleiben drin — die machen es glaubwürdig.
- Volle Nachnamen kürzt du auf den ersten Buchstaben ab.
- Wenn du ein Profil nicht findest, sag es mir, statt zu raten.
- Der API-Schlüssel bleibt in diesem Chat. Schreib ihn in keine
  Datei meines Projekts.`,
            },
          ],
        },
      },
      {
        slug: "anfragen-empfangen",
        title: "Das Anfrage-Formular",
        description:
          "Der Bogen, über den Kunden dich erreichen — plus deine eigene kleine Admin-App unter /admin, in der jede Anfrage ihre Stufe hat: neu, in Bearbeitung, Angebot raus, Termin steht.",
        duration: 20,
        kind: "video",
        steps: [
          "Ersten Prompt schicken. Claude fragt dich, welche Felder rein sollen — dann baut er den Bogen, passend zum Rest deiner Seite.",
          "Anschauen am Rechner und auf dem Handy. Der Absende-Knopf läuft hier noch ins Leere, das ist so gewollt.",
          "Zweiten Prompt schicken. Claude fragt dich, welche Pipeline-Stufen zu deinem Betrieb passen.",
          "Stufen bestätigen — dann baut er deine Admin-App unter /admin: mit Passwort, Zahlen und den Anfragen als Karten in Spalten.",
          "Testanfrage abschicken, in der Admin-App eine Stufe weiterschieben, Seite neu laden — der Status muss bleiben.",
        ],
        cheatSheet: {
          prompts: [
            {
              label: "1. Das Formular — nur der Bogen, noch ohne Anschluss",
              text: `Bau ein Anfrage-Formular in meine Website ein.

Erstmal nur den Bogen selbst: wie er aussieht, was drinsteht, wie er
sich anfühlt. Angeschlossen wird er im nächsten Schritt — bau also
noch keine Speicherung und verschick noch keine Mails.

SCHRITT 1 — Frag mich, welche Felder rein sollen
Mach mir einen Vorschlag und begründe ihn kurz. Meine Faustregel:
nur, was du brauchst, um mich zurückrufen zu können. Jedes Feld
mehr kostet Anfragen.

SCHRITT 2 — Bau den Bogen
- Er soll aussehen wie der Rest meiner Seite: gleiche Farben,
  gleiche Schrift, gleiche Ecken, gleiche Abstände.
- Überschrift und ein, zwei Sätze darüber, die zum Anfragen
  einladen — in meinem Ton, keine Floskeln.
- Wenn es zur Seite passt, ein Bild daneben: ich bei der Arbeit,
  mein Team oder mein Firmenwagen. Sag mir, welches Bild aus meinem
  Bilder-Ordner du nehmen würdest, oder ob es ohne besser wirkt.
- Pflichtfelder werden geprüft, bevor abgeschickt wird — mit
  freundlichen deutschen Hinweisen direkt am Feld, nicht als
  Fehlerblock oben.
- Telefonnummer und E-Mail nur grob prüfen. Lieber eine Anfrage mit
  krummer Nummer als eine abgewiesene echte Anfrage.
- Während des Absendens ist der Knopf gesperrt und zeigt, dass etwas
  passiert. Doppelklick darf keine zwei Anfragen auslösen.
- Danach sieht der Kunde eine klare Bestätigung auf der Seite: dass
  die Anfrage da ist und wann ich mich melde. Keine leere Seite,
  kein Sprung nach oben.
- Ein verstecktes Feld gegen Werbemüll: Füllt ein Roboter es aus,
  wird die Anfrage still verworfen.
- Pflicht-Häkchen für den Datenschutzhinweis, verlinkt auf meine
  Datenschutzseite. Die gibt es noch nicht und du baust sie AUCH
  NICHT — Impressum und Datenschutz machen wir später gemeinsam in
  einem eigenen Schritt. Setz den Link trotzdem schon, auch wenn er
  vorerst ins Leere zeigt, und erinner mich am Ende in einem Satz
  daran, dass das noch offen ist.
- Auf dem Handy: große Felder, richtige Tastatur je Feld (Zahlen bei
  Telefon, @ bei E-Mail), nichts, wofür man zoomen muss.

SCHRITT 3 — Zeig ihn mir
Zeig mir den fertigen Bogen am Rechner und auf dem Handy. Der
Absende-Knopf darf noch ins Leere laufen — sag mir nur klar, dass er
noch nicht angeschlossen ist, damit ich mich nicht wundere.`,
            },
            {
              label: "2. Deine Admin-App — Anfragen sehen und nachhalten",
              text: `Jetzt schließen wir das Formular an und bauen mir eine kleine
Admin-App dazu.

TEIL 1 — Die Anfragen müssen irgendwo landen
Leg eine Empfangsstelle im Projekt an, die jede Anfrage mit Datum
und Uhrzeit speichert.

TEIL 2 — Die Admin-App
Erreichbar unter /admin. Nirgends auf der Website verlinkt — weder
im Menü noch im Fußbereich noch in der Sitemap. Setz sie außerdem
auf "noindex", damit Google sie nicht in den Suchergebnissen zeigt.

PASSWORT — nicht optional
Nicht verlinkt heißt nicht geschützt: Wer die Adresse errät, sieht
sonst die Namen, Telefonnummern und Adressen meiner Kunden. Das sind
personenbezogene Daten, dafür hafte ich.

Bau deshalb einen einfachen Passwortschutz davor. Das Passwort kommt
in die Umgebungsvariablen, nicht in den Code. Denk dir eins aus, sag
es mir, und erinner mich daran, es in meinem Passwort-Manager zu
speichern. Ohne richtiges Passwort ist unter /admin nichts zu sehen —
auch keine Zahlen.

ZAHLEN OBEN
- Anfragen heute
- Anfragen diese Woche
- Anfragen gesamt
- wie viele davon noch unbearbeitet sind

DIE PIPELINE — das Herzstück
Jede Anfrage hat einen Status. Frag mich ZUERST, welche Stufen zu
meinem Betrieb passen, und schlag mir diese vor:

  neu → in Bearbeitung → Angebot geschickt → Termin vereinbart
  → gewonnen / verloren

Ich kann Stufen streichen, umbenennen oder eigene ergänzen. Erst
wenn ich bestätigt habe, baust du.

Bau die Anfragen dann als Pipeline: die Stufen nebeneinander als
Spalten, jede Anfrage als Karte in ihrer Spalte. Ich will eine Karte
von einer Stufe in die nächste schieben oder per Auswahlfeld
umstellen können — nimm das, was auf dem Handy zuverlässiger
funktioniert, und sag mir, warum du dich so entschieden hast.

Auf jeder Karte: Datum, Name, Telefonnummer, E-Mail, worum es geht.
Telefonnummer und E-Mail als anklickbare Verweise, damit ich vom
Handy aus direkt anrufen kann. Karte antippen zeigt die ganze
Nachricht. Dazu ein Notizfeld pro Anfrage, in das ich reinschreiben
kann, was besprochen wurde.

Gewonnen und verloren blende ich normalerweise aus — die hole ich
mir über einen Schalter dazu.

Halt es schlicht: Das ist mein Arbeitswerkzeug, kein Schaufenster.
Gut lesbar auf dem Handy ist wichtiger als schön.

TEIL 3 — Selbst testen
Schick eine echte Testanfrage über das Formular ab. Dann ruf /admin
auf — einmal ohne Passwort, einmal mit — und zeig mir, dass die
Anfrage dort in der Spalte "neu" steht. Schieb sie einmal eine Stufe
weiter und lad die Seite neu: Der Status muss erhalten bleiben.`,
            },
          ],
        },
      },
      {
        slug: "rechtstexte-barrierefreiheit",
        title: "Rechtstexte & Barrierefreiheit",
        description:
          "Impressum und Datenschutz ohne Anwaltstermin: Der Skill durchsucht dein Projekt, erkennt deine Dienste und schreibt daraus die passenden Seiten — plus die ehrliche Einordnung zur Abmahn-Panik.",
        duration: 18,
        kind: "video",
        steps: [
          "Den Skill installieren — Befehl rechts, einmalig. Claude Code danach einmal neu starten.",
          "Den Prompt schicken. Claude durchsucht dein Projekt und zeigt dir, welche Dienste er gefunden hat: Formular, Hosting, Schriften, Karten, WhatsApp.",
          "Die Liste bestätigen oder korrigieren — nur was du wirklich nutzt, kommt in die Texte.",
          "Fünf Fragen beantworten, die im Code nicht stehen: Rechtsform, Anschrift, Kontakt, Steuernummer, Berufsangaben.",
          "Claude baut /impressum und /datenschutz im Stil deiner Seite und verlinkt sie im Fußbereich. Am Ende bekommst du eine Liste, was du noch selbst erledigen musst.",
        ],
        cheatSheet: {
          prompts: [
            {
              label: "Den Rechtstexte-Skill installieren — ins Terminal, Mac wie Windows gleich",
              text: `npx skills add mariusmariusmariusmariusmarius/rechtstexte-de --global --yes`,
            },
            {
              label: "Der Rechtstexte-Prompt — Claude liest dein Projekt und fragt den Rest",
              text: `Erstelle die Rechtstexte für diese Website. Nutz dafür den Skill
„rechtstexte-de".

Wichtig dabei:

- Durchsuch zuerst mein Projekt und zeig mir als Tabelle, welche
  Dienste du gefunden hast — Hosting, Formular, Schriften,
  Karten, WhatsApp, Tracking. Ich bestätige oder streiche, bevor
  du schreibst.
- Nimm NUR auf, was ich wirklich einsetze. Keine Bausteine für
  Dienste, die ich nicht nutze, und nichts weglassen, was ich nutze.
- Stell mir dann die Fragen, die im Code nicht stehen können —
  gesammelt in einer Nachricht, nicht einzeln.
- Erfinde nichts. Keine ausgedachte Steuernummer, keine geratene
  Handelsregisternummer, keine erfundene Aufsichtsbehörde. Was du
  nicht von mir hast, bleibt als deutlich markierte Lücke stehen,
  und du fragst mich am Ende gesammelt danach.
- Bau /impressum und /datenschutz im Stil meiner Seite und verlink
  beide im Fußbereich, sodass sie von jeder Seite aus in maximal
  zwei Klicks erreichbar sind. Der Link im Datenschutz-Häkchen
  meines Anfrage-Formulars zeigt bisher ins Leere — der muss jetzt
  auf die neue Seite zeigen.
- Setz ein Stand-Datum unter jede Seite.
- Gib mir am Ende eine Checkliste: was erledigt ist, und was ich
  selbst noch tun muss.

Und sag mir zum Schluss in einem Satz, was diese Texte sind und was
sie nicht sind.`,
            },
          ],
        },
      },
      {
        slug: "domain-verbinden",
        title: "Domain verbinden",
        description:
          "Domain unten anschließen, Nameserver beim Registrar eintragen — ab dann verwaltet Claude deine DNS-Einträge mit deinem eigenen Token. Egal, wo deine Domain liegt.",
        duration: 12,
        kind: "video",
        dnsTool: true,
        domainCheck: true,
        steps: [
          "Deine Domain unten in die Box eintragen und auf Anschließen klicken — du bekommst zwei Nameserver und dein DNS-Token.",
          "Beim Registrar (wo deine Domain liegt) die zwei Nameserver eintragen. Bei All-Inkl: Members-Bereich, wie in Lektion 1.4. Das machst du genau einmal.",
          "Warten, bis der Status in der Box auf aktiv springt — das dauert Minuten bis ein paar Stunden.",
          "Den Prompt rechts kopieren, Domain und Token einsetzen, an Claude schicken — er verbindet die Domain mit deiner Vercel-Seite samt Zertifikat.",
          "Deine E-Mails bleiben unberührt: Bestehende Mail-Einträge fasst Claude nicht an.",
        ],
        cheatSheet: {
          prompts: [
            {
              label: "Der Domain-Prompt — Domain und Token aus der Box einsetzen",
              text: `Verbinde meine Domain mit meiner Website.

Meine Domain: {DEINE-DOMAIN}
Mein DNS-Token: {TOKEN-AUS-DER-BOX}

Das Token ist ein Cloudflare-Token und darf ausschließlich die
DNS-Einträge meiner Domain ändern. Benutz die Cloudflare-API
(api.cloudflare.com/client/v4, Kopfzeile "Authorization: Bearer …",
Zone über /zones?name=… finden).

So gehst du vor:

1. Prüf zuerst, ob die Zone schon auf "active" steht. Wenn nicht,
   sind die Nameserver beim Registrar noch nicht durch — sag mir
   das, erklär mir kurz, wie ich es prüfen kann, und hör hier auf.

2. Zeig mir die bestehenden DNS-Einträge, BEVOR du irgendetwas
   änderst.

3. Verbinde die Domain mit meinem Vercel-Projekt: Ich bin im
   Terminal bei Vercel angemeldet, füg die Domain dort dem Projekt
   hinzu. Dann setz die Einträge:
   - A-Eintrag für die nackte Domain auf 76.76.21.21
   - CNAME für www auf cname.vercel-dns.com
   Beide als "DNS only" — den orangenen Cloudflare-Proxy lässt du
   AUS, sonst klemmt das Zertifikat.

4. Warte, bis das Zertifikat da ist, und prüf selbst, ob die Seite
   unter https://… wirklich lädt — mit und ohne www.

5. E-Mail: Bestehende MX-, SPF- und Mail-Einträge lässt du exakt so,
   wie sie sind. Fehlen MX-Einträge komplett und meine Postfächer
   liegen bei All-Inkl, frag mich, bevor du welche setzt.

Nur diese Einträge anlegen. Nichts löschen, nichts überschreiben
ohne mein ausdrückliches Ja.`,
            },
            {
              label: "Kurz: nur die DNS-Einträge zeigen",
              text: `Sag mir, welche DNS-Einträge ich brauchen, damit meine Domain
auf meine Website zeigt.

Meine Domain: {DEINE-DOMAIN}

Gib mir nur eine Tabelle mit Typ, Name, Ziel und Proxy-Einstellung —
einmal für die Domain ohne www und einmal mit www. Keine langen
Erklärungen, ich trage sie selbst ein.`,
            },
          ],
        },
      },
      {
        slug: "firmen-email-anlegen",
        title: "Deine Firmen-E-Mail",
        description:
          "info@deine-firma.de statt gmx: Claude legt dir die Postfächer an, setzt die nötigen Einträge und richtet alles fürs Handy ein — mit dem Schlüssel aus dieser Lektion.",
        duration: 15,
        kind: "video",
        steps: [
          "Kurz prüfen: Läuft für deine Domain schon Mail? Wenn ja, überspring diese Lektion — dein Postfach bleibt, wie es ist.",
          "Den Prompt rechts kopieren, deine Domain eintragen. Der Schlüssel steckt schon drin.",
          "Claude legt die Postfächer an und setzt die Einträge, damit Mail ankommt und rausgeht.",
          "Die Zugangsdaten sofort in den Passwort-Manager. Du brauchst sie gleich fürs Handy.",
          "Postfach auf dem Handy einrichten — Claude sagt dir die Serverdaten.",
        ],
        cheatSheet: {
          apiKeyHint: true,
          prompts: [
            {
              label: "Der Postfach-Prompt — Domain eintragen, dein Schlüssel steckt drin",
              text: `Leg mir Postfächer für meine Firmen-Domain an.

Meine Domain: {DEINE-DOMAIN}

WICHTIG ZUERST
Für diese Domain läuft noch keine Mail — wir richten sie neu ein.
Prüf das bitte trotzdem: Gibt es schon MX-Einträge, sag mir das und
hör auf, bevor du irgendetwas änderst. Eine Umstellung würde sonst
meine bisherige Post umleiten.

SO FUNKTIONIERT DAS (damit du nichts nachschlagen musst)
Die Postfächer liegen bei Migadu. Der Zugang läuft über den Schlüssel
der Kursplattform — den Migadu-Schlüssel selbst bekomme ich nie zu
sehen, meine Plattform spricht für mich mit Migadu. Sie lässt dabei
nur Domains durch, die zu meinem Konto gehören.

MEIN ZUGANG
Adresse: {PLATTFORM-URL}/api/mail
Anmeldung: Kopfzeile "Authorization: Bearer {DEIN-API-KEY}"

- POST { "aktion": "domain",   "domain": "..." }
- POST { "aktion": "postfach", "domain": "...", "adresse": "info",
         "name": "Firmenname", "passwort": "..." }
- POST { "aktion": "alias",    "domain": "...", "alias": "kontakt",
         "ziele": ["info@..."] }
- GET  auf dieselbe Adresse zeigt meine Domains und Postfächer.

SCHRITT 1 — Anlegen
Leg meine Domain an, dann zwei Postfächer: info@ und eins mit meinem
Vornamen. Frag mich vorher, wie mein Firmenname als Absender
erscheinen soll.
Denk dir sichere Passwörter aus, mindestens 16 Zeichen, ohne
Sonderzeichen, die man auf dem Handy schwer tippt.

SCHRITT 2 — Einträge setzen
Damit die Postfächer Mail empfangen und senden dürfen, brauchen sie
diese Einträge. Meine DNS läuft über die Kursplattform, ich gebe dir
mein DNS-Token.

  MX    @   aspmx1.migadu.com   Priorität 10
  MX    @   aspmx2.migadu.com   Priorität 20
  TXT   @   v=spf1 include:spf.migadu.com -all
  CNAME key1._domainkey   key1.MEINE-DOMAIN._domainkey.migadu.com
  CNAME key2._domainkey   key2.MEINE-DOMAIN._domainkey.migadu.com
  CNAME key3._domainkey   key3.MEINE-DOMAIN._domainkey.migadu.com

Alle ohne Cloudflare-Proxy (DNS only). MEINE-DOMAIN ersetzt du durch
meine echte Domain.

Zeig mir die Einträge kurz, bevor du sie setzt. Prüf danach per
DNS-Abfrage, ob sie greifen, und sag mir, wenn Migadu die Domain
weiterhin als inaktiv führt.

SCHRITT 3 — Übergeben
Gib mir eine Tabelle mit Adresse, Passwort und den Daten fürs Handy.
Die Serverdaten sind bei Migadu für alle gleich:

  Posteingang (IMAP): imap.migadu.com, Port 993, SSL
  Postausgang (SMTP): smtp.migadu.com, Port 465, SSL
  Benutzername: die volle E-Mail-Adresse

Erinner mich daran, die Passwörter im Passwort-Manager zu speichern.
Sag mir zum Schluss in drei Schritten, wie ich das Postfach aufs
Handy hole — und dass ich dabei IMAP nehme, niemals POP3.

Nur anlegen. Lösch nichts und ändere keine Einträge, die nichts mit
Mail zu tun haben.`,
            },
          ],
        },
      },
      {
        slug: "anfragen-per-mail",
        title: "Anfragen landen im Postfach",
        description:
          "Die Kette wird geschlossen: Jede Anfrage löst zwei Mails aus — eine Bestätigung an den Kunden, eine Benachrichtigung an dich. Verschickt über dein eigenes Postfach aus der letzten Lektion.",
        duration: 18,
        kind: "video",
        mailPrompt: true,
        resendPrompt: true,
        steps: [
          "Im selben Chat weitermachen wie bei den Postfächern — Claude kennt dein Postfach dann schon.",
          "Im Baukasten unten die Adressen anklicken und in einem Satz sagen, was in der Bestätigung stehen soll.",
          "Prompt kopieren, abschicken — Claude baut beide Mails ein und verschickt über dein Postfach.",
          "Lieber einen Versanddienst? Dann den Resend-Prompt rechts nehmen — Konto und API-Key erstellst du bei Resend, den Schlüssel setzt du oben im Prompt ein.",
          "Testanfrage abschicken. Beide Mails müssen ankommen und dürfen nicht im Spam landen.",
        ],
        cheatSheet: {
          prompts: [
          ],
          links: [
            {
              label: "Resend — Konto erstellen",
              href: "https://resend.com/signup",
              note: "kostenlos: 3.000 Mails im Monat, 100 am Tag — Schlüssel unter API Keys",
            },
          ],
        },
      },
      {
        slug: "seo-audit",
        title: "Der große SEO-Audit",
        description:
          "Einmal alles auf den Tisch: Claude durchleuchtet deine Seite von A bis Z — Technik, Inhalte, Bilder, lokale Sichtbarkeit, Keywords, Konkurrenz — und legt dir eine Liste hin, die du abarbeiten kannst.",
        duration: 30,
        kind: "video",
        seoPrompt: true,
        steps: [
          "Prüfen, ob die SEO-Skills da sind — sie kommen mit dem Setup-Paket. Falls nicht: die zwei Befehle rechts.",
          "Claude Code einmal neu starten, damit er die neuen Skills kennt.",
          "Am Regler rechts dein Einzugsgebiet einstellen — von 10 km bis Europa. Der Prompt passt sich von selbst an.",
          "Die Fundliste durchgehen: Sie ist nach Wirkung sortiert, oben steht, was am meisten bringt.",
          "Nichts sofort umsetzen. Erst lesen, dann entscheiden, was du zuerst angehst — abgearbeitet wird in den nächsten Lektionen.",
        ],
        cheatSheet: {
          apiKeyHint: true,
          prompts: [
            {
              label: "Die SEO-Skills installieren — beide Zeilen, Mac wie Windows gleich (im Setup-Paket schon dabei)",
              text: `npx skills add agricidaniel/claude-seo --global --yes
npx skills add mariusmariusmariusmariusmarius/akademie-seo-daten --global --yes`,
            },
            {
              label: "Der Audit-Prompt — Domain eintragen, dann arbeitet Claude",
              text: `Mach einen vollständigen SEO-Audit für meine Website.

Meine Domain: {DEINE-DOMAIN}
Mein Einzugsgebiet: {EINZUGSGEBIET}

Branche, Leistungen und Standort stehen auf meiner Website — zieh dir
das selbst aus dem Projekt, das musst du mich nicht fragen. Das
Einzugsgebiet oben ist das Einzige, was nirgends steht.

MEIN ZUGANG ZU LIVE-SEO-DATEN
Suchvolumen, Rankings und Konkurrenzdaten stehen nicht auf meiner
Website — die holst du über die Kursplattform. Nutz dafür den Skill
„akademie-seo-daten": Der kennt alle Bereiche, die geprüften Abfragen
und die Kosten. Zur Sicherheit hier das Wichtigste:

Adresse: {PLATTFORM-URL}/api/bewertungen
Anmeldung: Kopfzeile "Authorization: Bearer {DEIN-API-KEY}"
POST mit { "pfad": "...", "daten": [...] } — dahinter steckt
DataForSEO, Doku: https://docs.dataforseo.com

DIESE ABFRAGEN SIND GEPRÜFT — nimm sie so, such nichts anderes:

  Seite prüfen (Technik, Meta, Score)        ~0,0002 USD
    pfad: "on_page/instant_pages"
    daten: [{"url":"https://meine-seite.de/unterseite"}]

  Meine Rankings                             ~0,013 USD
    pfad: "dataforseo_labs/google/ranked_keywords/live"
    daten: [{"target":"meine-domain.de","location_code":2276,
             "language_code":"de","limit":50}]

  Keyword-Ideen mit Suchvolumen              ~0,013 USD
    pfad: "dataforseo_labs/google/keyword_suggestions/live"
    daten: [{"keyword":"heizung reparatur","location_code":2276,
             "language_code":"de","limit":50}]

  Wer ist meine Konkurrenz                   ~0,012 USD
    pfad: "dataforseo_labs/google/competitors_domain/live"
    daten: [{"target":"meine-domain.de","location_code":2276,
             "language_code":"de","limit":10}]

location_code 2276 ist Deutschland, language_code "de".
Die Antwort steckt in tasks[0].result[0].items — status_code 20000
heißt in Ordnung.

GEH SPARSAM DAMIT UM
Seiten prüfen kostet fast nichts, da darfst du großzügig sein. Eine
Ranking- oder Keyword-Abfrage kostet rund achtzigmal so viel wie eine
Seite. Also: nur nötige Abfragen, mehrere parallel starten statt
nacheinander zu warten, nie dieselbe zweimal.

Finger weg von "keywords_data/google_ads/search_volume" — das kostet
0,09 USD pro Abfrage, also das Siebenfache. Suchvolumen bekommst du
günstiger über keyword_suggestions oben.

Ein GET auf dieselbe Adresse zeigt meinen Verbrauch und mein
Monatslimit. Schau am Ende nach und sag mir, was der Audit gekostet
hat.

Nutz die installierten SEO-Skills. Der Rundum-Audit ist „seo-audit" —
der verteilt selbst an Spezialisten. Zieh je nach Befund dazu:
„seo-technical", „seo-local", „seo-maps", „seo-images", „seo-schema",
„seo-sitemap", „seo-content", „seo-backlinks", „seo-geo" für die
KI-Suche und „seo-page" für einzelne Seiten.

Für die Auswertung und die Empfehlungen am Ende außerdem:
- „seo-plan" — um die Funde zu einem Fahrplan zu ordnen
- „seo-cluster" — welche Themen zusammengehören und welche Seiten
  sich Suchbegriffe streitig machen
- „seo-competitor-pages" — welche Seiten die Konkurrenz hat, die mir
  fehlen
- „seo-content-brief" — für die wichtigsten fehlenden Seiten gleich
  eine Gliederung vorschlagen (nur vorschlagen, nicht bauen)
- „seo-hreflang" — nur falls meine Website mehrsprachig ist

Die übrigen Skills aus dem Paket nimmst du nur, wenn ihr Thema
wirklich auftaucht.
Arbeite gründlich — ich will lieber zehn Minuten warten als eine
oberflächliche Liste.

WAS ICH GEPRÜFT HABEN WILL

Technik
- Ist die Seite für Google auffindbar und indexierbar? robots.txt,
  Sitemap, Weiterleitungen, Statuscodes.
- Ladezeit und Core Web Vitals, getrennt für Handy und Rechner.
- HTTPS, saubere Adressen, Handy-Tauglichkeit.

Auffindbarkeit auf jeder Seite
- Meta-Titel und Beschreibung: vorhanden, richtige Länge, nicht
  doppelt, mit dem Ort drin?
- Überschriftenstruktur: genau eine H1, sinnvolle Reihenfolge.
- Favicon vorhanden und in allen Größen?
- Open-Graph-Bild und -Text — was sieht man, wenn jemand meine Seite
  bei WhatsApp oder Facebook teilt? Zeig mir, wie die Vorschau
  aussieht.

Bilder
- Alt-Texte, Dateigrößen, moderne Formate, Bildmaße.
- Sprechende Dateinamen statt IMG_4711.

Strukturierte Daten
- Sind meine Firmendaten für Google maschinenlesbar hinterlegt
  (LocalBusiness): Name, Adresse, Telefon, Öffnungszeiten,
  Leistungen, Bewertungen?

Lokal
- Wie stehe ich für mein Einzugsgebiet da? Google-Unternehmensprofil,
  Einheitlichkeit von Name, Adresse und Telefonnummer, Bewertungen.
- Welche Ortsbezüge fehlen auf der Website?

KI-Suche
- Werde ich von KI-Suchen wie ChatGPT oder Perplexity gefunden und
  zitiert? Was fehlt dafür — llms.txt, klare Fakten, Quellenlage?

Keywords und Konkurrenz
- Wonach suchen meine Kunden wirklich? Gib mir die wichtigsten
  Suchbegriffe mit Suchvolumen und Schwierigkeit.
- Wer steht bei diesen Begriffen vor mir, und warum?
- Welche Seiten fehlen mir, die meine Konkurrenz hat?

SO WILL ICH DAS ERGEBNIS
1. Eine Gesamtnote mit einem Satz Begründung.
2. Eine Liste aller Funde, sortiert nach Wirkung: was bringt am
   meisten, was ist Kosmetik. Pro Punkt: was ist das Problem, warum
   ist es eins, was wäre zu tun, und wie aufwendig ist es.
3. Die fünf Dinge, die ich als Erstes angehen sollte.

Ändere noch NICHTS an meiner Website. Ich will erst die Liste sehen
und selbst entscheiden. Erfinde keine Zahlen — wenn du etwas nicht
messen kannst, schreib das hin.`,
            },
          ],
        },
      },
      {
        slug: "programmatic-seo",
        title: "Lokale Landingpages: mehr Seiten, ohne Google zu verärgern",
        description:
          "Niemand sucht ‚Heizungsbauer' — gesucht wird ‚Heizung Reparatur Leverkusen'. Claude baut dir die Orts-Leistungs-Seiten, für die es echte Nachfrage gibt. Und nur die: Seiten ohne echten Inhalt sind gefährlicher als keine.",
        duration: 25,
        kind: "video",
        seoPrompt: true,
        steps: [
          "Am Regler rechts das Einzugsgebiet einstellen — daraus wird die Ortsliste.",
          "Prompt schicken. Claude zieht die Matrix Leistungen × Orte mit Suchvolumen — kostet ein paar Cent.",
          "Das Interview: Zu jeder Kombi fragt Claude, was du über diesen Ort weißt. Eine Referenz, eine Besonderheit, eine Anfahrtszeit — was dir nichts einfällt, wird nicht gebaut.",
          "Claude baut höchstens zehn Seiten, mit Übersichtsseite und Verlinkung. Gleiche Vorlage, aber jede Seite mit echtem Ortsbezug.",
          "Vier Wochen warten, dann Rankings prüfen. Erst wenn die ersten Seiten greifen, kommt die nächste Runde.",
        ],
        cheatSheet: {
          apiKeyHint: true,
          prompts: [
            {
              label: "Der Landingpage-Prompt — Einzugsgebiet am Regler, Rest macht Claude",
              text: `Bau mir lokale Landingpages für meine Leistungen — aber nur die,
für die es echte Nachfrage und echten Inhalt gibt.

Mein Einzugsgebiet: {EINZUGSGEBIET}

Meine Leistungen und meinen Standort liest du aus dem Projekt. Nutz
den Skill „seo-programmatic" für Aufbau und Schutzregeln und
„akademie-seo-daten" für die Zahlen.

MEIN ZUGANG ZU LIVE-SEO-DATEN
Adresse: {PLATTFORM-URL}/api/bewertungen
Anmeldung: Kopfzeile "Authorization: Bearer {DEIN-API-KEY}"
Keyword-Ideen samt Suchvolumen (~0,013 USD je Abfrage):
  pfad: "dataforseo_labs/google/keyword_suggestions/live"
  daten: [{"keyword":"LEISTUNG ORT","location_code":2276,
           "language_code":"de","limit":30}]
Eine Abfrage je Leistung reicht — die Orts-Varianten kommen mit.

SCHRITT 1 — Die Matrix
Nimm die Orte in meinem Einzugsgebiet (die größeren zuerst) und meine
Leistungen. Frag je Leistung die Suchbegriffe ab und bau mir eine
Tabelle: Leistung × Ort, Suchvolumen, Wettbewerb. Zeig sie mir.

Wichtig: Kleine Orte zeigen oft „0" Suchvolumen, obwohl dort gesucht
wird — die Zahl ist nur zu klein für die Statistik. Orte im
Einzugsgebiet bleiben deshalb in der Liste, markier sie als
„Nachfrage unbekannt".

SCHRITT 2 — Das Interview (Pflicht, nicht überspringen)
Geh die Kombis der Reihe nach durch und frag mich zu JEDEM Ort,
einen nach dem anderen:
- Hast du dort schon gearbeitet? Was genau?
- Gibt es etwas, das diesen Ort für meine Arbeit besonders macht —
  Altbau, Neubaugebiet, viele Ölheizungen, enge Straßen, was auch
  immer?
- Wie lange brauchst du dorthin?

Die Regel: KEINE ANTWORT, KEINE SEITE. Eine Seite, die sich von der
nächsten nur im Ortsnamen unterscheidet, wertet Google als leeren
Inhalt ab — und das kann meine ganze Domain nach unten ziehen. Lieber
fünf Seiten mit echtem Ortsbezug als fünfzig Hüllen.

SCHRITT 3 — Bauen, höchstens zehn
Aus den Kombis mit Nachfrage UND meinen Antworten baust du Seiten:
- Eine Vorlage, aber jede Seite mit dem echten Inhalt aus dem
  Interview — die Referenz, die Besonderheit, die Anfahrtszeit.
- Adresse nach dem Muster /leistung/ort, klein, mit Bindestrichen.
- Meta-Titel und Beschreibung je Seite mit Ort drin, eine H1.
- LocalBusiness-Daten auf jeder Seite, areaServed mit dem Ort.
- Eine Übersichtsseite „Einsatzgebiete", die alle verlinkt, und von
  jeder Seite zurück. Alle neuen Seiten in die Sitemap.
- Mein Anfrage-Formular auf jeder Seite, mit dem Ort vorausgefüllt.
Höchstens zehn Seiten in dieser Runde. Wenn mehr Kombis gut sind,
leg sie als Liste für später ab.

SCHRITT 4 — Ehrlich sein
Zeig mir am Ende:
- Welche Seiten du gebaut hast und warum genau diese.
- Welche Kombis du NICHT gebaut hast und was dafür fehlt.
- Was die Abfragen gekostet haben (GET auf die Adresse oben).

Setz noch nichts live, bevor ich alle Seiten gesehen habe. Erfinde
keine Referenzen, keine Zahlen, keine Ortsdetails — was nicht von mir
kommt, steht nicht auf der Seite.`,
            },
          ],
        },
      },
      {
        slug: "favicon-und-vorschaubild",
        title: "Favicon & Vorschaubild: Der erste Eindruck vor dem Klick",
        description:
          "Bevor jemand deine Seite sieht, sieht er zwei Dinge: das kleine Icon im Browser-Tab und die Vorschau, wenn dein Link bei WhatsApp landet. Beides bauen wir jetzt — das Favicon aus deinem Logo, das Vorschaubild erzeugt Claude selbst über Higgsfield.",
        duration: 20,
        kind: "video",
        steps: [
          "Der Audit hat es schon angemeckert: Favicon fehlt oder ist unvollständig, beim Teilen erscheint nichts oder das Falsche. Genau das räumen wir jetzt auf.",
          "Erster Prompt: Claude nimmt dein Logo aus dem Projekt und baut daraus alle Favicon-Größen — Browser-Tab, Handy-Startbildschirm, Google-Suchergebnis.",
          "Einmalig Higgsfield verbinden: auf claude.ai unter Einstellungen → Connectors nach Higgsfield suchen, hinzufügen, anmelden. Danach kann dein Claude selbst Bilder erzeugen — auch in Claude Code.",
          "Zweiter Prompt: Claude denkt sich das Motiv aus deiner Branche aus, erzeugt zwei Varianten direkt über Higgsfield und zeigt sie dir. Du wählst — er holt die Datei, schneidet sie zu und baut sie auf allen Seiten ein.",
          "Der Test: Schick dir den Link selbst per WhatsApp. Jetzt steht da dein Bild, dein Titel, deine Beschreibung — statt einem nackten Link.",
        ],
        cheatSheet: {
          prompts: [
            {
              label: "Der Favicon-Prompt — Claude baut alle Größen aus deinem Logo",
              text: `Bau mir ein vollständiges Favicon-Set aus meinem Logo.

Mein Logo liegt im Projekt — nimm die beste Version, die du findest,
am liebsten SVG oder das größte PNG. Ist kein Logo da, sag es mir,
bevor du irgendetwas erfindest.

WAS ICH BRAUCHE
- favicon.ico für alte Browser
- PNG in 16, 32, 48, 180 (Apple), 192 und 512 Pixeln
- Liegt das Logo als SVG vor: zusätzlich ein SVG-Favicon, das ist
  auf jedem Bildschirm scharf
- Ein Web-Manifest, damit die Seite auf dem Handy-Startbildschirm
  gut aussieht — mit meinem Firmennamen und meiner Markenfarbe
- Alles sauber im <head> eingebunden

WORAUF DU ACHTEN SOLLST
- Ein Favicon ist winzig. Besteht mein Logo aus Zeichen plus
  Schriftzug, nimm nur das Zeichen — Schrift ist bei 16 Pixeln
  nicht mehr lesbar. Zeig mir vorher, welchen Ausschnitt du nimmst.
- Prüf, wie es auf hellem UND dunklem Browser-Tab wirkt. Geht es
  auf einem von beiden unter, gib ihm einen dezenten Hintergrund
  mit abgerundeten Ecken.
- Fehlt dir ein Werkzeug zum Umrechnen der Bilder, installier es
  dir selbst — frag mich nicht nach dem Wie.

Zum Schluss: einmal bauen, prüfen, dass jede Datei wirklich
erreichbar ist, und mir sagen, wo ich das Icon jetzt überall sehe.`,
            },
            {
              label: "Der Vorschaubild-Prompt — Claude erzeugt das Bild über Higgsfield und baut es gleich ein",
              text: `Bau das Vorschaubild für meine Website — das Bild, das erscheint,
wenn jemand meinen Link bei WhatsApp, Facebook oder LinkedIn teilt.

Das Bild erzeugst du selbst: Higgsfield ist als Connector
angeschlossen. Siehst du ihn nicht, sag mir das sofort — dann fehlt
die Verbindung oder die Anmeldung — und fang nicht ohne ihn an.

SCHRITT 1 — Das Motiv
Denk dir das Motiv aus meiner Branche und meiner Arbeit aus — beides
steht auf meiner Website, zieh es dir aus dem Projekt. Regeln für
das Bild:
- Fotorealistisch, warmes Licht, wie von einem guten Fotografen —
  kein Comic, kein Hochglanz-Katalog.
- Querformat, das Wichtigste in der Mitte — die Ränder werden beim
  Teilen abgeschnitten.
- KEIN Text im Bild, keine Logos: KI-Schrift sieht falsch aus, und
  in der kleinen Vorschau liest sie ohnehin niemand.
- Keine erkennbaren Gesichter, keine fremden Marken.
Erzeug über Higgsfield zwei Varianten und zeig sie mir. Ich sag dir,
welche ich nehme — oder was anders soll.

SCHRITT 2 — Einbauen
Die gewählte Datei lädst du selbst herunter und legst sie ins
Projekt — ich fasse dabei nichts an.
- Auf 1200 × 630 Pixel zuschneiden und die Dateigröße unter 300 KB
  drücken, ohne dass man es sieht.
- Als Open-Graph-Bild einbauen — mit vollständiger Adresse
  (https://…), sonst zeigen WhatsApp und Facebook nichts an.
- Dazu auf jeder Seite: og:title und og:description, passend zur
  jeweiligen Seite statt überall gleich, und die Twitter-Karte im
  großen Format.

Zum Schluss sagst du mir, wie ich die Vorschau teste. Und warn
mich vor: WhatsApp merkt sich die Vorschau eine Weile — hab ich
den Link vorher schon mal verschickt, hilft beim Testen ein
Anhängsel wie ?v=2.`,
            },
          ],
        },
      },
      {
        slug: "anfragebogen-lead-friction",
        title: "Anfragebogen & Lead-Friction",
        description:
          "Das Formular steht — jetzt die Strategie: Wenig Felder bringen viele kalte Anfragen, mehr Felder wenige heiße. Wir bauen den Bogen um, der zu deinem Betrieb passt.",
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
        slug: "higgsfield-masterclass",
        title: "Higgsfield Masterclass: Animationen, die keiner sonst hat",
        description:
          "Der Schritt vom Bild zum Kino: Produkt-Animationen, Kamerafahrten durch den Betrieb, sprechende Presenter mit Lippensynchronisation, animierte Hero-Videos und Werbeclips für Social — alles aus Higgsfield, gesteuert über Claude. Damit sieht deine Seite aus wie von einer Agentur mit Filmteam.",
        duration: 35,
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
