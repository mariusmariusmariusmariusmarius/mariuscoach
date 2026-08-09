# Cheat Sheet — Lektion 4.2: Keyword-Daten holen

Das ist gleichzeitig deine **Setup-Anleitung** und der fertige Cheat-Sheet-
Inhalt, der später neben dem Video steht.

---

## Schritt 1: API-Zugangsdaten holen (1 Minute)

1. Auf **https://app.dataforseo.com/api-access** einloggen
2. Dort stehen **API Login** (deine E-Mail) und **API Password** —
   ⚠️ das ist NICHT dein Account-Passwort, sondern ein separates API-Passwort
3. Beides kopieren (oder „Send by Email" klicken)

**Guthaben:** Neue Accounts haben 1 $ Gratis-Credit — das reicht für die
ersten Tests. Für echtes Arbeiten: 50 $ aufladen, das Guthaben verfällt nie.

---

## Schritt 2: Claude mit DataForSEO verbinden (2 Minuten)

**Der einfache Weg — ein Befehl im Terminal:**

```bash
claude mcp add dataforseo \
  --env DATAFORSEO_USERNAME=DEIN_API_LOGIN \
  --env DATAFORSEO_PASSWORD=DEIN_API_PASSWORT \
  -- npx -y dataforseo-mcp-server
```

**Alternative für die Claude-Desktop-App** — Datei
`claude_desktop_config.json` öffnen und einfügen:

```json
{
  "mcpServers": {
    "dataforseo": {
      "command": "npx",
      "args": ["-y", "dataforseo-mcp-server"],
      "env": {
        "DATAFORSEO_USERNAME": "DEIN_API_LOGIN",
        "DATAFORSEO_PASSWORD": "DEIN_API_PASSWORT"
      }
    }
  }
}
```

Claude neu starten — fertig. Ab jetzt kann Claude die Daten selbst holen.

---

## Schritt 3: Erster Test — einfach fragen

```
Hol mir das monatliche Suchvolumen für diese Keywords in Deutschland:
"klimaanlage installieren", "klimaanlage kaufen", "split klimaanlage",
"klimaanlage wartung". Zeig mir Volumen, CPC und Wettbewerb als Tabelle
und sag mir, welche davon am einfachsten zu ranken sind.
```

⚠️ **Immer „in Deutschland" (oder Ort/Region) mitgeben** — sonst liefert die
API US-Daten als Standard.

---

## Die wichtigsten Prompts (zum Kopieren)

**Keyword-Recherche für ein Projekt**
```
Ich baue eine Website für einen {Gewerk}-Betrieb in {Ort}.
Finde die 30 wichtigsten Keywords in Deutschland mit Suchvolumen und
Difficulty. Markiere die, die schwach umkämpft sind — dort greifen wir an.
```

**Regional-Landingpages planen (dein Klima-Case)**
```
Prüfe für diese Orte: {Ort1}, {Ort2}, {Ort3} … das Suchvolumen für
"{Leistung} {Ort}". Sortiere nach Potenzial und schlag mir vor, für welche
Orte sich eine eigene Landingpage lohnt.
```

**Konkurrenz analysieren**
```
Für welche Keywords rankt {konkurrent.de}? Vergleich das mit {meine-seite.de}
und zeig mir die Lücke — Keywords, die die haben und ich nicht.
```

**Backlink-Profil prüfen**
```
Zeig mir eine Backlink-Übersicht für {konkurrent.de}: wie viele verweisende
Domains, welche Anchor-Texte. Und welche Domains verlinken auf die
Konkurrenz, aber nicht auf mich?
```

**Technisches SEO-Audit (Lektion 4.3)**
```
Prüfe {meine-seite.de} auf On-Page-Probleme und gib mir eine Fix-Liste
nach Priorität.
```

**Lokale Konkurrenz im Map Pack (Lektion 4.5)**
```
Zeig mir die Google-Business-Profile für "{Leistung} {Ort}": wie viele
Bewertungen hat jeder, welcher Schnitt? Sag mir, wie viele Bewertungen mein
Kunde braucht, um vorbeizuziehen.
```

**Akquise-Leadliste (Modul 9)**
```
Finde Websites von {Branche}-Betrieben im Raum {Region}, die auf Wix,
Jimdo oder Squarespace laufen. Liste mit Domain und erkannter Technologie.
```

---

## Was es kostet (für die Kalkulation)

| Abfrage | Preis |
|---|---|
| Suchvolumen, bis 1.000 Keywords pro Abfrage | 0,06 $ |
| Keyword-Ideen / Difficulty (Labs) | ab 0,01 $ |
| SERP-Abfrage | ab 0,0006 $ |
| Backlinks, pro 1.000 Zeilen | ~0,05 $ |

**Realistisch:** Ein komplettes Kundenprojekt mit Keyword-Recherche,
Konkurrenzanalyse und Backlink-Check kostet **deutlich unter 1 $**.

---

## Optional: Der offizielle Skill dazu

```bash
npx skills add dataforseo/dataforseo-toolkit-skill
```

Bringt 18 fertige Befehle mit (keyword_overview, ranked_keywords,
backlinks_summary, instant_pages …). Braucht Python und eine `.env` mit den
Zugangsdaten — **für den Kurs reicht der MCP-Weg oben**, der Skill ist die
Profi-Variante für wiederholbare Skripte.

Wichtig in der `.env`, sonst kommen US-Daten:
```
DATAFORSEO_DEFAULT_LOCATION = Germany
DATAFORSEO_DEFAULT_LANGUAGE = German
```
