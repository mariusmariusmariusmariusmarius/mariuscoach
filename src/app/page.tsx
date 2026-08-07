import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  Globe,
  GraduationCap,
  MessagesSquare,
  Play,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { DataIcon } from "@/components/icon-map";
import { TierBadge } from "@/components/ui/tier-badge";
import { CURRICULUM, totalLessons } from "@/lib/data/curriculum";
import { TIERS, TIER_INFO } from "@/lib/tiers";

const TOPICS = [
  "Domains", "Hosting", "Websites mit Claude", "Landingpages", "Lead-Automation",
  "E-Mail-Automation", "Meta Ads", "Google Ads", "Conversion-Tracking", "Onlineshops",
  "Zahlungsanbieter", "Abo-Modelle", "Datenbanken", "Webhooks", "Login-Bereiche",
  "Terminbuchung", "Admin-Apps", "Rechtstexte", "KI-Bilder",
];

const FEATURES = [
  {
    icon: GraduationCap,
    title: "Schritt für Schritt zum Ergebnis",
    text: "Kein Theorie-Marathon: Jedes Modul endet mit etwas, das live ist — deine Website, dein Formular, dein Shop.",
  },
  {
    icon: Globe,
    title: "Unabhängig statt Baukasten",
    text: "Du lernst, Websites zu bauen, die dir gehören. Kein Abo-Baukasten, keine Limits, volle Kontrolle.",
  },
  {
    icon: MessagesSquare,
    title: "Community, die antwortet",
    text: "Offene Fragen, echte Cases, ehrliches Feedback — du baust nicht allein.",
  },
  {
    icon: Zap,
    title: "Automation von Anfang an",
    text: "Leads, E-Mails, Termine: Du baust dir Systeme, die arbeiten, während du schläfst.",
  },
  {
    icon: ShieldCheck,
    title: "Rechtssicher & sauber",
    text: "Impressum, Datenschutz, Tracking-Consent — von Anfang an richtig aufgesetzt.",
  },
  {
    icon: Users,
    title: "Vom Hobby zum Business",
    text: "Ads, Shops, eigene Tools: Der Weg von der ersten Domain bis zum bezahlten Kundenprojekt.",
  },
];

