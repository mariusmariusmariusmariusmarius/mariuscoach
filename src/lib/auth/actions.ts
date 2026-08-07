"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createUser,
  updateUserTier,
  verifyCredentials,
  type User,
} from "@/lib/auth/users";
import {
  clearedSessionCookie,
  getSession,
  sessionCookie,
} from "@/lib/auth/session";
import { TIERS, type Tier } from "@/lib/tiers";

export type AuthFormState = { error?: string };

function toSession(user: User) {
  return {
    userId: user.id,
    name: user.name,
    email: user.email,
    tier: user.tier,
    role: user.role,
    avatarColor: user.avatarColor,
  };
}

export async function loginAction(
  _prev: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Bitte E-Mail und Passwort eingeben." };
  }

  const user = verifyCredentials(email, password);
  if (!user) {
    return { error: "E-Mail oder Passwort ist falsch." };
  }

  const jar = await cookies();
  jar.set(sessionCookie(toSession(user)));
  redirect("/dashboard");
}

export async function registerAction(
  _prev: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!name || !email || !password) {
    return { error: "Bitte alle Felder ausfüllen." };
  }
  if (password.length < 6) {
    return { error: "Das Passwort braucht mindestens 6 Zeichen." };
  }

  const { user, error } = createUser({ name, email, password });
  if (error || !user) {
    return { error: error ?? "Registrierung fehlgeschlagen." };
  }

  const jar = await cookies();
  jar.set(sessionCookie(toSession(user)));
  redirect("/dashboard");
}

export async function logoutAction(): Promise<void> {
  const jar = await cookies();
  jar.set(clearedSessionCookie());
  redirect("/login");
}

export async function forgotPasswordAction(
  _prev: AuthFormState & { done?: boolean },
  formData: FormData
): Promise<AuthFormState & { done?: boolean }> {
  const email = String(formData.get("email") ?? "");
  if (!email) {
    return { error: "Bitte E-Mail-Adresse eingeben." };
  }
  // Später: Reset-Token generieren + E-Mail via Resend verschicken.
  return { done: true };
}

/**
 * Demo-Aktion: Account-Stufe umstellen, um die Freischaltung live zu testen.
 * Später ersetzt durch Stripe-Checkout + Webhook, der das Tier in der DB setzt.
 */
export async function changeTierAction(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session) redirect("/login");

  const tier = String(formData.get("tier") ?? "");
  if (!(TIERS as readonly string[]).includes(tier)) return;

  updateUserTier(session.email, tier as Tier);
  revalidatePath("/", "layout");
}
