"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction } from "@/lib/auth/actions";
import { Field, FormError, SubmitButton } from "@/components/ui/form";

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, {});

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold tracking-tight text-white">Willkommen zurück</h1>
      <p className="mb-7 text-sm text-zinc-400">Logg dich ein und bau weiter.</p>

      <form action={formAction} className="space-y-4">
        <FormError error={state.error} />
        <Field
          label="E-Mail"
          name="email"
          type="email"
          placeholder="du@beispiel.de"
          autoComplete="email"
          required
        />
        <Field
          label="Passwort"
          name="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          required
        />
        <div className="flex justify-end">
          <Link
            href="/passwort-vergessen"
            className="text-xs text-zinc-400 transition hover:text-brand-300"
          >
            Passwort vergessen?
          </Link>
        </div>
        <SubmitButton>Einloggen</SubmitButton>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-400">
        Noch keinen Account?{" "}
        <Link href="/registrieren" className="font-semibold text-brand-300 transition hover:text-brand-400">
          Kostenlos registrieren
        </Link>
      </p>

      {/* Demo-Zugänge — fliegt raus, sobald echte Auth angebunden ist */}
      <div className="mt-7 rounded-2xl border border-white/8 bg-surface-950/50 p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Demo-Zugänge zum Testen
        </p>
        <ul className="space-y-1 font-mono text-xs text-zinc-400">
          <li>demo@mariusmueller.media · demo123 <span className="text-violet-400">(Pro)</span></li>
          <li>starter@mariusmueller.media · starter123 <span className="text-violet-400">(Pro)</span></li>
          <li>pro@mariusmueller.media · pro123 <span className="text-violet-400">(Pro)</span></li>
          <li>admin@mariusmueller.media · admin123 <span className="text-emerald-400">(Pro + Admin)</span></li>
        </ul>
      </div>
    </div>
  );
}
