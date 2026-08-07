import { getSession } from "@/lib/auth/session";
import { MEMBERS } from "@/lib/data/community";
import { Avatar } from "@/components/ui/avatar";
import { TierBadge } from "@/components/ui/tier-badge";

export const metadata = { title: "Mitglieder" };

export default async function MembersPage() {
  const session = (await getSession())!;
  const online = MEMBERS.filter((m) => m.online).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Mitglieder</h1>
        <p className="mt-2 text-zinc-400">
          {MEMBERS.length + 1} Mitglieder ·{" "}
          <span className="text-emerald-400">{online + 1} gerade online</span>
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Eigene Karte zuerst */}
        <div className="rounded-3xl border border-brand-500/30 bg-brand-500/5 p-6">
          <div className="mb-4 flex items-center gap-4">
            <Avatar name={session.name} gradient={session.avatarColor} size="lg" online />
            <div className="min-w-0">
              <p className="truncate font-semibold text-white">{session.name} (du)</p>
              <p className="truncate text-sm text-zinc-500">{session.email}</p>
            </div>
          </div>
          <TierBadge tier={session.tier} />
        </div>

        {MEMBERS.map((member) => (
          <div
            key={member.name}
            className="rounded-3xl border border-white/8 bg-surface-900/70 p-6 transition hover:border-white/15"
          >
            <div className="mb-4 flex items-center gap-4">
              <Avatar
                name={member.name}
                gradient={member.avatarColor}
                size="lg"
                online={member.online}
              />
              <div className="min-w-0">
                <p className="truncate font-semibold text-white">{member.name}</p>
                <p className="truncate text-sm text-zinc-500">{member.role}</p>
              </div>
            </div>
            <TierBadge tier={member.tier} />
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-zinc-600">
        Mitgliederliste ist im Gerüst noch statisch — später kommt sie aus der Nutzer-Datenbank.
      </p>
    </div>
  );
}
