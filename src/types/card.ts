export const STAT_MAX = 16;

export type StatKey = "technique" | "shooting" | "speed" | "stamina";

export interface PlayerStats {
  technique: number;
  shooting: number;
  speed: number;
  stamina: number;
}

export const STAT_KEYS: StatKey[] = ["technique", "shooting", "speed", "stamina"];

export const STAT_LABELS: Record<StatKey, string> = {
  technique: "Technique",
  shooting: "Shooting",
  speed: "Speed",
  stamina: "Stamina",
};

export const POSITION_LABELS: Record<string, string> = {
  RE: "Reserve",
  GK: "Goalkeeper",
  DF: "Defender",
  MF: "Midfielder",
  FW: "Forward",
};

export function formatPosition(code: string): string {
  return POSITION_LABELS[code.toUpperCase()] ?? code;
}

export interface PlayerCard {
  id: string;
  name: string;
  nationality: string;
  position: string;
  number: number;
  star?: boolean;
  stats: PlayerStats;
}

export interface CardCatalog {
  title: string;
  subtitle?: string;
  cards: PlayerCard[];
}

/** @deprecated Use PlayerCard */
export type TrumpCard = PlayerCard;
