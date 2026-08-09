---
name: rechtstexte-de
description: >-
  Erzeugt Impressum, Datenschutzerklärung, Cookie-/Consent-Einschätzung,
  BFSG-Barrierefreiheits-Check und Shop-Rechtstexte für deutsche Websites.
  Scannt das Projekt, erkennt genutzte Dienste (Hosting, Formulare, Datenbank,
  Zahlungen, Tracking) und baut daraus passende Rechtsseiten. Use this skill
  whenever a user asks for Impressum, Datenschutzerklärung, Rechtstexte,
  privacy policy, legal pages, DSGVO/GDPR compliance, Cookie-Banner, BFSG,
  Widerrufsbelehrung or AGB for a German (DACH) website or online shop.
license: MIT
metadata:
  author: Marius Müller Media — https://mariuscoach.vercel.app
---

# Rechtstexte für deutsche Websites

Du erstellst vollständige, zum Projekt passende Rechtstexte für eine
deutsche Website. Arbeite in genau dieser Reihenfolge und überspringe
keinen Schritt.

## Grundregeln

- **Nur aufnehmen, was wirklich genutzt wird.** Eine Datenschutzerklärung,
  die Dienste nennt, die die Website gar nicht einsetzt, ist falsch — und
  eine, die genutzte Dienste verschweigt, auch. Der Scan (Schritt 1)
  entscheidet, welche Bausteine verwendet werden.
- **Deutsch, klar, ohne Juristendeutsch-Imitat.** Die Texte müssen korrekt
  sein, aber lesbar. Ton (Du/Sie) an die Website anpassen.
- **Stand-Datum** unter jede erzeugte Seite („Stand: {Monat Jahr}").
- **Kein Rechtsberatungs-Anspruch:** Weise den Nutzer am Ende IMMER darauf
  hin, dass die Texte sorgfältig erstellte Vorlagen sind, aber keine
  Rechtsberatung ersetzen.
- Referenzdateien in `references/` sind deine Wissensbasis. Lies immer die
  relevanten Dateien, bevor du Texte schreibst — erfinde keine Paragrafen
  aus dem Kopf.

## Schritt 1: Projekt scannen

Untersuche das Repository und erstelle eine Dienste-Liste. Suche gezielt:

| Was | Woran du es erkennst |
|---|---|
| Hosting Vercel | `vercel.json`, `.vercel/`, Next.js-Projekt, Nutzer-Aussage |
| Datenbank Neon/Postgres | `DATABASE_URL`, `@neondatabase/`, `pg`, Prisma/Drizzle-Config |
| E-Mail-Versand Resend | `resend` in package.json, `RESEND_API_KEY` |
| Zahlungen Stripe | `stripe` in package.json, `STRIPE_`-Env-Vars, Checkout-Code |
| Kontakt-/Anfrageformular | `<form>`, Form-Actions, API-Routen für Formulare |
| Meta Pixel | `fbq(`, `facebook`-Pixel-Snippets, Conversions API |
| Google Ads / Analytics / Tag | `gtag(`, `googletagmanager`, `GA_`-IDs |
| Vercel Web Analytics | `@vercel/analytics` |
| Google Fonts remote | `fonts.googleapis.com` im Code (lokal via `next/font` ist unkritisch) |
| WhatsApp-Button | `wa.me`-Links |
| Newsletter | Anmeldeformulare, Mailing-Dienste |
| Login/Accounts | Auth-Code, Session-Cookies |
| Onlineshop | Warenkorb, Checkout, Produktseiten |
| Externe Einbettungen | YouTube, Google Maps, iFrames von Drittanbietern |
| Buchungs-/Terminfunktion | Kalender-Code, Buchungs-Widgets |

Zeige dem Nutzer die erkannte Liste als kurze Tabelle und frage, ob etwas
fehlt oder wegfällt (z. B. „Meta Pixel geplant, aber noch nicht eingebaut?").

## Schritt 2: Interview — nur was der Code nicht weiß

Stelle NUR diese Fragen (kompakt, in einer Nachricht):

1. **Rechtsform?** (Einzelunternehmen, Freiberufler, GbR, UG, GmbH, e.K. —
   im Zweifel: „Steht auf deinem Briefpapier/Gewerbeschein")
2. **Vollständiger Name bzw. Firmierung + ladungsfähige Anschrift?**
   (Straße, keine Postfach-Adresse)
3. **Kontakt:** E-Mail-Adresse, Telefonnummer
4. **USt-IdNr. vorhanden?** (Format DE + 9 Ziffern; falls Kleinunternehmer:
   keine — dann weglassen)
5. **Nur falls zutreffend:** Handwerksbetrieb/erlaubnispflichtiges Gewerbe
   (→ zuständige Kammer), eingetragene Gesellschaft (→ Registergericht +
   Nummer), redaktioneller Blog (→ inhaltlich Verantwortlicher), Beruf mit
   gesetzlicher Berufsbezeichnung

Tipp an den Nutzer: Wer die Daten nicht parat hat, kann ein Foto vom
Kammer-Brief oder Gewerbeschein einfügen.

## Schritt 3: Texte erzeugen

1. Lies `references/impressum.md` → erzeuge das Impressum passend zur
   Rechtsform.
2. Lies `references/datenschutz-bausteine.md` → baue die
   Datenschutzerklärung aus Grundgerüst + genau den Bausteinen aus dem Scan.
3. Lies `references/cookies-consent.md` → entscheide: Consent-Banner nötig
   oder nicht? Wenn nötig und keins vorhanden: dem Nutzer sagen, was fehlt.
4. Bei Onlineshop: lies `references/shop-recht.md` → Widerrufsbelehrung,
   Widerrufsformular, Checkout-Prüfung (Button-Text!), Preisangaben.
5. Optional (auf Wunsch oder wenn Shop/Buchung B2C): lies
   `references/bfsg.md` → kurzer Barrierefreiheits-Check mit konkreten
   Befunden.

## Schritt 4: In die Website einbauen

- Erzeuge die Seiten `/impressum` und `/datenschutz` (bei Shops zusätzlich
  `/widerruf`, ggf. `/agb`) **im bestehenden Stil des Projekts** — gleiche
  Layout-Komponenten, gleiche Typografie, keine Fremdkörper-Optik.
- Prüfe, dass Footer-Links auf allen Seiten vorhanden sind (Impressum und
  Datenschutz müssen von jeder Seite mit maximal zwei Klicks erreichbar
  sein — üblich: Footer).
- Kein `noindex` nötig, aber auch nicht schädlich.

## Schritt 5: Abschluss-Checkliste

Lies `references/checkliste.md` und gib die ausgefüllte Checkliste aus:
Was ist erledigt ✅, was muss der Nutzer noch selbst tun ⬜ (z. B. AVV bei
einem Dienst abschließen, Consent-Banner testen). Schließe mit dem
Disclaimer-Hinweis ab.
