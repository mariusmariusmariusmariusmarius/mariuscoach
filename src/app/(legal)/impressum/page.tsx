export const metadata = { title: "Impressum" };

export default function ImpressumPage() {
  return (
    <article className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-white">Impressum</h1>
      <div className="rounded-2xl border border-gold-400/25 bg-gold-500/5 p-5 text-sm text-zinc-300">
        ⚠️ Platzhalter: Vor dem Livegang mit deinen echten Angaben füllen
        (Anbieterkennzeichnung nach § 5 DDG).
      </div>
      <section className="space-y-4 text-sm leading-relaxed text-zinc-400">
        <p>
          <strong className="text-zinc-200">Angaben gemäß § 5 DDG</strong>
          <br />
          [Vor- und Nachname / Firma]
          <br />
          [Straße und Hausnummer]
          <br />
          [PLZ und Ort]
        </p>
        <p>
          <strong className="text-zinc-200">Kontakt</strong>
          <br />
          E-Mail: [deine E-Mail-Adresse]
          <br />
          Telefon: [deine Telefonnummer]
        </p>
        <p>
          <strong className="text-zinc-200">Umsatzsteuer-ID</strong>
          <br />
          [falls vorhanden: USt-IdNr. gemäß § 27a UStG]
        </p>
        <p>
          <strong className="text-zinc-200">Verantwortlich für den Inhalt</strong>
          <br />
          [Name und Anschrift wie oben]
        </p>
      </section>
    </article>
  );
}
