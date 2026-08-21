import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Play,
} from "lucide-react";
import { getSession } from "@/lib/auth/session";
import { findUserByEmail } from "@/lib/auth/users";
import { hasAccess } from "@/lib/tiers";
import { getLesson } from "@/lib/data/curriculum";
import { PLATTFORM_URL } from "@/lib/config";
import { TierBadge } from "@/components/ui/tier-badge";
import { CheatSheet } from "@/components/app/cheat-sheet";
import { FontSchau } from "@/components/app/font-schau";
import { DnsTool } from "@/components/app/dns-tool";
import { DomainCheck } from "@/components/app/domain-check";
import { MailPrompt } from "@/components/app/mail-prompt";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ modul: string; lektion: string }>;
}) {
  const { modul, lektion } = await params;
  const found = getLesson(modul, lektion);
  if (!found) notFound();
  const { module: courseModule, lesson, index } = found;

  const session = (await getSession())!;
  // Serverseitige Freischaltung: gesperrte Inhalte werden nie ausgeliefert
  if (!hasAccess(session.tier, courseModule.tier)) {
    redirect(`/kurse/${courseModule.slug}`);
  }

  const prev = courseModule.lessons[index - 1];
  const next = courseModule.lessons[index + 1];

  // Persönlichen API-Schlüssel des Nutzers in die Prompts einsetzen —
  // so ist der kopierte Prompt schon fertig, ohne Bastelei.
  const user = findUserByEmail(session.email);
  const sheet =
    lesson.cheatSheet && user
      ? {
          ...lesson.cheatSheet,
          prompts: lesson.cheatSheet.prompts?.map((p) => ({
            ...p,
            text: p.text
              .replaceAll("{DEIN-API-KEY}", user.apiKey)
              .replaceAll("{PLATTFORM-URL}", PLATTFORM_URL),
          })),
        }
      : lesson.cheatSheet && {
          ...lesson.cheatSheet,
          prompts: lesson.cheatSheet.prompts?.map((p) => ({
            ...p,
            text: p.text.replaceAll("{PLATTFORM-URL}", PLATTFORM_URL),
          })),
        };

  return (
    <div className="space-y-8">
      <Link
        href={`/kurse/${courseModule.slug}`}
        className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
      >
        <ArrowLeft className="size-4" /> {courseModule.title}
      </Link>

      <div>
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <TierBadge tier={courseModule.tier} />
          <span className="flex items-center gap-1.5 text-sm text-zinc-500">
            <Clock className="size-4" /> {lesson.duration} Min.
          </span>
          <span className="text-sm text-zinc-500">
            Lektion {index + 1} von {courseModule.lessons.length}
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          {lesson.title}
        </h1>
      </div>

      {/* Video links, Infos rechts — gleiche Höhe, Box scrollt mit */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.85fr)_minmax(20rem,1fr)] xl:items-start">
        {/* min-w-0: sonst wächst die Spalte mit breitem Inhalt mit, statt ihn
            seitlich scrollen zu lassen */}
        <div className="min-w-0 space-y-6">
          {/* Video-Platzhalter — später: echter Player (z. B. Mux, Bunny, Vimeo) */}
          <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-surface-800 to-surface-950">
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-10 ${courseModule.gradient}`} />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <button
                  type="button"
                  className="mx-auto mb-4 grid size-20 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition group-hover:scale-105 group-hover:bg-brand-500/80"
                  aria-label="Video abspielen"
                >
                  <Play className="size-8 translate-x-0.5" />
                </button>
                <p className="text-sm text-zinc-400">
                  Video-Inhalt folgt — hier kommt später dein Kursvideo hin.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/8 bg-surface-900/70 p-8">
            <h2 className="mb-3 text-lg font-semibold text-white">Worum geht&apos;s?</h2>
            <p className="leading-relaxed text-zinc-300">{lesson.description}</p>

            {lesson.steps?.length ? (
              <>
                <h3 className="mt-8 mb-4 text-sm font-semibold uppercase tracking-widest text-brand-300">
                  Das machst du
                </h3>
                <ol className="space-y-3">
                  {lesson.steps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg bg-brand-500/15 text-xs font-semibold text-brand-300">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed text-zinc-300">{step}</span>
                    </li>
                  ))}
                </ol>
              </>
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-surface-950/40 p-6 text-sm text-zinc-500">
                Die Schritte zu dieser Lektion folgen mit dem Video.
              </div>
            )}
            <button
              type="button"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-2.5 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/20"
            >
              <CheckCircle2 className="size-4" />
              Als erledigt markieren
            </button>
          </div>

          {lesson.fontSchau ? <FontSchau /> : null}
          {lesson.dnsTool ? <DnsTool /> : null}
          {lesson.domainCheck ? <DomainCheck /> : null}
        </div>

        {/* bleibt beim Scrollen stehen, damit die Prompts immer greifbar sind */}
        <div className="space-y-6 xl:sticky xl:top-6 xl:max-h-[calc(100vh-3rem)] xl:overflow-y-auto">
          {lesson.mailPrompt ? <MailPrompt apiKey={user?.apiKey} /> : null}
          <CheatSheet
            sheet={sheet}
            apiKey={sheet?.apiKeyHint ? user?.apiKey : undefined}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        {prev ? (
          <Link
            href={`/kurse/${courseModule.slug}/${prev.slug}`}
            className="group flex min-w-0 items-center gap-3 rounded-2xl border border-white/8 bg-surface-900/70 px-5 py-3.5 transition hover:border-white/15"
          >
            <ArrowLeft className="size-4 shrink-0 text-zinc-500 transition-transform group-hover:-translate-x-0.5" />
            <span className="min-w-0">
              <span className="block text-xs text-zinc-500">Zurück</span>
              <span className="block truncate text-sm font-medium text-white">{prev.title}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/kurse/${courseModule.slug}/${next.slug}`}
            className="group flex min-w-0 items-center gap-3 rounded-2xl border border-brand-500/30 bg-brand-500/10 px-5 py-3.5 text-right transition hover:border-brand-500/50"
          >
            <span className="min-w-0">
              <span className="block text-xs text-brand-300/70">Weiter</span>
              <span className="block truncate text-sm font-medium text-white">{next.title}</span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-brand-300 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <Link
            href="/kurse"
            className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3.5 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/20"
          >
            Modul abgeschlossen 🎉 Zur Kursübersicht
          </Link>
        )}
      </div>
    </div>
  );
}
