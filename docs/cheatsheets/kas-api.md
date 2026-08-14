# Referenz — All-Inkl KAS API

Alle Funktionen der KAS-API, gezogen aus der offiziellen Doku
(`kasapi.kasserver.com/dokumentation/phpdoc/`). Stand: August 2026.

**Warum das hier liegt:** Damit Domain, DNS und Postfächer aus Claude heraus
steuerbar sind — Grundlage für Lektion 1.3 und die Automations-Module.

⚠️ **Nicht getestet.** Die Liste ist aus der Doku extrahiert, nicht mit echten
Zugangsdaten ausprobiert. Vor dem Dreh einmal selbst gegen den eigenen Account
laufen lassen.

---

## Die drei Auth-Parameter

Gehen bei **jedem** Aufruf mit:

| Parameter | Was rein muss |
|---|---|
| `kas_login` | Das KAS-Login (Kennung wie `w01234`) |
| `kas_auth_data` | Passwort **oder** Session-Token |
| `kas_auth_type` | Authentifizierungstyp — in den Doku-Beispielen `plain` |

Protokoll ist **SOAP**, nicht REST.

---

## ⭐ Zuerst: Session statt Passwort

Claude bekommt nie das Hauptpasswort. Stattdessen ein Token mit Ablaufdatum:

### `add_session` — Erzeugen eines Sessiontokens
| Parameter | Bedeutung |
|---|---|
| `session_lifetime` | die Sessionlebenszeit in Sekunden: 1-30000 |
| `session_update_lifetime` | Verlängerung der Session bei deren Benutzung: Y\|N |
| `session_2fa` | der OTP Pin, falls eine 2-Faktor-Authentifizierung aktiv ist |

`delete_session` beendet die Session vorzeitig. Max. Laufzeit: 30.000 Sekunden
(gut 8 Stunden).

---

## Die Funktionen für Modul 1

### `get_domains` — Auslesen der Domains
| Parameter | Bedeutung |
|---|---|
| `domain_name` | der gewünschte Hostname (optional) |

**Der erste Test.** Nur lesend — wenn hier deine Domains zurückkommen, steht
die Verbindung.

### `add_mailaccount` — Anlegen eines Mailaccounts
| Parameter | Bedeutung |
|---|---|
| `mail_password` | das Mailaccountpasswort |
| `webmail_autologin` | automatisches Login vom KAS ins Webmail möglich: Y\|N (optional, default Y) |
| `local_part` | der local_part, RFC2822 |
| `domain_part` | FQDN, RFC2822 |
| `responder` | aktiver Responder: N\|Y oder start\|ende (start und ende als Timestamps mit "\|" als Trenner, optional, default N) |
| `mail_responder_content_type` | der Content-Type des Responder-Textes: html\|text (optional, default text) |
| `mail_responder_displayname` | der Anzeigename des Absenders bei dem Autoresponder, z.B. "mein Autoresponder Max Mustermann" (optional, default leer) |
| `responder_text` | der Respondertext (optional, default leer) |
| `copy_adress` | die Kopieempfängeradressen: RFC2822 (mehrere Adressen mit Komma getrennt sind möglich, optional, default leer) |
| `mail_sender_alias` | erlaubte Aliasadressen, mit denen ein Versenden im FROM möglich ist (optional, default leer) |
| `mail_xlist_enabled` | XLIST aktiv: Y\|N (optional, default Y) |
| `mail_xlist_sent` | XLIST Name "gesendete Objekte" (optional, default Sent) |
| `mail_xlist_drafts` | XLIST Name "Entwürfe" (optional, default Drafts) |
| `mail_xlist_trash` | XLIST Name "Papierkorb" (optional, default Trash) |
| `mail_xlist_spam` | XLIST Name "Spam" (optional, default Spam) |
| `mail_xlist_archiv` | XLIST Name "Archiv" (optional, default Archiv) |
| `mail_allow_nets` | Zugriffe nur für bestimmte Clients (optional, z.B. 1.2.3.4, 12.34.0.0/16, webmail) |

**Pflicht sind praktisch nur** `mail_password`, `local_part` und `domain_part`.
Der Rest hat Defaults. `local_part` ist der Teil vor dem @, `domain_part` die
Domain dahinter.

### `add_mailforward` — Anlegen einer Weiterleitung
| Parameter | Bedeutung |
|---|---|
| `local_part` | der local_part, RFC2822 |
| `domain_part` | FQDN, RFC2822 |


### `add_dns_settings` — Anlegen eines DNS Resource Records
| Parameter | Bedeutung |
|---|---|
| `zone_host` | die betreffende Zone |
| `record_type` | der TYPE des Resource Records (MX,A,AAAA usw) |
| `record_name` | der NAME des Resource Records |
| `record_data` | die DATA des Resource Records |
| `record_aux` | die AUX des Resource Records |

