# Barrierefreiheit — BFSG-Check

Das **Barrierefreiheitsstärkungsgesetz (BFSG)** gilt seit dem
**28. Juni 2025**. Es setzt den European Accessibility Act um.

## Wer ist betroffen?

**Betroffen:** Websites/Apps, über die Verbraucher elektronisch Verträge
abschließen können — also **Onlineshops, Buchungs-/Terminfunktionen,
kostenpflichtige Mitgliederbereiche** (B2C, „Dienstleistungen im
elektronischen Geschäftsverkehr").

**Ausnahme Kleinstunternehmen:** Dienstleister mit **weniger als 10
Mitarbeitern UND max. 2 Mio. € Jahresumsatz/Bilanzsumme** sind bei
Dienstleistungen ausgenommen. Viele Selbermacher fallen hierunter — das
dem Nutzer ehrlich sagen. (Für Produkte gilt die Ausnahme nicht
gleichermaßen.)

**Nicht direkt erfasst:** Reine Visitenkarten-Websites ohne
Bestell-/Buchungsfunktion und reine B2B-Angebote.

**Empfehlung unabhängig von der Pflicht:** Barrierefreiheit umsetzen —
größere Zielgruppe, besseres SEO, bessere UX. Der Aufwand ist beim Bau mit
KI minimal, wenn man es von Anfang an mitprompted.

## Der Basis-Standard (Richtung WCAG 2.1 AA / EN 301 549)

Beim Prüfen und Bauen auf diese Punkte achten:

1. **Kontrast:** Text mindestens 4,5:1 zum Hintergrund (große Headlines 3:1)
2. **Alt-Texte:** Jedes informative Bild hat ein beschreibendes `alt`;
   Deko-Bilder `alt=""`
3. **Tastatur:** Alles per Tab erreichbar und bedienbar, sichtbarer Fokus-Ring
4. **Formulare:** Jedes Feld hat ein `<label>`; Fehler werden als Text
   erklärt, nicht nur durch rote Farbe
5. **Struktur:** Saubere Überschriften-Hierarchie (h1→h2→h3), Landmarks
   (header/main/footer), aussagekräftige Linktexte (nicht „hier klicken")
6. **Skalierbar:** Bei 200 % Zoom bleibt alles lesbar und bedienbar
7. **Keine reine Farb-Kommunikation:** Information nie NUR über Farbe
8. **Bewegung:** Animationen respektieren `prefers-reduced-motion`

## Zusätzlich für BFSG-pflichtige Anbieter

- **„Erklärung zur Barrierefreiheit"** auf der Website (welcher Standard,
  bekannte Einschränkungen, Feedback-Kontakt)
- Barrierefreie Pflicht-Prozesse: der komplette Bestell-/Buchungsweg muss
  barrierefrei funktionieren — nicht nur die Startseite

## Prüf-Workflow

1. Automatisiert: Lighthouse-Accessibility-Audit laufen lassen bzw. Code
   gegen die 8 Basis-Punkte prüfen
2. Manuell-simuliert: Seite nur mit Tastatur „durchtabben" (im Code:
   Fokus-Reihenfolge und Fokus-Sichtbarkeit prüfen)
3. Befunde als konkrete Fix-Liste ausgeben und direkt umsetzen (Kontraste,
   Alt-Texte und Labels sind Minuten-Fixes)
