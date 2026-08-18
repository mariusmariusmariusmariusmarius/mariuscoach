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
  /** Persönlicher Schlüssel für die Bewertungs-API (mm_…) */
  apiKey: string;
};

const seedUsers: User[] = [
  // Alle Demo-Accounts vorerst auf Pro, damit beim Testen überall Zugriff
  // besteht. Die Namen bleiben, damit klar ist, welcher Account welche
  // Stufe simulieren SOLL — zurückstellen geht in den Einstellungen oder hier.
  {
    id: "u_demo_free",
    name: "Demo Free",
    email: "demo@mariusmueller.media",
    password: "demo123",
    tier: "pro",
    role: "member",
    avatarColor: "from-sky-500 to-cyan-400",
    createdAt: "2026-01-10",
    apiKey: "mm_demo_free_0000000000000000000000000000",
  },
  {
    id: "u_demo_starter",
    name: "Demo Starter",
    email: "starter@mariusmueller.media",
    password: "starter123",
    tier: "pro",
    role: "member",
    avatarColor: "from-amber-400 to-orange-500",
    createdAt: "2026-02-02",
    apiKey: "mm_demo_starter_00000000000000000000000000",
  },
  {
    id: "u_demo_pro",
    name: "Demo Pro",
    email: "pro@mariusmueller.media",
    password: "pro123",
    tier: "pro",
    role: "member",
    avatarColor: "from-violet-500 to-fuchsia-500",
    createdAt: "2026-03-15",
    apiKey: "mm_demo_pro_000000000000000000000000000000",
  },
  {
    id: "u_marius",
    name: "Marius",
    email: "admin@mariusmueller.media",
    password: "admin123",
    tier: "pro",
    role: "admin",
    avatarColor: "from-emerald-500 to-teal-400",
    createdAt: "2025-12-01",
    apiKey: "mm_admin_0000000000000000000000000000000000",
  },
];

/** mm_ + 40 Hex-Zeichen — pro Account einmalig, zeigt nie Systeminternas */
export function neuerApiKey(): string {
  const b = new Uint8Array(20);
  crypto.getRandomValues(b);
  return "mm_" + [...b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

// globalThis, damit der Store Hot-Reloads im Dev-Modus überlebt
const store = globalThis as unknown as { __mcUsers?: Map<string, User> };
if (!store.__mcUsers) {
  store.__mcUsers = new Map(seedUsers.map((u) => [u.email, u]));
}
const users = store.__mcUsers;

// Bestehende Einträge (aus früheren Dev-Läufen) ohne Schlüssel nachrüsten
for (const u of users.values()) {
  if (!u.apiKey) u.apiKey = neuerApiKey();
}

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
    apiKey: neuerApiKey(),
  };
  users.set(email, user);
  return { user };
}

export function findUserByApiKey(apiKey: string): User | undefined {
  for (const u of users.values()) {
    if (u.apiKey === apiKey) return u;
  }
  return undefined;
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
