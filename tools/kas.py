#!/usr/bin/env python3
"""
Kleiner Client für die All-Inkl KAS-API — ohne PHP, ohne externe Pakete.

Zugangsdaten kommen aus Umgebungsvariablen, nie aus dem Code:
    export KAS_LOGIN=w0123456
    export KAS_PASSWORD='dein-kas-passwort'
    export KAS_2FA=123456        # nur falls Zwei-Faktor aktiv ist

Benutzung:
    python3 tools/kas.py get_domains
    python3 tools/kas.py get_mailaccounts
    python3 tools/kas.py get_dns_settings zone_host=meine-domain.de.
    python3 tools/kas.py add_mailaccount local_part=info domain_part=meine-domain.de \
                                         mail_password='...'

Sicherheitsnetz: Funktionen, die löschen oder zurücksetzen, laufen nur mit
--force. Ohne das Flag bricht das Skript vorher ab.
"""

import json
import os
import sys
import urllib.request
from xml.sax.saxutils import escape

AUTH_URL = "https://kasapi.kasserver.com/soap/KasAuth.php"
API_URL = "https://kasapi.kasserver.com/soap/KasApi.php"
AUTH_NS = "urn:xmethodsKasApiAuthentication"
API_NS = "urn:xmethodsKasApi"

DESTRUCTIVE = ("delete_", "reset_", "move_")


def _envelope(ns, operation, payload):
    """RPC/encoded SOAP — genau das, was die WSDL vorschreibt."""
    return (
        '<?xml version="1.0" encoding="UTF-8"?>'
        '<SOAP-ENV:Envelope '
        'xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" '
        'xmlns:xsd="http://www.w3.org/2001/XMLSchema" '
        'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
        'xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" '
        f'xmlns:ns1="{ns}" '
        'SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">'
        "<SOAP-ENV:Body>"
        f'<ns1:{operation}>'
        f'<Params xsi:type="xsd:string">{escape(payload)}</Params>'
        f"</ns1:{operation}>"
        "</SOAP-ENV:Body></SOAP-ENV:Envelope>"
    ).encode("utf-8")


def _post(url, ns, operation, params):
    body = _envelope(ns, operation, json.dumps(params))
    req = urllib.request.Request(
        url,
        data=body,
        headers={
            "Content-Type": 'text/xml; charset="utf-8"',
            "SOAPAction": f"{ns}#{operation}",
            "Content-Length": str(len(body)),
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return resp.read().decode("utf-8", "replace"), None
    except urllib.error.HTTPError as err:
        return err.read().decode("utf-8", "replace"), err.code


def _fault(xml):
    """Fehlermeldung aus einem SOAP-Fault ziehen."""
    import re

    m = re.search(r"<faultstring>(.*?)</faultstring>", xml, re.S)
    return m.group(1).strip() if m else None


def login(lifetime=600):
    """Holt ein Session-Token. Das Passwort verlässt diese Funktion nicht."""
    params = {
        "kas_login": os.environ["KAS_LOGIN"],
        "kas_auth_type": "plain",
        "kas_auth_data": os.environ["KAS_PASSWORD"],
        "session_lifetime": lifetime,
        "session_update_lifetime": "Y",
    }
    if os.environ.get("KAS_2FA"):
        params["session_2fa"] = os.environ["KAS_2FA"]

    xml, _ = _post(AUTH_URL, AUTH_NS, "KasAuth", params)
    err = _fault(xml)
    if err:
        raise SystemExit(f"Login fehlgeschlagen: {err}")

    import re

    m = re.search(r"<return[^>]*>(.*?)</return>", xml, re.S)
    if not m:
        raise SystemExit(f"Kein Token in der Antwort:\n{xml[:800]}")
    return m.group(1).strip()


def call(token, action, params=None):
    payload = {
        "kas_login": os.environ["KAS_LOGIN"],
        "kas_auth_type": "session",
        "kas_auth_data": token,
        "kas_action": action,
        "KasRequestParams": params or {},
    }
    xml, _ = _post(API_URL, API_NS, "KasApi", payload)
    err = _fault(xml)
    if err:
        raise SystemExit(f"{action} fehlgeschlagen: {err}")
    return xml


def main():
    args = [a for a in sys.argv[1:] if a != "--force"]
    force = "--force" in sys.argv
    if not args:
        raise SystemExit(__doc__)

    action, rest = args[0], args[1:]
    if action.startswith(DESTRUCTIVE) and not force:
        raise SystemExit(
            f"'{action}' verändert oder löscht Daten. Wenn du das wirklich "
            f"willst, nochmal mit --force aufrufen."
        )

    params = {}
    for item in rest:
        if "=" not in item:
            raise SystemExit(f"Parameter brauchen die Form name=wert: {item}")
        key, value = item.split("=", 1)
        params[key] = value

    for name in ("KAS_LOGIN", "KAS_PASSWORD"):
        if not os.environ.get(name):
            raise SystemExit(f"Umgebungsvariable {name} fehlt.")

    token = login()
    print(f"✓ Session steht (Token {token[:8]}…, 600 Sekunden gültig)\n")
    print(call(token, action, params))


if __name__ == "__main__":
    main()
