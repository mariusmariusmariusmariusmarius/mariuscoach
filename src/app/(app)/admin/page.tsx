import { redirect } from "next/navigation";
import { BookOpen, Database, GraduationCap, Users } from "lucide-react";
import { getSession } from "@/lib/auth/session";
import { listUsers } from "@/lib/auth/users";
import { CURRICULUM, totalLessons } from "@/lib/data/curriculum";
import { TierBadge } from "@/components/ui/tier-badge";
import { Avatar } from "@/components/ui/avatar";
import { DataIcon } from "@/components/icon-map";

export const metadata = { title: "Admin" };

export default async function AdminPage() {
  const session = (await getSession())!;
  // Nur Admins — alle anderen landen im Dashboard
  if (session.role !== "admin") redirect("/dashboard");

  const users = listUsers();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Admin</h1>
        <p className="mt-2 text-zinc-400">
          Dein Cockpit: Nutzer, Inhalte und später alles, was die Plattform steuert.
        </p>
      </div>

      {/* Kennzahlen */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Users, value: users.length, label: "Registrierte Nutzer" },
          { icon: GraduationCap, value: CURRICULUM.length, label: "Module" },
          { icon: BookOpen, value: totalLessons(), label: "Lektionen" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-3xl border border-white/8 bg-surface-900/70 p-6">
            <div className="mb-4 inline-grid size-10 place-items-center rounded-xl bg-brand-500/15 text-brand-300">
              <stat.icon className="size-5" />
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="mt-1 text-sm text-zinc-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Nutzerverwaltung */}
      <section className="rounded-3xl border border-white/8 bg-surface-900/70 p-7">
        <h2 className="mb-5 text-lg font-semibold text-white">Nutzer</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/8 text-xs uppercase tracking-widest text-zinc-500">
                <th className="pb-3 pr-4 font-medium">Nutzer</th>
                <th className="pb-3 pr-4 font-medium">Stufe</th>
                <th className="pb-3 pr-4 font-medium">Rolle</th>
                <th className="pb-3 font-medium">Dabei seit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={user.name} gradient={user.avatarColor} size="sm" />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-white">{user.name}</p>
                        <p className="truncate text-xs text-zinc-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 pr-4">
                    <TierBadge tier={user.tier} />
                  </td>
                  <td className="py-3.5 pr-4 text-zinc-400">
                    {user.role === "admin" ? "Admin" : "Mitglied"}
                  </td>
                  <td className="py-3.5 text-zinc-500">{user.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-zinc-600">
          Aktionen (Stufe ändern, sperren, löschen) kommen mit der Datenbank-Anbindung.
        </p>
      </section>

      {/* Inhalte */}
      <section className="rounded-3xl border border-white/8 bg-surface-900/70 p-7">
        <h2 className="mb-5 text-lg font-semibold text-white">Inhalte</h2>
        <div className="space-y-3">
          {CURRICULUM.map((mod) => (
            <div
              key={mod.slug}
              className="flex items-center gap-4 rounded-2xl border border-white/8 bg-surface-950/40 p-4"
            >
              <span className={`grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white ${mod.gradient}`}>
                <DataIcon name={mod.icon} className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-white">{mod.title}</p>
                <p className="text-xs text-zinc-500">{mod.lessons.length} Lektionen</p>
              </div>
              <TierBadge tier={mod.tier} />
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap-Hinweis */}
      <section className="rounded-3xl border border-dashed border-white/10 bg-surface-900/40 p-7">
        <div className="mb-3 flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-white/5 text-zinc-400">
            <Database className="size-5" />
          </span>
          <h3 className="font-semibold text-zinc-300">Als Nächstes hier</h3>
        </div>
        <ul className="list-inside list-disc space-y-1.5 text-sm text-zinc-500">
          <li>Lektionen anlegen & bearbeiten (statt statischer Curriculum-Datei)</li>
          <li>Video-Uploads für Kursinhalte</li>
          <li>Community-Moderation (Beiträge anpinnen, löschen)</li>
          <li>Umsatz-Übersicht aus Stripe</li>
        </ul>
      </section>
    </div>
  );
}
