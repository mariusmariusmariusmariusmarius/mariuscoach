import type { Tier } from "@/lib/tiers";

/**
 * Mock-Daten für den Community-Bereich.
 * Später: eigene Tabellen in Neon + Realtime (z. B. Pusher/Ably oder Polling).
 */

export type Channel = {
  slug: string;
  name: string;
  description: string;
  /** Mindest-Stufe zum Schreiben; lesen dürfen alle eingeloggten Nutzer */
  writeTier: Tier;
  icon: string;
};

export type CommunityPost = {
  id: string;
  channel: string;
  author: string;
  authorTier: Tier;
  avatarColor: string;
  timestamp: string;
  title?: string;
  body: string;
  likes: number;
  replies: {
    id: string;
    author: string;
    avatarColor: string;
    timestamp: string;
    body: string;
  }[];
};

export const CHANNELS: Channel[] = [
  {
    slug: "vorstellung",
    name: "Stell dich vor",
    description: "Neu hier? Sag kurz Hallo und woran du gerade baust.",
    writeTier: "free",
    icon: "hand",
  },
  {
    slug: "offene-fragen",
    name: "Offene Fragen",
    description: "Du hängst fest? Stelle deine Frage — die Community hilft.",
    writeTier: "starter",
    icon: "circle-help",
  },
  {
    slug: "cases",
    name: "Cases & Projekte",
    description: "Zeig, was du gebaut hast, und hol dir Feedback.",
    writeTier: "starter",
    icon: "rocket",
  },
  {
    slug: "wins",
    name: "Wins 🎉",
    description: "Erster Kunde? Website live? Feier deine Erfolge mit uns.",
    writeTier: "starter",
    icon: "trophy",
  },
  {
    slug: "pro-lounge",
    name: "Pro-Lounge",
    description: "Deep Dives, Live-Cases und Q&A — exklusiv für Pro-Mitglieder.",
    writeTier: "pro",
    icon: "crown",
  },
];

export const SEED_POSTS: CommunityPost[] = [
  {
    id: "p1",
    channel: "offene-fragen",
    author: "Lena K.",
    authorTier: "starter",
    avatarColor: "from-rose-400 to-pink-500",
    timestamp: "vor 2 Std.",
    title: "Formular schickt keine E-Mail raus",
    body: "Ich habe den Anfragebogen aus Modul 2 nachgebaut, aber die Bestätigungsmail kommt nicht an. Muss ich beim E-Mail-Anbieter noch etwas freischalten?",
    likes: 4,
    replies: [
      {
        id: "p1r1",
        author: "Marius",
        avatarColor: "from-emerald-500 to-teal-400",
        timestamp: "vor 1 Std.",
        body: "Guter Fund! Check mal, ob dein Absender verifiziert ist — genau das schauen wir uns in der Lektion E-Mail-Automation an. Schick sonst gern einen Screenshot deiner Einstellungen.",
      },
    ],
  },
  {
    id: "p2",
    channel: "cases",
    author: "Jonas B.",
    authorTier: "pro",
    avatarColor: "from-indigo-400 to-blue-500",
    timestamp: "vor 5 Std.",
    title: "Erste Kundenwebsite live 🚀",
    body: "Website für einen Physiotherapeuten — mit Claude gebaut, selbst gehostet, Terminbuchung integriert. Von Idee bis live: 6 Tage. Feedback willkommen!",
    likes: 12,
    replies: [
      {
        id: "p2r1",
        author: "Sarah M.",
        avatarColor: "from-amber-400 to-orange-500",
        timestamp: "vor 4 Std.",
        body: "Sieht richtig clean aus! Wie hast du die Terminbuchung gelöst?",
      },
      {
        id: "p2r2",
        author: "Jonas B.",
        avatarColor: "from-indigo-400 to-blue-500",
        timestamp: "vor 3 Std.",
        body: "Nach der Lektion aus dem Tools-Modul gebaut — eigener Kalender-Endpoint plus Bestätigungsmail.",
      },
    ],
  },
  {
    id: "p3",
    channel: "wins",
    author: "Sarah M.",
    authorTier: "starter",
    avatarColor: "from-amber-400 to-orange-500",
    timestamp: "gestern",
    title: "Erster Lead über die eigene Landingpage!",
    body: "Gestern die Landingpage aus Modul 2 live gestellt, heute Morgen die erste echte Anfrage im Postfach. Es funktioniert wirklich 😄",
    likes: 18,
    replies: [],
  },
  {
    id: "p4",
    channel: "vorstellung",
    author: "Tim R.",
    authorTier: "free",
    avatarColor: "from-cyan-400 to-sky-500",
    timestamp: "vor 2 Tagen",
    body: "Moin! Ich bin Tim, Fotograf aus Hamburg. Will endlich weg vom Baukasten und meine eigene Seite bauen. Freue mich aufs Lernen hier!",
    likes: 7,
    replies: [
      {
        id: "p4r1",
        author: "Marius",
        avatarColor: "from-emerald-500 to-teal-400",
        timestamp: "vor 2 Tagen",
        body: "Willkommen Tim! Starte mit den Basics und meld dich bei Fragen einfach im Fragen-Channel.",
      },
    ],
  },
  {
    id: "p5",
    channel: "pro-lounge",
    author: "Marius",
    authorTier: "pro",
    avatarColor: "from-emerald-500 to-teal-400",
    timestamp: "vor 3 Tagen",
    title: "Live-Case diese Woche: Warenwirtschaft anbinden",
    body: "Donnerstag 19 Uhr bauen wir live eine Versand-API an einen Shop. Bringt eure Fragen mit — Aufzeichnung gibt's danach im Modul.",
    likes: 9,
    replies: [],
  },
];

