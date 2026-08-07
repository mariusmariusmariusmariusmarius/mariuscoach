import { cookies } from "next/headers";
import type { Role, Tier } from "@/lib/tiers";
import { findUserByEmail } from "@/lib/auth/users";

/**
 * Cookie-basierte Demo-Session.
 *
 * ⚠️ Nur fürs Gerüst: Das Cookie ist nicht signiert. Später wird das durch
 * eine echte Auth-Lösung (z. B. Auth.js oder Lucia) mit signierten/
 * verschlüsselten Sessions und der Neon-Datenbank ersetzt. Alle Aufrufer
 * nutzen ausschließlich `getSession()` — der Tausch bleibt dadurch lokal.
 */

const SESSION_COOKIE = "mc_session";

export type Session = {
  userId: string;
  name: string;
  email: string;
  tier: Tier;
  role: Role;
  avatarColor: string;
};

export async function getSession(): Promise<Session | null> {
  const jar = await cookies();
  const raw = jar.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Session;
    // Session gegen den Userstore auffrischen (Tier/Rolle kann sich ändern)
    const user = findUserByEmail(parsed.email);
    if (!user) return parsed;
    return {
      userId: user.id,
      name: user.name,
      email: user.email,
      tier: user.tier,
      role: user.role,
      avatarColor: user.avatarColor,
    };
  } catch {
    return null;
  }
}

export function sessionCookie(session: Session) {
  return {
    name: SESSION_COOKIE,
    value: JSON.stringify(session),
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  };
}

export function clearedSessionCookie() {
  return {
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
}
