import Image from "next/image";
import Link from "next/link";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="group flex items-center gap-2.5">
      <span className="relative block size-9 shrink-0 overflow-hidden rounded-xl shadow-lg shadow-brand-600/30 transition-transform group-hover:scale-105">
        <Image
          src="/logo.png"
          alt="Marius Müller Media"
          width={72}
          height={72}
          priority
          className="size-full object-cover"
        />
      </span>
      <span className="font-display text-lg font-semibold leading-none tracking-tight text-white">
        Marius Müller
        <span className="block text-xs font-medium uppercase tracking-[0.28em] text-brand-400">
          Media
        </span>
      </span>
    </Link>
  );
}
