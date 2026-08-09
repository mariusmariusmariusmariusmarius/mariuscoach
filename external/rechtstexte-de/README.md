# rechtstexte-de

**Impressum, Datenschutzerklärung & Co. für deutsche Websites — direkt aus
deinem Projekt heraus.**

Dieser Agent-Skill scannt dein Website-Projekt (Hosting, Formulare,
Datenbank, Zahlungsanbieter, Tracking …), stellt dir die 5 Fragen, die nur
du beantworten kannst — und erzeugt daraus vollständige, zum Projekt
passende Rechtstexte als fertige Seiten.

## Installation

```bash
npx skills add mariusmariusmariusmariusmarius/rechtstexte-de
```

Danach in Claude einfach schreiben: **„Erstelle die Rechtstexte für diese
Website."**

## Was der Skill kann

- **Impressum** nach § 5 DDG — passend zu deiner Rechtsform (Einzelunternehmen,
  GbR, UG/GmbH, Handwerksbetrieb mit Kammer …)
- **Datenschutzerklärung** nach DSGVO — aus Bausteinen für die Dienste, die
  dein Projekt WIRKLICH nutzt (Vercel, Neon, Resend, Stripe, Meta Pixel,
  Google Ads, Kontaktformular, WhatsApp-Button …)
- **Cookie/Consent-Einschätzung** nach § 25 TDDDG — brauchst du ein Banner
  oder nicht?
- **Barrierefreiheit (BFSG)** — bist du betroffen, und was ist zu tun?
- **Shop-Recht** — Widerruf, Button-Lösung, Preisangaben für Onlineshops
- **Launch-Checkliste** zum Schluss

## Wie er arbeitet

1. **Scan:** Der Skill liest dein Repo und erkennt automatisch, welche
   Dienste und Funktionen deine Website nutzt.
2. **Interview:** Nur die Fakten, die im Code nicht stehen — Rechtsform,
   Anschrift, USt-IdNr.
3. **Generieren:** `/impressum` und `/datenschutz` als fertige Seiten im
   Design deiner Website, plus Footer-Links und Checkliste.

## ⚠️ Wichtiger Hinweis

Dieser Skill ersetzt **keine Rechtsberatung**. Er erstellt sorgfältig
strukturierte Textvorlagen auf Basis der gängigen gesetzlichen
Anforderungen (Stand der Referenzdateien beachten). Für verbindliche
Auskünfte im Einzelfall: Anwältin/Anwalt fragen. Die Nutzung erfolgt auf
eigene Verantwortung.

---

Gebaut von **[Marius Müller Media](https://mariuscoach.vercel.app)** —
der Lernplattform für alle, die Websites, Shops und Tools selbst bauen
wollen: mit Claude, ohne Baukasten. Schritt für Schritt, mit fertigen
Prompts. **[→ Kostenlos starten](https://mariuscoach.vercel.app)**

Lizenz: MIT
