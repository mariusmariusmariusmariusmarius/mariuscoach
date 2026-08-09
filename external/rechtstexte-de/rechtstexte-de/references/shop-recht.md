# Shop-Recht — Onlineshop abmahnsicher starten

Gilt zusätzlich zu Impressum + Datenschutz, sobald online verkauft wird
(B2C-Fernabsatz).

## 1. Button-Lösung (§ 312j Abs. 3 BGB)

Der Bestell-Button MUSS eindeutig auf die Zahlungspflicht hinweisen.
- ✅ „Zahlungspflichtig bestellen", „Kaufen", „Jetzt kaufen"
- ❌ „Bestellen", „Weiter", „Bestellung abschicken", „Anmelden"
Ohne korrekten Button kommt kein wirksamer Vertrag zustande — im Code den
tatsächlichen Button-Text prüfen und ggf. ändern.

## 2. Pflichtinfos direkt vor der Bestellung

Unmittelbar bevor der Kunde bestellt, müssen klar sichtbar sein:
wesentliche Produktmerkmale, Gesamtpreis inkl. USt, Versandkosten,
ggf. Mindestlaufzeit bei Abos.

## 3. Preisangaben (PAngV)

- **Brutto-Endpreise** überall (außer reines B2B mit klarer Kennzeichnung)
- Hinweis „inkl. MwSt., zzgl. Versand" mit Link auf Versandkosten
- **Grundpreis** (€/kg, €/l, €/m²) bei Waren nach Gewicht/Volumen/Fläche —
  direkt neben dem Gesamtpreis. Häufige Abmahnfalle!
- Versandkosten VOR dem Checkout kommunizieren — keine Überraschungen

## 4. Widerrufsrecht (14 Tage)

Verbraucher haben 14 Tage Widerrufsrecht ab Warenerhalt. Nötig auf der
Website (eigene Seite `/widerruf`):

**a) Widerrufsbelehrung** mit: Frist (14 Tage), wie widerrufen wird
(eindeutige Erklärung an {Name, Anschrift, E-Mail}), Folgen (Erstattung
aller Zahlungen inkl. Standard-Versand binnen 14 Tagen), wer die
Rücksendekosten trägt (frei wählbar — MUSS aber gesagt werden, sonst trägt
sie der Händler), Hinweis auf das Muster-Widerrufsformular.

**b) Muster-Widerrufsformular** (gesetzliches Muster, Anlage 2 zu
Art. 246a EGBGB):

```
Muster-Widerrufsformular

(Wenn Sie den Vertrag widerrufen wollen, füllen Sie bitte dieses
Formular aus und senden Sie es zurück.)

An {Name, Anschrift, E-Mail}:

Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen
Vertrag über den Kauf der folgenden Waren (*) / die Erbringung der
folgenden Dienstleistung (*)

– Bestellt am (*) / erhalten am (*)
– Name des/der Verbraucher(s)
– Anschrift des/der Verbraucher(s)
– Unterschrift (nur bei Mitteilung auf Papier)
– Datum

(*) Unzutreffendes streichen.
```

**c) Ausnahmen** (falls einschlägig, in die Belehrung aufnehmen):
- Digitale Inhalte: Widerruf erlischt, wenn der Kunde der sofortigen
  Ausführung zustimmt UND sein Erlöschen bestätigt (im Checkout als
  Checkbox umsetzen!)
- Individuell angefertigte Waren, schnell verderbliche Waren,
  entsiegelte Hygiene-Artikel

## 5. AGB

Keine gesetzliche Pflicht, aber sinnvoll (Lieferung, Zahlung,
Eigentumsvorbehalt, Gewährleistungs-Hinweise). Wichtig:
- Einbeziehung: im Checkout verlinken („Es gelten unsere AGB")
- Keine Klauseln, die Verbraucherrechte beschneiden (unwirksam + abmahnbar)
- Gewährleistung (2 Jahre) darf gegenüber Verbrauchern bei Neuware nicht
  verkürzt werden — Formulierungen wie „keine Garantie" vermeiden

## 6. Abo-Modelle

- Vor Abschluss: Preis pro Abrechnungszeitraum, Laufzeit, Kündigungsfrist
- **Kündigungsbutton** (§ 312k BGB): Online abgeschlossene Abos müssen
  online über eine gut sichtbare Schaltfläche „Verträge hier kündigen"
  kündbar sein — direkt auf der Website, ohne Login-Zwang

## 7. Sonstiges (kurz prüfen, an Fachstellen verweisen)

- **Verpackungsgesetz:** Wer Ware versendet, muss sich im LUCID-Register
  registrieren und Verpackungen lizenzieren — To-do an den Nutzer
- Bestellbestätigung per E-Mail unverzüglich senden (mit Vertragstext/AGB)
- ⚠️ Kein OS-Plattform-Link mehr (seit Juli 2025 abgeschaltet — auch aus
  AGB/Widerruf entfernen)
- Steuern (OSS, Kleinunternehmer, Differenzbesteuerung): NICHT Teil der
  Rechtstexte — klarer Hinweis: Steuerberater
