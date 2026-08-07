# Marius Müller Media

Deine eigene Lernplattform (Skool-Alternative): Kurse, Community und
Account-Stufen — gebaut mit Next.js. **Aktueller Stand: Gerüst.** Alle
Seiten, Flows und die Freischaltungs-Logik stehen; externe Dienste (Neon,
Stripe, Resend) werden später angebunden.

**Live:** [mariuscoach.vercel.app](https://mariuscoach.vercel.app) — deployt
automatisch bei jedem Push über die Vercel-GitHub-Integration.

## Loslegen

```bash
npm install
npm run dev
```

Dann [http://localhost:3000](http://localhost:3000) öffnen.

## Demo-Zugänge

Solange keine echte Datenbank angebunden ist, gibt es eingebaute Test-Accounts:

| E-Mail                  | Passwort   | Stufe   | Besonderheit        |
| ----------------------- | ---------- | ------- | ------------------- |
| demo@mariusmueller.media     | demo123    | Free    | Nur Basics-Modul    |
| starter@mariusmueller.media  | starter123 | Starter | + Website & Leads   |
| pro@mariusmueller.media      | pro123     | Pro     | Alle Inhalte        |
| admin@mariusmueller.media    | admin123   | Pro     | + Admin-Bereich     |

Registrierung funktioniert ebenfalls (neue Accounts starten als Free),
gespeichert wird aber nur im RAM — nach einem Server-Neustart sind
selbstregistrierte Accounts weg.

Unter **Einstellungen → Account-Stufe** kannst du deine Stufe im Demo-Modus
direkt umstellen und live sehen, wie Inhalte frei-/gesperrt werden.

## Was schon steht

- **Landingpage** mit Curriculum, Community-Teaser, Preisen und Rechtstext-Seiten
- **Auth-Flow**: Login, Registrierung, Passwort-vergessen (Demo: Cookie-Session)
- **Mitgliederbereich** mit Sidebar-Navigation und Auth-Guard (serverseitig)
- **Kurse**: 7 Module, 31 Lektionen — Freischaltung je Account-Stufe
  (Free / Starter / Pro), serverseitig geprüft
- **Community**: Channels (inkl. Pro-Lounge), Posts, Antworten, Likes,
  Schreibrechte je Stufe
- **Einstellungen** (Profil, Stufe, Platzhalter für Zahlungen & E-Mails)
- **Admin-Bereich** (nur Rolle `admin`): Kennzahlen, Nutzerliste, Inhalte

## Architektur

```
src/
├── app/
│   ├── page.tsx              → Landingpage
│   ├── (auth)/               → Login, Registrieren, Passwort vergessen
│   ├── (app)/                → Geschützter Mitgliederbereich
│   │   ├── dashboard/        → Übersicht & Weiterlernen
│   │   ├── kurse/            → Module → Lektionen (Tier-Gating)
│   │   ├── community/        → Channels & Beiträge
│   │   ├── einstellungen/    → Profil & Account-Stufe
│   │   └── admin/            → Admin-Cockpit (rollenbasiert)
│   └── (legal)/              → Impressum, Datenschutz, AGB (Platzhalter!)
├── components/               → UI-Bausteine (Sidebar, Badges, Formulare …)
└── lib/
    ├── tiers.ts              → Account-Stufen + Freischaltungs-Logik
    ├── auth/                 → Demo-Auth (Session, Userstore, Server Actions)
    └── data/                 → Curriculum & Community (statisch, später DB)
```

## Später anbinden (bewusst noch nicht drin)

Die Austauschstellen sind im Code markiert und so geschnitten, dass der
Tausch lokal bleibt:

| Dienst     | Ersetzt                                        | Andockpunkt                          |
| ---------- | ---------------------------------------------- | ------------------------------------ |
| **Neon**   | In-Memory-Userstore, statisches Curriculum, Community-Mockdaten | `src/lib/auth/users.ts`, `src/lib/data/*` |
| **Auth.js / Lucia** | Unsigniertes Demo-Session-Cookie      | `src/lib/auth/session.ts`            |
| **Stripe** | Demo-Stufenwechsel in den Einstellungen        | `changeTierAction` in `src/lib/auth/actions.ts` |
| **Resend** | Passwort-vergessen ohne echten Mailversand     | `forgotPasswordAction`               |
| **Vercel** | Lokales `npm run dev`                          | Deployment                           |

## Wichtig vor dem Livegang

- ⚠️ Rechtstexte unter `(legal)/` sind **Platzhalter** — mit echten Angaben füllen
- ⚠️ Demo-Auth ersetzen (Passwörter werden aktuell im Klartext im RAM gehalten)
- ⚠️ Demo-Zugänge von der Login-Seite entfernen
