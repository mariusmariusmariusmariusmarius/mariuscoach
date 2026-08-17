import {
  Archivo,
  Bricolage_Grotesque,
  Fraunces,
  Instrument_Serif,
  Inter,
  Manrope,
  Newsreader,
  Plus_Jakarta_Sans,
  Space_Grotesk,
} from "next/font/google";

// Die Schriften werden von Next selbst ausgeliefert — nichts lädt von Google
// nach, die Proben sind also auch offline und ohne Tracking da.
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["700"] });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: ["400"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["700"] });
const archivo = Archivo({ subsets: ["latin"], weight: ["700"] });
const fraunces = Fraunces({ subsets: ["latin"], weight: ["600"] });
const inter = Inter({ subsets: ["latin"], weight: ["400"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["400"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400"] });
const newsreader = Newsreader({ subsets: ["latin"], weight: ["400"] });

type Schrift = {
  name: string;
  klasse: string;
  art: string;
  wirkung: string;
  probe: string;
  gross?: boolean;
  zeilenhoehe: string;
  laufweite: string;
  kombi: string;
};

const UEBERSCHRIFTEN: Schrift[] = [
  {
    name: "Bricolage Grotesque",
    klasse: bricolage.className,
    art: "Display",
    wirkung:
      "Kräftig und leicht eigenwillig. Fällt sofort auf, ohne verspielt zu wirken — die Schrift, die man gerade überall auf neuen Seiten sieht.",
    probe: "Quick Brown Fox",
    gross: true,
    zeilenhoehe: "1,05",
    laufweite: "−2 %",
    kombi: "Inter",
  },
  {
    name: "Archivo",
    klasse: archivo.className,
    art: "Sans, breit",
    wirkung:
      "Breit, satt, plakativ. Wirkt wie Beschriftung auf einem Firmenwagen — gut für Bau, Dach, Garten- und Landschaftsbau.",
    probe: "Quick Brown Fox",
    gross: true,
    zeilenhoehe: "1,05",
    laufweite: "−2 %",
    kombi: "Inter oder Manrope",
  },
  {
    name: "Space Grotesk",
    klasse: spaceGrotesk.className,
    art: "Sans, technisch",
    wirkung:
      "Modern und technisch, mit ein paar ungewöhnlichen Buchstabenformen. Passt zu Elektro, Photovoltaik, IT, Metallbau.",
    probe: "Quick Brown Fox",
    gross: true,
    zeilenhoehe: "1,1",
    laufweite: "−1 %",
    kombi: "Inter",
  },
  {
    name: "Instrument Serif",
    klasse: instrument.className,
    art: "Serif, elegant",
    wirkung:
      "Schmal und elegant. Hebt sofort das Preisniveau — gut für Innenausbau, Küchen, Bäder, Schreinerei.",
    probe: "Quick Brown Fox",
    gross: true,
    zeilenhoehe: "1,05",
    laufweite: "0",
    kombi: "Inter oder Plus Jakarta Sans",
  },
  {
    name: "Fraunces",
    klasse: fraunces.className,
    art: "Serif, charaktervoll",
    wirkung:
      "Warm und handgemacht. Für Betriebe, die auf Handwerk und Tradition setzen — Bäckerei, Tischlerei, Restaurierung.",
    probe: "Quick Brown Fox",
    gross: true,
    zeilenhoehe: "1,05",
    laufweite: "−1 %",
    kombi: "Manrope",
  },
];

const FLIESSTEXT: Schrift[] = [
  {
    name: "Inter",
    klasse: inter.className,
    art: "Sans, neutral",
    wirkung:
      "Der Standard. Fällt nicht auf, ist auf jedem Bildschirm gut lesbar, funktioniert unter jeder Überschrift. Wenn du unsicher bist: die hier.",
    probe:
      "The quick brown fox jumps over the lazy dog. Größere Öfen mit Übermaß.",
    zeilenhoehe: "1,6",
    laufweite: "0",
    kombi: "passt zu allen fünf oben",
  },
  {
    name: "Manrope",
    klasse: manrope.className,
    art: "Sans, freundlich",
    wirkung:
      "Etwas runder und wärmer als Inter. Nimmt strengen Überschriften die Härte, ohne verspielt zu werden.",
    probe:
      "The quick brown fox jumps over the lazy dog. Größere Öfen mit Übermaß.",
    zeilenhoehe: "1,6",
    laufweite: "0",
    kombi: "Fraunces, Archivo",
  },
  {
    name: "Plus Jakarta Sans",
    klasse: jakarta.className,
    art: "Sans, modern",
    wirkung:
      "Etwas eigener als Inter, ohne anstrengend zu sein. Gut, wenn die Seite frischer wirken soll.",
    probe:
      "The quick brown fox jumps over the lazy dog. Größere Öfen mit Übermaß.",
    zeilenhoehe: "1,6",
    laufweite: "0",
    kombi: "Instrument Serif, Bricolage",
  },
  {
    name: "Newsreader",
    klasse: newsreader.className,
    art: "Serif, Lesetext",
    wirkung:
      "Serifen im Fließtext. Wirkt ruhig und seriös, liest sich bei längeren Texten angenehm — für Seiten mit viel Text.",
    probe:
      "The quick brown fox jumps over the lazy dog. Größere Öfen mit Übermaß.",
    zeilenhoehe: "1,7",
    laufweite: "0",
    kombi: "Archivo, Space Grotesk",
  },
];

function Karte({ s }: { s: Schrift }) {
  return (
    <li className="rounded-2xl border border-white/8 bg-surface-950/40 p-5">
      <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-sm font-semibold text-white">{s.name}</span>
        <span className="text-xs uppercase tracking-widest text-zinc-500">{s.art}</span>
      </div>

      {/* Die Probe steht wirklich in der Schrift, um die es geht */}
      <p
        className={`${s.klasse} mb-3 text-zinc-100 ${
          s.gross ? "text-3xl leading-none sm:text-4xl" : "text-base leading-relaxed"
        }`}
        style={s.gross ? { letterSpacing: "-0.02em" } : undefined}
      >
        {s.probe}
      </p>

      <p className="mb-3 text-sm leading-relaxed text-zinc-400">{s.wirkung}</p>

      <dl className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-zinc-500">
        <div className="flex gap-1.5">
          <dt>Zeilenhöhe</dt>
          <dd className="font-medium text-zinc-300">{s.zeilenhoehe}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt>Laufweite</dt>
          <dd className="font-medium text-zinc-300">{s.laufweite}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt>Kombi mit</dt>
          <dd className="font-medium text-zinc-300">{s.kombi}</dd>
        </div>
      </dl>
    </li>
  );
}

export function FontSchau() {
  return (
    <div className="rounded-3xl border border-white/8 bg-surface-900/70 p-8">
      <h2 className="mb-2 text-lg font-semibold text-white">Schriftarten im Überblick</h2>
      <p className="mb-6 max-w-[60ch] leading-relaxed text-zinc-300">
        Alle Schriften hier sind bei Google Fonts kostenlos und dürfen auch
        gewerblich benutzt werden. Nimm <strong className="text-white">eine</strong> für
        Überschriften und <strong className="text-white">eine</strong> für Fließtext — mehr
        nicht. Die Werte darunter kannst du Claude direkt so ansagen.
      </p>

      <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-300">
        Für Überschriften
      </h3>
      <ul className="mb-8 grid gap-4 sm:grid-cols-2">
        {UEBERSCHRIFTEN.map((s) => (
          <Karte key={s.name} s={s} />
        ))}
      </ul>

      <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-300">
        Für Fließtext
      </h3>
      <ul className="grid gap-4 sm:grid-cols-2">
        {FLIESSTEXT.map((s) => (
          <Karte key={s.name} s={s} />
        ))}
      </ul>

      <div className="mt-8 rounded-2xl border border-white/8 bg-surface-950/40 p-5">
        <h3 className="mb-3 text-sm font-semibold text-white">
          Zeilenhöhe und Laufweite — die zwei Stellschrauben
        </h3>
        <ul className="space-y-2 text-sm leading-relaxed text-zinc-400">
          <li>
            <strong className="text-zinc-200">Zeilenhöhe</strong> ist der Abstand zwischen
            den Zeilen. Faustregel: je größer die Schrift, desto enger. Große Überschriften
            1,0 bis 1,1 — Fließtext 1,5 bis 1,7. Fließtext mit Zeilenhöhe 1,2 ist der
            häufigste Anfängerfehler, das wirkt sofort gedrängt.
          </li>
          <li>
            <strong className="text-zinc-200">Laufweite</strong> ist der Abstand zwischen den
            Buchstaben. Große Überschriften vertragen minus 1 bis 2 Prozent, dann wirken sie
            kompakter. Fließtext bleibt bei null. Nur bei kleinen Großbuchstaben-Zeilen geht
            man ins Plus, etwa 10 Prozent, sonst kleben die Buchstaben.
          </li>
        </ul>
      </div>
    </div>
  );
}
