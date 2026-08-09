import {
  Briefcase,
  CircleHelp,
  Compass,
  Crown,
  Hand,
  Megaphone,
  Rocket,
  Search,
  Server,
  ShoppingBag,
  Sparkles,
  Trophy,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * Icons werden in den Daten als String referenziert, damit die Daten-Dateien
 * serialisierbar bleiben (wichtig für den späteren Umzug in die Datenbank).
 */
const ICONS: Record<string, LucideIcon> = {
  compass: Compass,
  sparkles: Sparkles,
  zap: Rocket,
  megaphone: Megaphone,
  "shopping-bag": ShoppingBag,
  server: Server,
  wrench: Wrench,
  search: Search,
  briefcase: Briefcase,
  hand: Hand,
  "circle-help": CircleHelp,
  rocket: Rocket,
  trophy: Trophy,
  crown: Crown,
};

export function DataIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Sparkles;
  return <Icon className={className} />;
}