export default function LandingPage() {
  return (
    <div className="bg-noise min-h-screen overflow-x-clip">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl glass px-5 py-3 mx-4 lg:mx-auto">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm text-zinc-300 md:flex">
            <a href="#kurse" className="transition hover:text-white">Kurse</a>
            <a href="#community" className="transition hover:text-white">Community</a>
            <a href="#preise" className="transition hover:text-white">Preise</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-xl px-4 py-2 text-sm font-medium text-zinc-300 transition hover:text-white"
            >
              Login
            </Link>
            <Link
              href="/registrieren"
              className="rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:opacity-90"
            >
              Kostenlos starten
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-4 pb-24 pt-40">
        {/* Deko-Glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[560px] w-[860px] -translate-x-1/2 rounded-full bg-brand-600/25 blur-[140px] animate-glow-pulse" />
          <div className="absolute right-[8%] top-64 h-72 w-72 rounded-full bg-accent-500/15 blur-[110px]" />
          <div className="absolute left-[6%] top-96 h-64 w-64 rounded-full bg-sky-500/10 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-300">
            <span className="size-2 rounded-full bg-emerald-400" />
            Die Lernplattform für Web-Selbermacher
          </p>
          <h1 className="animate-fade-up text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl" style={{ animationDelay: "80ms" }}>
            Bau deine Website.
            <br />
            <span className="text-gradient">Bau dein Business.</span>
          </h1>
          <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-pretty text-lg text-zinc-400 md:text-xl" style={{ animationDelay: "160ms" }}>
            Von der ersten Domain bis zur eigenen Admin-App: Lerne, wie du Websites,
            Shops und Tools selbst baust — mit Claude, ohne Baukasten, mit einer
            Community, die dich weiterbringt.
          </p>
          <div className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: "240ms" }}>
            <Link
              href="/registrieren"
              className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 to-accent-500 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-brand-600/30 transition hover:scale-[1.02]"
            >
              Kostenlos starten
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#kurse"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-7 py-3.5 text-base font-medium text-zinc-200 backdrop-blur transition hover:bg-white/10"
            >
              <Play className="size-4 text-brand-400" />
              Curriculum ansehen
            </a>
          </div>

          {/* Stats */}
          <div className="animate-fade-up mx-auto mt-16 grid max-w-2xl grid-cols-3 divide-x divide-white/10 rounded-2xl glass py-5" style={{ animationDelay: "320ms" }}>
            {[
              { value: `${CURRICULUM.length}`, label: "Module" },
              { value: `${totalLessons()}+`, label: "Lektionen" },
              { value: "1:1", label: "Praxis-Cases" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-white md:text-3xl">{stat.value}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Themen-Marquee */}
      <section className="border-y border-white/5 bg-surface-900/60 py-5">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex shrink-0 animate-marquee gap-3 pr-3">
            {[...TOPICS, ...TOPICS].map((topic, i) => (
              <span
                key={`${topic}-${i}`}
                className="whitespace-nowrap rounded-full border border-white/8 bg-white/[0.04] px-4 py-1.5 text-sm text-zinc-400"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Alles, was du brauchst.{" "}
            <span className="text-gradient">Nichts, was dich aufhält.</span>
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl border border-white/8 bg-surface-900/70 p-7 transition hover:border-brand-500/30 hover:bg-surface-850"
            >
              <div className="mb-5 inline-grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 text-brand-300 ring-1 ring-brand-500/20 transition group-hover:scale-105">
                <feature.icon className="size-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum */}
      <section id="kurse" className="relative mx-auto max-w-6xl scroll-mt-24 px-4 py-24">
        <div className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-400">Das Curriculum</p>
            <h2 className="max-w-xl text-3xl font-bold tracking-tight md:text-5xl">
              Von <span className="text-gradient">„Was ist eine Domain?“</span> bis zur eigenen Admin-App
            </h2>
          </div>
          <p className="max-w-sm text-sm text-zinc-400">
            {CURRICULUM.length} Module, {totalLessons()} Lektionen — jede Stufe deines
            Accounts schaltet neue Inhalte frei.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CURRICULUM.map((mod, i) => (
            <div
              key={mod.slug}
              className="group relative overflow-hidden rounded-3xl border border-white/8 bg-surface-900/70 p-7 transition hover:-translate-y-1 hover:border-white/15"
            >
              <div className={`pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-gradient-to-br opacity-15 blur-2xl transition group-hover:opacity-30 ${mod.gradient}`} />
              <div className="mb-5 flex items-start justify-between">
                <div className={`inline-grid size-12 place-items-center rounded-2xl bg-gradient-to-br text-white ${mod.gradient}`}>
                  <DataIcon name={mod.icon} className="size-6" />
                </div>
                <TierBadge tier={mod.tier} />
              </div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Modul {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mb-2 text-xl font-semibold text-white">{mod.title}</h3>
              <p className="mb-5 text-sm leading-relaxed text-zinc-400">{mod.subtitle}</p>
              <p className="flex items-center gap-2 text-xs text-zinc-500">
                <BookOpen className="size-3.5" />
                {mod.lessons.length} Lektionen ·{" "}
                {mod.lessons.reduce((sum, lesson) => sum + lesson.duration, 0)} Min.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Community-Teaser */}
      <section id="community" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-surface-850 to-surface-900 p-10 md:p-16">
          <div className="pointer-events-none absolute -left-24 -top-24 size-96 rounded-full bg-brand-600/20 blur-[100px]" />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-400">Community</p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                Du baust nicht allein.
              </h2>
              <p className="mb-8 text-zinc-400">
                Stell offene Fragen, teile deine Cases, feier deine Wins. In der
                Community bekommst du Antworten von mir und von Leuten, die genau
                da waren, wo du gerade bist.
              </p>
              <ul className="space-y-3">
                {["Offene Fragen — beantwortet statt ignoriert", "Cases & Projekte mit echtem Feedback", "Pro-Lounge mit Live-Sessions & Q&A"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-zinc-300">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
                      <Check className="size-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Chat-Mock */}
            <div className="animate-float space-y-3">
              {[
                { name: "Lena K.", color: "from-rose-400 to-pink-500", text: "Formular läuft — erste Anfrage nach 2 Tagen! 🎉" },
                { name: "Marius", color: "from-emerald-500 to-teal-400", text: "Stark! Jetzt E-Mail-Automation drauf, dann läuft's von allein." },
                { name: "Jonas B.", color: "from-indigo-400 to-blue-500", text: "Kundenwebsite live: Idee → online in 6 Tagen 🚀" },
              ].map((msg, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-2xl glass p-4"
                  style={{ marginLeft: `${i * 14}px` }}
                >
                  <span className={`grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br text-xs font-bold text-white ${msg.color}`}>
                    {msg.name[0]}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-zinc-400">{msg.name}</p>
                    <p className="text-sm text-zinc-200">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="preise" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-400">Preise</p>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Starte kostenlos. <span className="text-gradient">Wachse, wenn du bereit bist.</span>
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {TIERS.map((tier) => {
            const info = TIER_INFO[tier];
            return (
              <div
                key={tier}
                className={`relative flex flex-col rounded-3xl border p-8 ${
                  info.highlight
                    ? "border-brand-500/40 bg-surface-850 ring-glow"
                    : "border-white/8 bg-surface-900/70"
                }`}
              >
                {info.highlight && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">
                    Beliebt
                  </span>
                )}
                <div className="mb-1 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">{info.label}</h3>
                  <TierBadge tier={tier} />
                </div>
                <p className="mb-6 text-sm text-zinc-400">{info.tagline}</p>
                <div className="mb-8 flex items-baseline gap-2">
                  <span className="text-5xl font-bold tracking-tight text-white">{info.price}</span>
                  <span className="text-sm text-zinc-500">{info.priceHint}</span>
                </div>
                <ul className="mb-8 flex-1 space-y-3">
                  {info.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-zinc-300">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-300">
                        <Check className="size-3" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/registrieren"
                  className={`rounded-2xl py-3 text-center text-sm font-semibold transition ${
                    info.highlight
                      ? "bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-600/30 hover:opacity-90"
                      : "border border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10"
                  }`}
                >
                  {tier === "free" ? "Kostenlos starten" : `${info.label} wählen`}
                </Link>
              </div>
            );
          })}
        </div>
        <p className="mt-8 text-center text-sm text-zinc-500">
          Zahlungsabwicklung (Stripe) wird angebunden — aktuell ist die Plattform im Aufbau.
        </p>
      </section>

      {/* Finaler CTA */}
      <section className="mx-auto max-w-4xl px-4 pb-28 pt-8 text-center">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-brand-500/25 bg-gradient-to-br from-brand-600/20 via-surface-900 to-accent-500/10 px-8 py-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
            Deine erste eigene Website
            <br />
            ist <span className="text-gradient">näher als du denkst.</span>
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-zinc-400">
            Erstell deinen kostenlosen Account und starte heute mit den Basics —
            keine Kreditkarte nötig.
          </p>
          <Link
            href="/registrieren"
            className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 to-accent-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-brand-600/40 transition hover:scale-[1.02]"
          >
            Jetzt kostenlos starten
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-surface-900/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 md:flex-row">
          <Logo />
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400">
            <Link href="/impressum" className="transition hover:text-white">Impressum</Link>
            <Link href="/datenschutz" className="transition hover:text-white">Datenschutz</Link>
            <Link href="/agb" className="transition hover:text-white">AGB</Link>
          </nav>
          <p className="text-sm text-zinc-500">© 2026 MariusCoach</p>
        </div>
      </footer>
    </div>
  );
}
