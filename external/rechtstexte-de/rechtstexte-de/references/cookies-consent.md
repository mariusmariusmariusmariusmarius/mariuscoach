# Cookies & Consent — Brauche ich ein Banner?

Rechtsgrundlage: **§ 25 TDDDG** (früher TTDSG): Das Speichern von oder der
Zugriff auf Informationen im Endgerät (Cookies, localStorage,
Fingerprinting) braucht eine **Einwilligung** — AUSSER es ist für den vom
Nutzer gewünschten Dienst **unbedingt erforderlich** (Abs. 2).

## Entscheidungsmatrix

| Setup der Website | Banner nötig? |
|---|---|
| Statische Website ohne Tracking (Vercel-Hosting, Formular, lokale Fonts) | ❌ Nein |
| + Vercel Web Analytics (cookielos) | ❌ Nein |
| + Login/Session-Cookie, Warenkorb-Cookie | ❌ Nein (unbedingt erforderlich) |
| + Meta Pixel | ✅ Ja |
| + Google Ads / Analytics / Tag Manager | ✅ Ja |
| + YouTube-/Maps-Embed (ohne Zwei-Klick-Lösung) | ✅ Ja |
| + Sonstige Marketing-/Tracking-Cookies | ✅ Ja |

**Wichtigste Botschaft an den Nutzer:** Viele Selbermacher-Websites
brauchen GAR KEIN Banner — erst Werbetracking macht es nötig. Kein Banner
aus Angst einbauen, das nichts blockiert: Ein Banner, das da ist, aber
Tracker trotzdem vorher feuern lässt, ist schlimmer als keins.

## Wenn ein Banner nötig ist — Anforderungen

1. **Echte Wahl:** „Akzeptieren" und „Ablehnen" gleichwertig auf der ersten
   Ebene — Ablehnen darf nicht versteckt sein (keine Dark Patterns)
2. **Vorher blockieren:** Pixel/Tags dürfen erst NACH Einwilligung laden —
   das ist der technische Kern, nicht die Optik des Banners
3. **Granular:** Kategorien (erforderlich / Statistik / Marketing) einzeln
   wählbar
4. **Widerruflich:** Link „Cookie-Einstellungen" im Footer, der das Banner
   wieder öffnet
5. **Dokumentiert:** Einwilligungen werden mit Zeitstempel gespeichert

## Google Consent Mode v2

Wer Google Ads mit Consent-Banner nutzt, sollte Consent Mode v2
implementieren (Pflicht für Ads-Personalisierung im EWR): Das Banner
übergibt den Einwilligungsstatus (`ad_storage`, `ad_user_data`,
`ad_personalization`, `analytics_storage`) an den Google Tag. Ohne
Einwilligung sendet Google nur modellierte/cookielose Signale — dem Nutzer
ehrlich sagen: **Wer ablehnt, taucht in den Kampagnen-Daten kaum auf.**
Das ist der Preis, und er ist okay.

## Umsetzungs-Hinweis

Consent-Banner nicht von Hand bauen lassen, wenn Unsicherheit besteht —
entweder eine geprüfte Consent-Management-Plattform einsetzen oder das
Banner so bauen, dass Scripts wirklich erst nach Einwilligung injiziert
werden (technisch verifizieren: Network-Tab vor Einwilligung → keine
Requests an Meta/Google).
