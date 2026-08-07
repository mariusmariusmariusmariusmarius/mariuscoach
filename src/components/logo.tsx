import Link from "next/link";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="group flex items-center gap-2.5">
      <span className="relative grid size-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 font-bold text-white shadow-lg shadow-brand-600/30 transition-transform group-hover:scale-105">
        M
        <span className="absolute -right-1 -top-1 size-2.5 rounded-full bg-gold-400 ring-2 ring-surface-950" />
      </span>
      <span className="text-lg font-semibold tracking-tight text-white">
        Marius<span className="text-brand-400">Coach</span>
      </span>
    </Link>
  );
}
