import { ClipboardCopy, Link2, Wrench } from "lucide-react";
import type { CheatSheet as CheatSheetData } from "@/lib/data/curriculum";

/** Erlaubt **fett** in den Info-Texten — mehr Markdown brauchen wir hier nicht. */
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-white">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function SectionLabel({
  icon: Icon,
  children,
}: {
  icon: typeof ClipboardCopy;
  children: React.ReactNode;
}) {
  return (
    <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-300">
      <Icon className="size-3.5" /> {children}
    </p>
  );
}

export function CheatSheet({ sheet }: { sheet?: CheatSheetData }) {
  const blocks = sheet?.blocks ?? [];
  const prompts = sheet?.prompts ?? [];
  const links = sheet?.links ?? [];
  const software = sheet?.software ?? [];
  const hasTools = prompts.length > 0 || links.length > 0 || software.length > 0;

  return (
    <aside className="rounded-3xl border border-brand-500/25 bg-brand-500/5 p-6 lg:col-span-2">
      <h2 className="mb-1 text-lg font-semibold text-white">Infos zur Lektion</h2>
      <p className="mb-5 text-xs text-zinc-500">
        Alles aus dieser Lektion zum Nachmachen.
      </p>

      <div className="space-y-5">
        {blocks.map((block) => (
          <div key={block.title}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-300">
              {block.title}
            </p>
            <ul className="space-y-1.5 text-sm leading-relaxed text-zinc-300">
              {block.items.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-brand-400/70" />
                  <span>
                    <RichText text={item} />
                  </span>
                </li>
              ))}
            </ul>
            {block.quote ? (
              <p className="mt-3 border-l-2 border-gold-400/60 pl-3 text-sm italic leading-relaxed text-zinc-400">
                {block.quote}
              </p>
            ) : null}
          </div>
        ))}

        {prompts.length > 0 ? (
          <div>
            <SectionLabel icon={ClipboardCopy}>Zum Kopieren</SectionLabel>
            <div className="space-y-2">
              {prompts.map((prompt, i) => (
                <pre
                  key={i}
                  className="overflow-x-auto whitespace-pre-wrap rounded-xl border border-white/10 bg-surface-950/60 p-3 font-mono text-xs leading-relaxed text-zinc-300"
                >
                  {prompt}
                </pre>
              ))}
            </div>
          </div>
        ) : null}

        {links.length > 0 ? (
          <div>
            <SectionLabel icon={Link2}>Skills &amp; Links</SectionLabel>
            <ul className="space-y-1.5 text-sm">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand-300 underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                  {link.note ? (
                    <span className="text-zinc-500"> — {link.note}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {software.length > 0 ? (
          <div>
            <SectionLabel icon={Wrench}>Software</SectionLabel>
            <ul className="space-y-1.5 text-sm text-zinc-300">
              {software.map((tool) => (
                <li key={tool.name}>
                  <span className="font-medium text-white">{tool.name}</span>
                  {tool.note ? (
                    <span className="text-zinc-500"> — {tool.note}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {!hasTools ? (
          <p className="rounded-xl border border-dashed border-white/10 bg-surface-950/40 p-3 text-xs leading-relaxed text-zinc-500">
            {sheet?.emptyNote ??
              "Prompts, Skills und Software dieser Lektion — folgen mit dem Video."}
          </p>
        ) : null}
      </div>
    </aside>
  );
}
