export const metadata = { title: "Datenschutz" };

export default function DatenschutzPage() {
  return (
    <article className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-white">Datenschutzerklärung</h1>
      <div className="rounded-2xl border border-gold-400/25 bg-gold-500/5 p-5 text-sm text-zinc-300">
        ⚠️ Platzhalter: Vor dem Livegang eine vollständige, auf die Plattform
        zugeschnittene Datenschutzerklärung einsetzen (DSGVO). Sobald Neon,
        Stripe und Resend angebunden sind, müssen diese Dienste hier als
        Auftragsverarbeiter aufgeführt werden.
      </div>
      <section className="space-y-4 text-sm leading-relaxed text-zinc-400">
        <p>
          <strong className="text-zinc-200">1. Verantwortlicher</strong>
          <br />
          [Name und Kontaktdaten des Verantwortlichen]
        </p>
        <p>
          <strong className="text-zinc-200">2. Welche Daten wir verarbeiten</strong>
          <br />
          Account-Daten (Name, E-Mail, Passwort-Hash), Kursfortschritt,
          Community-Beiträge sowie technische Zugriffsdaten (Server-Logs).
        </p>
        <p>
          <strong className="text-zinc-200">3. Zwecke und Rechtsgrundlagen</strong>
          <br />
          Bereitstellung der Lernplattform und Community (Art. 6 Abs. 1 lit. b
          DSGVO), Sicherheit und Betrieb (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
        <p>
          <strong className="text-zinc-200">4. Eingesetzte Dienstleister</strong>
          <br />
          [Nach Anbindung ergänzen: Hosting (z. B. Vercel), Datenbank (Neon),
          Zahlungen (Stripe), E-Mail-Versand (Resend)]
        </p>
        <p>
          <strong className="text-zinc-200">5. Deine Rechte</strong>
          <br />
          Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit,
          Widerspruch sowie Beschwerde bei einer Aufsichtsbehörde.
        </p>
      </section>
    </article>
  );
}
