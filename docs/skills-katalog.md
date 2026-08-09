# Skill-Katalog — recherchiert auf skills.sh (Stand: August 2026)

Alle Skills live von skills.sh gezogen (Install-Zahlen = echte Downloads).
Installation immer gleich: `npx skills add <owner/repo>` — das kommt genau so
ins Cheat Sheet der jeweiligen Lektion.

**Deine spontane Liste — alle gefunden ✓:** ui-ux-pro-max ✓, Designing
Beautiful Websites ✓, Higgs-Skills ✓, Stripe-Skills ✓, Vercel-Skills ✓,
Legal Page Generator ✓.

---

## Das Kern-Setup (Lektion 2.2 „Was sind Skills")

Die Standard-Liste, die JEDES Mitglied einmal installiert — danach baut
Claude besser als jeder Baukasten:

| Skill | Quelle | Installs | Was er macht |
|---|---|---|---|
| **find-skills** | `vercel-labs/skills` | 2,9 Mio. | Der Meta-Skill: findet selbstständig passende Skills — zuerst installieren |
| **frontend-design** | `anthropics/skills` | 758 K | Anthropics eigener Design-Skill — Grundqualität für jede Seite |
| **vercel-react-best-practices** | `vercel-labs/agent-skills` | 618 K | Sauberer React/Next-Code (dein „Vercel-Skills"-Punkt) |
| **web-design-guidelines** | `vercel-labs/agent-skills` | 528 K | Design-Leitplanken von Vercel |
| **design-taste-frontend** | `leonxlnx/taste-skill` | 341 K | Geschmack: verhindert den generischen KI-Look |
| **ui-ux-pro-max** | `nextlevelbuilder/ui-ux-pro-max-skill` | 308 K | Dein Favorit ✓ — UI/UX-Komplettpaket (bringt Zusatz-Skills mit: design-system, ui-styling) |
| **vercel-composition-patterns** | `vercel-labs/agent-skills` | 282 K | Saubere Komponenten-Struktur |
| **deploy-to-vercel** | `vercel-labs/agent-skills` | 105 K | Deployment-Ablauf für Lektion 2.9 |
| **designing-beautiful-websites** | `tristanmanchester/agent-skills` | 2,3 K | Dein zweiter Favorit ✓ |
| **Web-Quality-Paket** (seo + performance + accessibility) | `addyosmani/web-quality-skills` | 38/28/43 K | Drei auf einen Streich — von Chrome-Legende Addy Osmani |

---

## Modul 2: Website bauen mit Claude

**2.5 Copywriting:**
- **copywriting** — `coreyhaines31/marketingskills` (173 K) — das Standardwerk
- copywriting-hooks — `samber/cc-skills` (2,4 K) — Headlines/Hooks
- 💡 Dein Interview-Prompt ist hier das eigentliche Asset → Kandidat für einen **eigenen MM-Skill** (siehe unten)

**2.8 + 3.4 Higgsfield** (kommen automatisch mit MCP/CLI-Verbindung ✓, stehen aber auch auf skills.sh):
- **higgsfield-generate** — `higgsfield-ai/skills` (120 K)
- **higgsfield-product-photoshoot** (102 K) — perfekt für die Shop-Lektion 6.2!
- higgsfield-soul-id (101 K) — konsistente Personen/Charaktere
- higgsfield-websites (41 K), higgsfield-video-explainer (30 K)

**2.12 Landingpages:**
- landing-page-design — `magentosh/skills` (7,2 K)
- **landing-page-conversion-audit** — `autonnel/autonnel-skills` (5,8 K) — passt zu deinem A/B-Test-Ansatz
- landing-page-generator — `kostja94/marketing-skills` (1,3 K)

**2.14 Rechtstexte & Barrierefreiheit:**
- ⭐ **rechtstexte-de** — `mariusmariusmariusmariusmarius/rechtstexte-de` — **DEIN EIGENER SKILL, live!**
  Install: `npx skills add mariusmariusmariusmariusmarius/rechtstexte-de` —
  scannt das Projekt, Interview, erzeugt Impressum/Datenschutz/Widerruf,
  Consent-Matrix, BFSG-Check. Wird in Lektion 2.14 unterrichtet.
- legal-page-generator — `kostja94/marketing-skills` (1,1 K) — Konkurrenz, nur zur Beobachtung
- privacy-page-generator — `kostja94/marketing-skills` (1,1 K)
- legal-impressum — `dirnbauer/webconsulting-skills` (klein)
- bfsg-check — `waldo-van-der-code/deutsches-recht-mit-claude` (ganz neu/klein)
- ⚠️ **Ehrliche Einschätzung:** Der DACH-Legal-Bereich ist auf skills.sh
  schwach besetzt (alles unter 1,2 K Installs). Das ist eine **Marktlücke —
  und deine Chance** (siehe unten).

**2.15 PageSpeed:** performance — `addyosmani/web-quality-skills` (28 K, im Kern-Setup)

---

## Modul 3: Leads & Automation

- **resend** + resend-cli — `resend/resend-skills` (14 K / 6 K) — **offiziell von Resend** ✓
- react-email — `resend/react-email` (7,8 K) — schöne Mail-Templates
- email-best-practices — `resend/email-best-practices` (7,1 K) — Zustellbarkeit (passt auch zu Lektion 1.4!)
- integrate-whatsapp — `gokapso/agent-skills` (3,1 K) — für Lektion 3.5

## Modul 4: SEO & Google

**Keyword-Daten (statt SEMrush — Lektion 4.2):**
- **google-ads-api-mcp-setup** — `google/skills` — kostenloser Weg über den
  Keyword Planner (offiziell von Google)
- **dataforseo-toolkit** — `dataforseo/dataforseo-toolkit-skill` — offizieller
  Skill des Anbieters; dazu der DataForSEO-MCP-Server (Pay-as-you-go)
- seo-dataforseo — `agricidaniel/claude-seo` (3,8 K) — meistgenutzter
  Community-Skill dafür
- keyword-research — `aaron-he-zhu/seo-geo-claude-skills` (6,8 K)

**Allgemein:**
- **seo-audit** — `coreyhaines31/marketingskills` (182 K) — der große SEO-Skill
- **programmatic-seo** — `coreyhaines31/marketingskills` (116 K) — EXAKT dein Regional-Landingpages-Ansatz aus Lektion 4.4!
- **ai-seo** — `coreyhaines31/marketingskills` (105 K) — AI Overviews / ChatGPT-Suche (deine Frage aus dem Fragebogen)
- meta-tags-optimizer — `aaron-he-zhu/seo-geo-claude-skills` (5,1 K) — für Lektion 4.3
- seo-geo — `resciencelab/opc-skills` (40 K) — lokale Suche
- content-strategy — `coreyhaines31/marketingskills` — für die Blog-Lektion 4.8

## Modul 5: Ads & Marketing

- **paid-ads** + ads — `coreyhaines31/marketingskills` (55 K / 45 K)
- facebook/meta ads — `claude-office-skills/skills` (3,9 K)
- google-ads-manager — `claude-office-skills/skills` (5 K)
- **google-ads-api-mcp-setup** — `google/skills` (1,2 K) — **offiziell von Google!** Genau dein Wunsch aus Lektion 5.6 (Google Ads per MCP)
- **server-side-conversion-tracking** — `autonnel/autonnel-skills` (5,8 K) — Lektion 5.7
- conversion-optimization — `kostja94/marketing-skills` (1,1 K)
- **analytics-tracking** — `coreyhaines31/marketingskills` (58 K) — Lektion 5.7/4.7
- marketing-psychology — `coreyhaines31/marketingskills` — Bonus für Creatives (5.5)

## Modul 6: Onlineshop

- **stripe-best-practices** — `stripe/ai` (69 K) — **offiziell von Stripe** ✓ (dein Punkt)
- stripe-projects — `stripe/ai` (54 K), upgrade-stripe (57 K)
- E-Commerce-Legal: kostja94-Paket + ⚠️ gleiche DACH-Lücke wie bei 2.14

## Modul 7: Web-Apps, Server & Datenbank

- **neon-postgres** — `neondatabase/agent-skills` (79 K) — **offiziell von Neon** ✓
- neon-drizzle — `neondatabase/ai-rules` — falls ORM-Weg
- **better-auth-best-practices** — `better-auth/skills` (89 K) — der Auth-Skill für Lektion 7.1
- create-auth-skill (30 K), two-factor-authentication-best-practices (26 K), email-and-password-best-practices (29 K) — alle `better-auth/skills`

## Modul 8: Eigene Tools

- **gws-calendar** — `googleworkspace/cli` (51 K) — **offiziell von Google Workspace**: die Google-Kalender-Variante der Terminbuchung (Lektion 8.1) — damit ist deine offene Frage von neulich beantwortet ✓
- webhook automation — `claude-office-skills/skills` (3,7 K) — Lektion 7.3/8.2

---

## 💡 Die Chance: Eigene MM-Skills veröffentlichen

Zwei Lücken auf skills.sh sind exakt dein Terrain:

1. **DACH-Rechtstexte** (Impressum, Datenschutz, BFSG auf Deutsch) — nichts
   Etabliertes vorhanden. Ein `mariusmueller/rechtstexte-de`-Skill wäre
   sofort die Referenz — und jeder Install ist Werbung für deine Plattform
   (Skill-Beschreibung verlinkt auf mariuscoach).
2. **Dein Copywriting-Interview-Prompt** als Skill — dein Alleinstellungsmerkmal,
   öffentlich als Teaser, die Vollversion gibt's im Kurs.

Beides sind einfache Markdown-Dateien in einem GitHub-Repo — bau ich dir an
einem Nachmittag, sobald du die Inhalte freigibst.

## Nächster Schritt

Diese Liste fließt beim Videodreh in die **Cheat Sheets** der jeweiligen
Lektionen (Skill-Name + Install-Befehl + Ein-Satz-Erklärung). Vor dem Dreh
prüfen wir die Top-Kandidaten einmal praktisch durch — Install-Zahlen sagen
viel, aber nicht alles.
