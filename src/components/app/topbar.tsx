import { LogOut } from "lucide-react";
import { logoutAction } from "@/lib/auth/actions";
import type { Session } from "@/lib/auth/session";
import { Avatar } from "@/components/ui/avatar";
import { TierBadge } from "@/components/ui/tier-badge";

export function AppTopbar({ session }: { session: Session }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-end gap-4 border-b border-white/5 bg-surface-950/80 px-5 py-3 backdrop-blur md:px-10">
      <TierBadge tier={session.tier} />
      <div className="flex items-center gap-3">
        <Avatar name={session.name} gradient={session.avatarColor} size="sm" />
        <span className="hidden text-sm font-medium text-zinc-200 sm:block">
          {session.name}
        </span>
      </div>
      <form action={logoutAction}>
        <button
          type="submit"
          className="grid size-9 place-items-center rounded-xl text-zinc-400 transition hover:bg-white/5 hover:text-white"
          title="Ausloggen"
        >
          <LogOut className="size-4" />
        </button>
      </form>
    </header>
  );
}
