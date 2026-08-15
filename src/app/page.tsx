import Link from "next/link";
import {
  ArrowRight,
  Check,
  ClipboardCopy,
  Globe,
  GraduationCap,
  MessagesSquare,
  Play,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { TierBadge } from "@/components/ui/tier-badge";
import {
  CountUp,
  DriftBlob,
  Pressable,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/motion-primitives";
import { CurriculumExplorer } from "@/components/landing/curriculum-explorer";
import { CURRICULUM, totalLessons } from "@/lib/data/curriculum";
import { TIERS, TIER_INFO } from "@/lib/tiers";

const TOTAL_HOURS = Math.round(
  CURRICULUM.reduce(
    (sum, m) => sum + m.lessons.reduce((s, l) => s + l.duration, 0),
    0
  ) / 60
);

const TOPICS = [
  "Domains", "Hosting", "Websites mit Claude", "Landingpages", "Lead-Automation",
  "E-Mail-Automation", "SEO", "Google My Business", "Meta Ads", "Google Ads",
  "Conversion-Tracking", "Onlineshops", "Zahlungsanbieter", "Abo-Modelle",
  "Datenbanken", "Webhooks", "Login-Bereiche", "Terminbuchung", "Admin-Apps",
  "Rechtstexte", "KI-Bilder", "Websites verkaufen",
];

const FEATURES = [
  {
    icon: Zap,
    title: "Speed is key",
    text: "Website an einem Tag statt in Monaten. Wir sind keine Nerds — wir wollen Ergebnisse. Claude regelt die Technik, du triffst die Entscheidungen.",
  },
  {
    icon: ClipboardCopy,
    title: "Fertige Prompts & Infos",
    text: "Neben jedem Video: die exakten Prompts zum Kopieren, alle Skills mit Links, jede verwendete Software. Nachmachen statt rätseln.",
  },
  {
    icon: Globe,
    title: "Unabhängig statt Baukasten",
    text: "Deine Website gehört dir — gehostet für 0 € statt 20–40 € Baukasten-Abo im Monat. Keine Limits, volle Kontrolle.",
  },
  {
    icon: ShieldCheck,
    title: "Aus 200+ echten Projekten",
    text: "Über 5 Jahre und 200 gebaute Websites: echte Cases, echte Zahlen, echte Fehler zum Draus-Lernen — nichts aus der Theorie.",
  },
  {
    icon: GraduationCap,
    title: "66 Lektionen, ein roter Faden",
    text: "Von der Domain bis zur eigenen App — jede Lektion endet mit einem sichtbaren Ergebnis, das live ist.",
  },
  {
    icon: MessagesSquare,
    title: "Community & 1:1-Coaching",
    text: "Offene Fragen werden beantwortet, Cases besprochen — und als Pro-Mitglied hast du 30 Minuten 1:1 pro Woche.",
  },
];

export default function LandingPage() {
  return (
    <div className="bg-noise min-h-screen overflow-x-clip">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50">
        <Reveal y={-18}>
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
              <Pressable>
                <Link
                  href="/registrieren"
                  className="block rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-600/30"
                >
                  Kostenlos starten
                </Link>
              </Pressable>
            </div>
          </div>
        </Reveal>
      </header>

      {/* Hero */}
      <section className="relative px-4 pb-24 pt-40">
        {/* Animierte Deko-Glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <DriftBlob
            className="absolute -top-40 left-1/2 h-[560px] w-[860px] -translate-x-1/2 rounded-full bg-brand-600/25 blur-[140px]"
            duration={22}
            dx={70}
            dy={40}
          />
          <DriftBlob
            className="absolute right-[8%] top-64 h-72 w-72 rounded-full bg-accent-500/15 blur-[110px]"
            duration={16}
            dx={-50}
            dy={50}
          />
          <DriftBlob
            className="absolute left-[6%] top-96 h-64 w-64 rounded-full bg-sky-500/10 blur-[100px]"
            duration={19}
            dx={45}
            dy={-40}
          />
        </div>

        <Stagger className="relative mx-auto max-w-4xl text-center" stagger={0.1}>
          <StaggerItem>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-300">
              <span className="size-2 animate-glow-pulse rounded-full bg-emerald-400" />
              Die Lernplattform für Web-Selbermacher
            </p>
          </StaggerItem>
          <StaggerItem>
            <h1 className="text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              Bau deine Website.
              <br />
              <span className="text-gradient">Bau dein Business.</span>
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-zinc-400 md:text-xl">
              Von der ersten Domain bis zur eigenen Admin-App: Lerne, wie du Websites,
              Shops und Tools selbst baust — mit Claude, ohne Baukasten, mit einer
              Community, die dich weiterbringt.
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Pressable>
                <Link
                  href="/registrieren"
                  className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 to-accent-500 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-brand-600/30"
                >
                  Kostenlos starten
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Pressable>
              <Pressable>
                <a
                  href="#kurse"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-7 py-3.5 text-base font-medium text-zinc-200 backdrop-blur"
                >
                  <Play className="size-4 text-brand-400" />
                  Curriculum ansehen
                </a>
              </Pressable>
            </div>
          </StaggerItem>

          {/* Stats mit Count-up */}
          <StaggerItem>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 divide-x divide-white/10 rounded-2xl glass py-5">
              <div>
                <div className="font-display text-2xl font-bold text-white md:text-3xl">
                  <CountUp to={CURRICULUM.length} />
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-zinc-500">Module</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-white md:text-3xl">
                  <CountUp to={totalLessons()} />
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-zinc-500">Lektionen</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-white md:text-3xl">
                  <CountUp to={TOTAL_HOURS} suffix="+" />
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-zinc-500">Stunden</div>
              </div>
            </div>
          </StaggerItem>
        </Stagger>
      </section>

      {/* VSL: Wer ich bin & warum ich das mache */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Video */}
          <Reveal>
            <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-surface-800 to-surface-950 ring-glow">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-600/20 to-accent-500/10" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <button
                    type="button"
                    className="mx-auto mb-4 grid size-20 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur transition group-hover:scale-105 group-hover:bg-brand-500/80"
                    aria-label="Video abspielen"
                  >
                    <Play className="size-8 translate-x-0.5" />
                  </button>
                  <p className="text-sm font-medium text-zinc-300">
                    Warum ich meinen eigenen Job überflüssig mache
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">3:45 Min. · mit Marius</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Botschaft */}
          <Reveal delay={0.12}>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-400">
              Warum es diese Plattform gibt
            </p>
            <h2 className="mb-5 text-balance text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              Webdesign als Dienstleistung{" "}
              <span className="text-gradient">hat bald ausgedient.</span>
            </h2>
            <div className="space-y-4 text-zinc-400">
              <p>
                Ich habe über 200 Websites gebaut und damit mein Geld verdient.
                Heute baue ich eine komplette Kundenwebsite in zwei Stunden — mit
                zwölf Prompts. Der Preis für diese Dienstleistung geht langfristig
                gegen null, weil jeder es selbst machen kann.
              </p>
              <p className="font-medium text-zinc-200">
                Nur beantwortet dir die KI nicht das Drumherum:
              </p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {[
                  "Wem gehört meine Domain?",
                  "Wie ziehen meine E-Mails um?",
                  "Wo läuft die Seite — und was kostet sie?",
                  "Warum sieht meine Seite billig aus?",
                  "Wie werde ich bei Google gefunden?",
                  "Wie tracke ich meine Werbeanzeigen?",
                ].map((q) => (
                  <li key={q} className="flex items-start gap-2 text-sm text-zinc-300">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-300">
                      <Check className="size-3" />
                    </span>
                    {q}
                  </li>
                ))}
              </ul>
              <p className="text-lg font-semibold text-white">
                Du brauchst mich nicht als Dienstleister.
                <br />
                Du brauchst mich einmal als Erklärer.
              </p>
            </div>
          </Reveal>
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
        <Reveal className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Alles, was du brauchst.{" "}
            <span className="text-gradient">Nichts, was dich aufhält.</span>
          </h2>
        </Reveal>
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {FEATURES.map((feature) => (
            <StaggerItem key={feature.title} hoverLift>
              <div className="group h-full rounded-3xl border border-white/8 bg-surface-900/70 p-7 transition-colors hover:border-brand-500/30 hover:bg-surface-850">
                <div className="mb-5 inline-grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 text-brand-300 ring-1 ring-brand-500/20 transition group-hover:scale-105">
                  <feature.icon className="size-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{feature.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Curriculum */}
      <section id="kurse" className="relative mx-auto max-w-6xl scroll-mt-24 px-4 py-24">
        <Reveal className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-400">Das Curriculum</p>
            <h2 className="max-w-xl text-3xl font-bold tracking-tight md:text-5xl">
              Von <span className="text-gradient">„Was ist eine Domain?“</span> bis zum eigenen Business
            </h2>
          </div>
          <p className="max-w-sm text-sm text-zinc-400">
            {CURRICULUM.length} Module, {totalLessons()} Lektionen, {TOTAL_HOURS}+ Stunden —
            klick dich durch jedes Modul und sieh dir jede einzelne Lektion an.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <CurriculumExplorer />
        </Reveal>

        {/* Der Weg in 9 Stationen */}
        <Reveal delay={0.05}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-3 text-sm text-zinc-500">
            {CURRICULUM.map((mod, i) => (
              <span key={mod.slug} className="flex items-center gap-2">
                <span className="text-zinc-300">{mod.title}</span>
                {i < CURRICULUM.length - 1 && (
                  <ArrowRight className="size-3.5 text-zinc-700" />
                )}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Community-Teaser */}
      <section id="community" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-surface-850 to-surface-900 p-10 md:p-16">
          <DriftBlob
            className="pointer-events-none absolute -left-24 -top-24 size-96 rounded-full bg-brand-600/20 blur-[100px]"
            duration={20}
            dx={60}
            dy={30}
          />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
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
            </Reveal>
            {/* Chat-Mock */}
            <Stagger className="animate-float space-y-3" stagger={0.18} delay={0.2}>
              {[
                { name: "Lena K.", color: "from-rose-400 to-pink-500", text: "Formular läuft — erste Anfrage nach 2 Tagen! 🎉" },
                { name: "Marius", color: "from-emerald-500 to-teal-400", text: "Stark! Jetzt E-Mail-Automation drauf, dann läuft's von allein." },
                { name: "Jonas B.", color: "from-indigo-400 to-blue-500", text: "Kundenwebsite live: Idee → online in 6 Tagen 🚀" },
              ].map((msg, i) => (
                <StaggerItem key={i} y={18}>
                  <div
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
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="preise" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24">
        <Reveal className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-400">Preise</p>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Starte kostenlos. <span className="text-gradient">Wachse, wenn du bereit bist.</span>
          </h2>
        </Reveal>
        <Stagger className="grid gap-6 lg:grid-cols-3" stagger={0.1}>
          {TIERS.map((tier) => {
            const info = TIER_INFO[tier];
            return (
              <StaggerItem key={tier} hoverLift className="h-full">
                <div
                  className={`relative flex h-full flex-col rounded-3xl border p-8 ${
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
                    <span className="font-display text-5xl font-bold tracking-tight text-white">{info.price}</span>
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
                  <Pressable>
                    <Link
                      href="/registrieren"
                      className={`block rounded-2xl py-3 text-center text-sm font-semibold ${
                        info.highlight
                          ? "bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-600/30"
                          : "border border-white/10 bg-white/5 text-zinc-200"
                      }`}
                    >
                      {tier === "free" ? "Kostenlos starten" : `${info.label} wählen`}
                    </Link>
                  </Pressable>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
        <Reveal delay={0.15}>
          <p className="mt-8 text-center text-sm text-zinc-500">
            Zahlungsabwicklung (Stripe) wird angebunden — aktuell ist die Plattform im Aufbau.
          </p>
        </Reveal>
      </section>

      {/* Finaler CTA */}
      <section className="mx-auto max-w-4xl px-4 pb-28 pt-8 text-center">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-brand-500/25 bg-gradient-to-br from-brand-600/20 via-surface-900 to-accent-500/10 px-8 py-16">
            <DriftBlob
              className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-brand-600/25 blur-[90px]"
              duration={15}
              dx={-40}
              dy={35}
            />
            <h2 className="relative mb-4 text-3xl font-bold tracking-tight md:text-5xl">
              Deine erste eigene Website
              <br />
              ist <span className="text-gradient">näher als du denkst.</span>
            </h2>
            <p className="relative mx-auto mb-8 max-w-xl text-zinc-400">
              Erstell deinen kostenlosen Account und starte heute mit den Basics —
              keine Kreditkarte nötig.
            </p>
            <Pressable className="relative inline-block">
              <Link
                href="/registrieren"
                className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 to-accent-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-brand-600/40"
              >
                Jetzt kostenlos starten
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Pressable>
          </div>
        </Reveal>
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
          <p className="text-sm text-zinc-500">© 2026 Marius Müller Media</p>
        </div>
      </footer>
    </div>
  );
}
