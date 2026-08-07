import type { Role, Tier } from "@/lib/tiers";

/**
 * Demo-Userstore (in-memory).
 *
 * ⚠️ Nur fürs Gerüst: Registrierte Nutzer leben im RAM und sind nach einem
 * Server-Neustart weg. Später wird das durch eine echte Datenbank (Neon +
 * Drizzle/Prisma) und gehashte Passwörter (bcrypt/argon2) ersetzt —
 * die Funktions-Signaturen hier bleiben dabei gleich.
 */

export type User = {
  id: string;
  name: string;
  email: string;
  /** Klartext nur im Demo-Modus! */
  password: string;
  tier: Tier;
  role: Role;
  avatarColor: string;
  createdAt: string;
};

const seedUsers: User[] = [
  {
    id: "u_demo_free",
    name: "Demo Free",
    email: "demo@mariuscoach.de",
    password: "demo123",
    tier: "free",
    role: "member",
    avatarColor: "from-sky-500 to-cyan-400",
    createdAt: "2026-01-10",
  },
  {
    id: "u_demo_starter",
    name: "Demo Starter",
    email: "starter@mariuscoach.de",
    password: "starter123",
    tier: "starter",
    role: "member",
    avatarColor: "from-amber-400 to-orange-500",
    createdAt: "2026-02-02",
  },
  {
    id: "u_demo_pro",
    name: "Demo Pro",
    email: "pro@mariuscoach.de",
    password: "pro123",
    tier: "pro",
    role: "member",
    avatarColor: "from-violet-500 to-fuchsia-500",
    createdAt: "2026-03-15",
  },
  {
    id: "u_marius",
    name: "Marius",
    email: "admin@mariuscoach.de",
    password: "admin123",
    tier: "pro",
    role: "admin",
    avatarColor: "from-emerald-500 to-teal-400",
    createdAt: "2025-12-01",
  },
];

// globalThis, damit der Store Hot-Reloads im Dev-Modus überlebt
const store = globalThis as unknown as { __mcUsers?: Map<string, User> };
if (!store.__mcUsers) {
  store.__mcUsers = new Map(seedUsers.map((u) => [u.email, u]));
}
const users = store.__mcUsers;

export function findUserByEmail(email: string): User | undefined {
  return users.get(email.trim().toLowerCase());
}

export function verifyCredentials(
  email: string,
  password: string
): User | undefined {
  const user = findUserByEmail(email);
  if (!user || user.password !== password) return undefined;
  return user;
}

export function createUser(input: {
  name: string;
  email: string;
  password: string;
}): { user?: User; error?: string } {
  const email = input.email.trim().toLowerCase();
  if (users.has(email)) {
    return { error: "Diese E-Mail-Adresse ist bereits registriert." };
  }
  const user: User = {
    id: `u_${crypto.randomUUID().slice(0, 8)}`,
    name: input.name.trim(),
    email,
    password: input.password,
    tier: "free",
    role: "member",
    avatarColor: "from-brand-500 to-accent-500",
    createdAt: new Date().toISOString().slice(0, 10),
  };
  users.set(email, user);
  return { user };
}

export function listUsers(): User[] {
  return [...users.values()];
}

/**
 * Demo-Helfer: Stufe eines Accounts umstellen, um die Freischaltung zu testen.
 * Später übernimmt das der Stripe-Webhook (Subscription → Tier).
 */
export function updateUserTier(email: string, tier: Tier): User | undefined {
  const user = findUserByEmail(email);
  if (!user) return undefined;
  user.tier = tier;
  return user;
}