**Das ist die Funktion für Modul 2**, wenn die Domain mit Vercel verbunden
wird: A-Record und CNAME hier eintragen, nicht die Nameserver umstellen.

### `add_subdomain` — Anlegen einer Subdomain
| Parameter | Bedeutung |
|---|---|
| `subdomain_name` | Label der Subdomain |
| `domain_name` | die Domain zu der das Subdomainlabel hinzu gefügt werden soll |
| `subdomain_path` | der Hostpfad im Account oder bei Redirect ein FQDN oder ein WBK (optional, Beispiele: /pfad/ oder http://domain.tld (redirect_status required) oder wbk:wbk000001 |
| `redirect_status` | Redirectstatus: 0\|301\|302\|307, 0 = kein Redirect (optional, default 0) |
| `statistic_version` | die Webalizerversion: 0\|4\|5\|7 (optional, default 5) |
| `statistic_language` | die Webalizersprache: de\|en (optional, default de) |
| `php_version` | die gewünschte PHP Version: 5.X\|7.X (optional, default 7.1) |


---

## Alle 72 Funktionen im Überblick

### Session-Token

| Funktion | Was sie tut |
|---|---|
| `add_session` | Erzeugen eines Sessiontokens |
| `delete_session` ⚠️ | Entfernen einer Session |

### Domains

| Funktion | Was sie tut |
|---|---|
| `add_domain` | Anlegen einer Domain |
| `delete_domain` ⚠️ | Löschen einer Domain |
| `get_domains` | Auslesen der Domains |
| `get_topleveldomains` | Auslesen der möglichen Topleveldomains |
| `move_domain` | Verschieben einer Domain |
| `update_domain` | Bearbeiten einer Domain |

### Subdomains

| Funktion | Was sie tut |
|---|---|
| `add_subdomain` | Anlegen einer Subdomain |
| `delete_subdomain` ⚠️ | Löschen einer Subdomain |
| `get_subdomains` | Auslesen der Subdomains |
| `move_subdomain` | Verschieben einer Subdomain |
| `update_subdomain` | Bearbeiten einer Subdomain |

### DNS

| Funktion | Was sie tut |
|---|---|
| `add_dns_settings` | Anlegen eines DNS Resource Records |
| `delete_dns_settings` ⚠️ | Löschen eines DNS Resource Records |
| `get_dns_settings` | Auslesen der DNS Einstellungen einer Zone |
| `reset_dns_settings` ⚠️ | Zurücksetzen der DNS Einstellungen |
| `update_dns_settings` | Bearbeiten eines DNS Resource Records |

### Postfächer

| Funktion | Was sie tut |
|---|---|
| `add_mailaccount` | Anlegen eines Mailaccounts |
| `delete_mailaccount` ⚠️ | Löschen eines Mailaccounts |
| `get_mailaccounts` | Auslesen der Mailaccounts |
| `update_mailaccount` | Bearbeiten eines Mailaccounts |

### Mail-Weiterleitungen

| Funktion | Was sie tut |
|---|---|
| `add_mailforward` | Anlegen einer Mail-Weiterleitungen |
| `delete_mailforward` ⚠️ | Löschen einer Mail-Weiterleitung |
| `get_mailforwards` | Auslesen der Mail-Weiterleitungen |
| `update_mailforward` | Bearbeiten der Mail-Weiterleitungen |

### Mail-Filter

| Funktion | Was sie tut |
|---|---|
| `add_mailstandardfilter` | Anlegen der Standardfilter für Mailkonten |
| `delete_mailstandardfilter` ⚠️ | Löschen der Standardfilter eines Mailkontos |
| `get_mailstandardfilter` | Auslesen der Standardfilter für Mailkonten |

### Mailinglisten

| Funktion | Was sie tut |
|---|---|
| `add_mailinglist` | Anlegen einer Mailingliste |
| `delete_mailinglist` ⚠️ | Löschen einer Mailingliste |
| `get_mailinglists` | Auslesen der Mailinglisten |
| `update_mailinglist` | Bearbeiten einer Mailingliste |

### Account

| Funktion | Was sie tut |
|---|---|
| `add_account` | Anlegen eines Accounts |
| `delete_account` ⚠️ | Löschen eines Accounts |
| `get_accountresources` | Auslesen der Accountressourcen |
| `get_accounts` | Auslesen der Accounts |
| `get_accountsettings` | Auslesen der Accounteinstellungen |
| `get_server_information` | Auslesen der zusätzlichen Serverinformationen zum Account, z.B.: verfügbare PHP Versionen |
| `update_account` | Bearbeiten eines Accounts |
| `update_accountsettings` | Bearbeiten der eigenen Accounteinstellungen |
| `update_superusersettings` | Bearbeiten der Superuser-Accounteinstellungen |

### Datenbanken

| Funktion | Was sie tut |
|---|---|
| `add_database` | Anlegen einer Datenbank |
| `delete_database` ⚠️ | Löschen einer Datenbank |

### FTP

| Funktion | Was sie tut |
|---|---|
| `add_ftpusers` | Anlegen eines FTP Nutzers |
| `delete_ftpuser` ⚠️ | Löschen eines FTP Nutzers |
| `get_ftpusers` | Auslesen der FTP Nutzer |
| `update_ftpuser` | Bearbeiten eines FTP Nutzers |

### Cronjobs

| Funktion | Was sie tut |
|---|---|
| `add_cronjob` | Anlegen eines Cronjobs |
| `delete_cronjob` ⚠️ | Löschen eines Cronjobs |
| `get_cronjobs` | Auslesen der Cronjobs |
| `update_cronjob` | Bearbeiten eines Cronjobs |

### DynDNS

| Funktion | Was sie tut |
|---|---|
| `add_ddnsuser` | Anlegen eines DDNS Nutzers |
| `delete_ddnsuser` ⚠️ | Löschen eines DDNS Nutzers |
| `get_ddnsusers` | Auslesen der DDNS Nutzer |
| `update_ddnsuser` | Bearbeiten eines DDNS Nutzers |

### Verzeichnisschutz

| Funktion | Was sie tut |
|---|---|
| `add_directoryprotection` | Anlegen der Verzeichnisschutz-Einstellungen |
| `delete_directoryprotection` ⚠️ | Löschen der Verzeichnisschutz-Einstellungen |
| `get_directoryprotection` | Auslesen der gesetzen Verzeichnisschutz-Einstellungen |
| `update_directoryprotection` | Bearbeiten der Verzeichnisschutz-Einstellungen |

### Netzlaufwerke

| Funktion | Was sie tut |
|---|---|
| `add_sambauser` | Anlegen eines Netzlaufwerksnutzers |
| `delete_sambauser` ⚠️ | Löschen eines Netzlaufwerksnutzers |
| `get_sambausers` | Auslesen der Netzlaufwerksnutzer |
| `update_sambauser` | Bearbeiten eines Netzlaufwerksnutzer |

### Software-Installation

| Funktion | Was sie tut |
|---|---|
| `add_softwareinstall` | Installation eines verfügbaren Softwarepaketes |
| `get_softwareinstall` | Auslesen der verfügbaren Pakete für die automatische Softwareinstallation |

### SSL

| Funktion | Was sie tut |
|---|---|
| `update_ssl` | Bearbeiten eines SSL Zertifikats |

### Statistik

| Funktion | Was sie tut |
|---|---|
| `get_space` | Auslesen der Speicherbelegung |
| `get_space_usage` | Auslesen der Speicherbelegung einzelner Verzeichnisse |
| `get_traffic` | Auslesen das Traffics |

### Symlinks

| Funktion | Was sie tut |
|---|---|
| `add_symlink` | Anlegen eines Symlinks |

### Besitzrechte

| Funktion | Was sie tut |
|---|---|
| `update_chown` | Bearbeiten der Besitzrechte |

---

## ⚠️ Stolperfalle für die Lektion

Die API kann **löschen** — `delete_mailaccount`, `delete_dns_settings`,
`delete_domain`, `delete_account`, `reset_dns_settings`. Wer Claude vollen
Zugriff gibt und unpräzise promptet, kann sich Postfächer oder die komplette
DNS-Zone zerlegen.

**Die Regel für den Kurs:**
1. Erst nur `get_*`-Aufrufe, bis die Verbindung sicher steht
2. Session-Token mit kurzer Laufzeit statt Dauerpasswort
3. Beim Prompten immer sagen, was **nicht** passieren soll:
   *„Nur anlegen, nichts löschen und nichts überschreiben."*

---

## Prompt zum Verbinden

```
Ich will die KAS-API von All-Inkl an dich anbinden.

1. Lies die Doku auf https://kasapi.kasserver.com/dokumentation/
   inklusive SOAP-Beispiel und phpdoc, und sag mir, welche
   Endpunkt-URLs ich brauche.
2. Hol dir per add_session ein Token mit 3600 Sekunden Laufzeit.
   Mein Hauptpasswort wird nicht dauerhaft gespeichert.
3. Teste mit get_domains und get_mailaccounts. Nur lesen —
   nichts anlegen, nichts löschen.
4. Zeig mir das Ergebnis als Tabelle.
```
