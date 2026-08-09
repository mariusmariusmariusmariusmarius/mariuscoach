# Launch-Checkliste Rechtstexte

Am Ende des Durchlaufs diese Liste ausgefüllt ausgeben: ✅ = erledigt
(vom Skill), ⬜ = muss der Nutzer selbst tun. Nur relevante Zeilen zeigen.

## Jede Website

- [ ] Impressum unter `/impressum`, aus dem Footer jeder Seite verlinkt
- [ ] Alle Pflichtangaben zur Rechtsform vorhanden (§ 5 DDG)
- [ ] Kein veralteter TMG-Verweis, kein toter OS-Plattform-Link
- [ ] Datenschutzerklärung unter `/datenschutz`, im Footer verlinkt
- [ ] Nur real genutzte Dienste in der Datenschutzerklärung
- [ ] Stand-Datum auf beiden Seiten
- [ ] Fonts lokal eingebunden (kein Remote-Google-Fonts)
- [ ] ⬜ AVV/DPA abschließen bei: {Liste aus Scan — z. B. Vercel, Neon, Resend}

## Falls Tracking (Meta Pixel, Google Ads …)

- [ ] Consent-Banner vorhanden, Ablehnen gleichwertig zu Akzeptieren
- [ ] ⬜ Technisch getestet: VOR Einwilligung keine Requests an Meta/Google
      (Browser-Network-Tab)
- [ ] „Cookie-Einstellungen"-Link im Footer (Widerruf)
- [ ] Consent Mode v2 an den Google Tag angebunden

## Falls Onlineshop

- [ ] Bestell-Button: „zahlungspflichtig bestellen"/„kaufen"
- [ ] Widerrufsbelehrung + Muster-Widerrufsformular unter `/widerruf`
- [ ] Brutto-Preise, Versandkosten-Hinweis, ggf. Grundpreise
- [ ] Bei digitalen Inhalten: Erlöschens-Checkbox im Checkout
- [ ] Bei Abos: Kündigungsbutton („Verträge hier kündigen")
- [ ] ⬜ Verpackungsregister LUCID (bei Warenversand)
- [ ] ⬜ Steuerfragen mit Steuerberater klären

## Falls BFSG-relevant (B2C-Bestell-/Buchungsfunktion)

- [ ] Basis-Barrierefreiheit geprüft (Kontraste, Alt-Texte, Tastatur,
      Labels, Struktur)
- [ ] Erklärung zur Barrierefreiheit veröffentlicht (falls pflichtig)

## Abschluss-Hinweis (immer ausgeben)

> Diese Texte sind sorgfältig erstellte Vorlagen auf Basis der gängigen
> gesetzlichen Anforderungen — sie ersetzen keine individuelle
> Rechtsberatung. Bei Besonderheiten (reglementierte Berufe, sensible
> Daten, internationale Shops): einmal anwaltlich prüfen lassen.
