import { list, put } from "@vercel/blob";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";

/**
 * Dauerhafter Kleinspeicher der Plattform (Vercel Blob, Store mm-kursdaten).
 *
 * Blob-Adressen sind öffentlich, aber unerratbar — sensible Inhalte (Tokens)
 * werden deshalb zusätzlich mit AES-256-GCM verschlüsselt. Der Schlüssel
 * wird aus dem Blob-Zugriffstoken abgeleitet: kein zweites Geheimnis nötig,
 * und wer das Token hat, hat ohnehin Vollzugriff auf den Store.
 */

function konfiguriert(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function schluessel(): Buffer {
  return createHash("sha256")
    .update("mm-kursdaten:" + process.env.BLOB_READ_WRITE_TOKEN)
    .digest();
}

function verschluesseln(klartext: string): string {
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", schluessel(), iv);
  const daten = Buffer.concat([c.update(klartext, "utf8"), c.final()]);
  return Buffer.concat([iv, c.getAuthTag(), daten]).toString("base64");
}

function entschluesseln(blob: string): string {
  const roh = Buffer.from(blob, "base64");
  const d = createDecipheriv("aes-256-gcm", schluessel(), roh.subarray(0, 12));
  d.setAuthTag(roh.subarray(12, 28));
  return Buffer.concat([d.update(roh.subarray(28)), d.final()]).toString("utf8");
}

export async function speichereJson(pfad: string, daten: unknown): Promise<boolean> {
  if (!konfiguriert()) return false;
  try {
    await put(pfad, verschluesseln(JSON.stringify(daten)), {
      access: "public",
      contentType: "text/plain",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 0,
    });
    return true;
  } catch {
    return false;
  }
}

export async function ladeJson<T>(pfad: string): Promise<T | null> {
  if (!konfiguriert()) return null;
  try {
    const l = await list({ prefix: pfad, limit: 1 });
    const treffer = l.blobs.find((b) => b.pathname === pfad);
    if (!treffer) return null;
    const text = await fetch(`${treffer.url}?t=${Date.now()}`, {
      cache: "no-store",
    }).then((r) => r.text());
    return JSON.parse(entschluesseln(text)) as T;
  } catch {
    return null;
  }
}
