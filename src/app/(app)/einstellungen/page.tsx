import { Check, CreditCard, KeyRound, Mail } from "lucide-react";
import { getSession } from "@/lib/auth/session";
import { findUserByEmail } from "@/lib/auth/users";
import { LIMIT_USD, verbrauchVon } from "@/lib/api/verbrauch";
import { CopyButton } from "@/components/ui/copy-button";
import { DomainUebersicht } from "@/components/app/domain-uebersicht";
import { changeTierAction } from "@/lib/auth/actions";
import { TIERS, TIER_INFO } from "@/lib/tiers";
import { Avatar } from "@/components/ui/avatar";
import { TierBadge } from "@/components/ui/tier-badge";

export const metadata = { title: "Einstellungen" };

export default async function SettingsPage() {
  const session = (await getSession())!;
  const user = findUserByEmail(session.email);
  const verbrauch = user ? verbrauchVon(user.id) : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          Einstellungen
        </h1>
        <p className="mt-2 text-zinc-400">Dein Account, deine Stufe, deine Daten.</p>
      </div>

      {/* Profil */}
      <section className="rounded-3xl border border-white/8 bg-surface-900/70 p-7">
        <h2 className="mb-5 text-lg font-semibold text-white">Profil</h2>
        <div className="flex flex-wrap items-center gap-5">
          <Avatar name={session.name} gradient={session.avatarColor} size="lg" />
          <div className="min-w-0">
            <p className="text-lg font-semibold text-white">{session.name}</p>
            <p className="text-sm text-zinc-400">{session.email}</p>
            <p className="mt-1 text-xs text-zinc-600">
              Rolle: {session.role === "admin" ? "Admin" : "Mitglied"}
            </p>
          </div>
          <div className="ml-auto">
            <TierBadge tier={session.tier} />
          </div>
        </div>
        <p className="mt-5 rounded-2xl border border-dashed border-white/10 bg-surface-950/40 p-4 text-sm text-zinc-500">
          Profil bearbeiten (Name, Avatar, Passwort ändern) kommt mit der
          echten Datenbank-Anbindung.
        </p>
      </section>

      {/* Persönlicher API-Schlüssel für die Bewertungs-API */}
      <section className="rounded-3xl border border-white/8 bg-surface-900/70 p-7">
        <h2 className="mb-1 flex items-center gap-2 text-lg font-semibold text-white">
          <KeyRound className="size-5 text-brand-300" />
          Dein API-Schlüssel
        </h2>
        <p className="mb-5 text-sm text-zinc-400">
          Damit holt Claude deine Bewertungen von Google, Trustpilot &amp; Co. —
          der Schlüssel gehört nur dir. Behandle ihn wie ein Passwort.
        </p>
        {user ? (
          <>
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-surface-950/60 px-4 py-3">
              <code className="min-w-0 truncate font-mono text-sm text-zinc-200">
                {user.apiKey}
              </code>
              <CopyButton text={user.apiKey} />
            </div>
            {verbrauch ? (
              <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-widest text-zinc-500">
                    Monat
                  </dt>
                  <dd className="font-medium text-zinc-200">{verbrauch.monat}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-zinc-500">
                    Anfragen
                  </dt>
                  <dd className="font-medium text-zinc-200">{verbrauch.anfragen}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-zinc-500">
                    Verbrauch
                  </dt>
                  <dd className="font-medium text-zinc-200">
                    {verbrauch.kostenUsd.toFixed(4)} von {LIMIT_USD[session.tier]} USD
                  </dd>
                </div>
              </dl>
            ) : null}
          </>
        ) : null}
      </section>

      <DomainUebersicht />

      {/* Account-Stufe */}
      <section className="rounded-3xl border border-white/8 bg-surface-900/70 p-7">
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Account-Stufe</h2>
          <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-500">
            Demo-Modus
          </span>
        </div>
        <p className="mb-6 text-sm text-zinc-400">
          Zum Testen kannst du deine Stufe hier direkt umstellen und siehst
          sofort, welche Inhalte frei sind. Später übernimmt das der
          Stripe-Checkout.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {TIERS.map((tier) => {
            const info = TIER_INFO[tier];
            const current = tier === session.tier;
            return (
              <form
                key={tier}
                action={changeTierAction}
                className={`flex flex-col rounded-2xl border p-5 ${
                  current
                    ? "border-brand-500/50 bg-brand-500/10"
                    : "border-white/8 bg-surface-950/40"
                }`}
              >
                <input type="hidden" name="tier" value={tier} />
                <div className="mb-2 flex items-center justify-between">
                  <TierBadge tier={tier} />
                  {current && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-brand-300">
                      <Check className="size-3.5" /> Aktiv
                    </span>
                  )}
                </div>
                <p className="mb-1 text-2xl font-bold text-white">
                  {info.price}
                  <span className="ml-1 text-xs font-normal text-zinc-500">{info.priceHint}</span>
                </p>
                <p className="mb-4 flex-1 text-xs text-zinc-500">{info.tagline}</p>
                <button
                  type="submit"
                  disabled={current}
                  className={`rounded-xl py-2 text-sm font-semibold transition ${
                    current
                      ? "cursor-default bg-white/5 text-zinc-500"
                      : "bg-gradient-to-r from-brand-500 to-accent-500 text-white hover:opacity-90"
                  }`}
                >
                  {current ? "Deine Stufe" : "Zu dieser Stufe wechseln"}
                </button>
              </form>
            );
          })}
        </div>
      </section>

      {/* Geplante Integrationen */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-dashed border-white/10 bg-surface-900/40 p-7">
          <div className="mb-3 flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-white/5 text-zinc-400">
              <CreditCard className="size-5" />
            </span>
            <h3 className="font-semibold text-zinc-300">Zahlungen & Abo</h3>
          </div>
          <p className="text-sm text-zinc-500">
            Hier kommt die Stripe-Anbindung hin: Zahlungsmethode, Rechnungen,
            Abo verwalten und kündigen.
          </p>
        </div>
        <div className="rounded-3xl border border-dashed border-white/10 bg-surface-900/40 p-7">
          <div className="mb-3 flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-white/5 text-zinc-400">
              <Mail className="size-5" />
            </span>
            <h3 className="font-semibold text-zinc-300">E-Mail-Benachrichtigungen</h3>
          </div>
          <p className="text-sm text-zinc-500">
            Hier kommt die Resend-Anbindung hin: Willkommens-Mails, neue
            Lektionen, Community-Antworten.
          </p>
        </div>
      </section>
    </div>
  );
}
