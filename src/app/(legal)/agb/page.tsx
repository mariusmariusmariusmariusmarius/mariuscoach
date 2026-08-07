export const metadata = { title: "AGB" };

export default function AgbPage() {
  return (
    <article className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-white">
        Allgemeine Geschäftsbedingungen
      </h1>
      <div className="rounded-2xl border border-gold-400/25 bg-gold-500/5 p-5 text-sm text-zinc-300">
        ⚠️ Platzhalter: Vor dem Verkaufsstart rechtlich geprüfte AGB einsetzen —
        insbesondere zu Abo-Laufzeiten, Kündigung, Widerrufsrecht bei digitalen
        Inhalten und Zahlungsabwicklung.
      </div>
      <section className="space-y-4 text-sm leading-relaxed text-zinc-400">
        <p>
          <strong className="text-zinc-200">1. Geltungsbereich</strong>
          <br />
          [Für welche Leistungen gelten diese AGB — Mitgliedschaften, Kurse, Community]
        </p>
        <p>
          <strong className="text-zinc-200">2. Vertragsschluss & Accounts</strong>
          <br />
          [Registrierung, Account-Stufen Free/Starter/Pro, Pflichten der Nutzer]
        </p>
        <p>
          <strong className="text-zinc-200">3. Preise & Zahlung</strong>
          <br />
          [Abo-Modelle, Abrechnungszeitraum, Zahlungsanbieter]
        </p>
        <p>
          <strong className="text-zinc-200">4. Laufzeit & Kündigung</strong>
          <br />
          [Kündigungsfristen, Folgen der Kündigung für den Zugang]
        </p>
        <p>
          <strong className="text-zinc-200">5. Widerrufsrecht</strong>
          <br />
          [Widerrufsbelehrung für Verbraucher bei digitalen Inhalten]
        </p>
      </section>
    </article>
  );
}
