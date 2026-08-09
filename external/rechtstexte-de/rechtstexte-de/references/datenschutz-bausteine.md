# Datenschutzerklärung — Grundgerüst & Dienst-Bausteine

Aufbau: **Grundgerüst** (immer) + **nur die Bausteine der Dienste, die der
Scan gefunden hat**. Jeder Baustein nennt: was passiert, welche Daten,
Rechtsgrundlage (Art. 6 DSGVO), Anbieter mit Anschrift, Drittland-Bezug.

## Grundgerüst (immer)

1. **Verantwortlicher** — Name + Anschrift + E-Mail (identisch zum Impressum)
2. **Überblick** — ein Absatz in Klartext: Welche Daten fallen grundsätzlich
   an (Server-Logs, ggf. Formulardaten …), und der Grundsatz: so wenig wie
   möglich
3. **Rechtsgrundlagen** — kurz erklärt: Einwilligung (Art. 6 Abs. 1 lit. a),
   Vertrag/Anbahnung (lit. b), rechtliche Pflicht (lit. c), berechtigtes
   Interesse (lit. f)
4. **Deine Rechte** — Auskunft (Art. 15), Berichtigung (16), Löschung (17),
   Einschränkung (18), Datenübertragbarkeit (20), **Widerspruch (21)**,
   Widerruf erteilter Einwilligungen, Beschwerderecht bei einer
   Datenschutz-Aufsichtsbehörde
5. **Speicherdauer** — Grundsatz: nur so lange wie für den Zweck nötig bzw.
   gesetzliche Aufbewahrungsfristen
6. **SSL/TLS-Verschlüsselung** — ein Satz
7. **Stand-Datum**

## Bausteine (nach Scan auswählen)

### Hosting: Vercel
- Anbieter: Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA
- Zweck: Auslieferung der Website; dabei fallen Server-Logfiles an
  (IP-Adresse, Datum/Uhrzeit, aufgerufene Seite, User-Agent)
- Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
  sicherem, schnellem Betrieb)
- Drittland: USA — Vercel ist unter dem **EU-US Data Privacy Framework**
  zertifiziert; zusätzlich Standardvertragsklauseln. Auslieferung erfolgt
  über ein weltweites Netzwerk inkl. Standorten in der EU
- ⬜ To-do für den Nutzer: **AVV mit Vercel abschließen** (Data Processing
  Addendum — im Vercel-Dashboard akzeptierbar)

### Datenbank: Neon (Postgres)
- Anbieter: Neon Inc., USA — Region wählbar; **EU-Region (z. B. Frankfurt)
  empfehlen und im Text nennen**
- Zweck: Speicherung von {konkret einsetzen: Anfragen/Accounts/Bestellungen}
- Rechtsgrundlage: Art. 6 Abs. 1 lit. b (Vertrag/Anfrage) bzw. lit. f
- ⬜ To-do: AVV/DPA abschließen, EU-Region prüfen

### E-Mail-Versand: Resend
- Anbieter: Resend (Plus Five Five, Inc.), USA — DPF-zertifiziert
- Zweck: Transaktions-Mails (Anfragebestätigung, Account-Mails …)
- Rechtsgrundlage: Art. 6 Abs. 1 lit. b bzw. f
- ⬜ To-do: DPA abschließen

### Kontakt-/Anfrageformular
- Daten: die abgefragten Felder (Name, E-Mail, Telefon, Nachricht …) —
  konkret aufzählen
- Zweck: Bearbeitung der Anfrage; Rechtsgrundlage: Art. 6 Abs. 1 lit. b
  (vorvertraglich), sonst lit. f
- Speicherdauer: bis zur abschließenden Bearbeitung, danach Löschung,
  soweit keine Aufbewahrungspflichten greifen

### Zahlungen: Stripe
- Anbieter für EU-Kunden: Stripe Payments Europe, Ltd., 1 Grand Canal
  Street Lower, Dublin, Irland (Konzern: Stripe Inc., USA — DPF)
- Daten: Zahlungsdaten, Name, E-Mail, Betrag; Stripe ist für die
  Zahlungsabwicklung teilweise selbst Verantwortlicher
- Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO

### Meta Pixel / Conversions API  ⚠️ NUR MIT EINWILLIGUNG
- Anbieter: Meta Platforms Ireland Ltd., Merrion Road, Dublin 4, Irland
- Zweck: Messung/Optimierung von Werbeanzeigen, Bildung von Zielgruppen
- Rechtsgrundlage: **ausschließlich Einwilligung** (Art. 6 Abs. 1 lit. a
  DSGVO i. V. m. § 25 Abs. 1 TDDDG) — Pixel darf erst NACH Klick auf
  „Akzeptieren" im Consent-Banner feuern. Widerruf jederzeit über die
  Cookie-Einstellungen
- Drittland: Datenübermittlung in die USA möglich (DPF)

### Google Ads / Conversion-Tracking / Google Tag  ⚠️ NUR MIT EINWILLIGUNG
- Anbieter: Google Ireland Ltd., Gordon House, Barrow Street, Dublin 4
- Wie Meta: nur nach Einwilligung, Hinweis auf Consent Mode, Widerruf
  über Cookie-Einstellungen

### Vercel Web Analytics (cookielos)
- Reichweitenmessung ohne Cookies und ohne geräteübergreifendes Tracking;
  IP wird nicht dauerhaft gespeichert
- Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO — **kein Consent-Banner
  allein hierfür nötig**

### Google Fonts
- **Empfehlung zuerst aussprechen:** Fonts LOKAL einbinden (bei Next.js via
  `next/font` automatisch lokal) — dann ist KEIN Baustein nötig.
- Nur falls remote von fonts.googleapis.com geladen wird: Baustein mit
  Einwilligungs-Problematik — besser: umstellen statt erklären (bekannte
  Abmahnwelle nach LG München I, Urteil v. 20.01.2022, 3 O 17493/20)

### WhatsApp-Kontakt (Click-to-Chat)
- Der Chat startet erst durch aktiven Klick; es gelten die
  Datenschutzhinweise von WhatsApp (Meta). Kurzer Transparenz-Baustein,
  Rechtsgrundlage Art. 6 Abs. 1 lit. b/f

### Newsletter (falls vorhanden)
- Double-Opt-in beschreiben, Rechtsgrundlage Art. 6 Abs. 1 lit. a,
  Abmeldung in jeder Mail, Versanddienst nennen (z. B. Resend)

### Login/Accounts (falls vorhanden)
- Session-Cookies sind technisch erforderlich (§ 25 Abs. 2 TDDDG — keine
  Einwilligung nötig); gespeicherte Account-Daten aufzählen,
  Rechtsgrundlage Art. 6 Abs. 1 lit. b

### Externe Einbettungen (YouTube, Google Maps …)
- Empfehlung: Zwei-Klick-Lösung/Vorschaubild. Baustein je Dienst mit
  Anbieter + Einwilligungshinweis

## Formulierungs-Regeln

- Pro Baustein maximal ~10 Zeilen — Klartext schlägt Juristenprosa
- Immer konkret: „Wenn du unser Anfrageformular nutzt, speichern wir …"
  statt „Es können personenbezogene Daten verarbeitet werden"
- Alle ⬜-To-dos am Ende gesammelt an den Nutzer ausgeben (AVVs!)
