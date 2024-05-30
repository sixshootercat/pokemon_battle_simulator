export interface Pokemon {
  id: string;
  type: PokemonType;
  createdAt: string;
  updatedAt: string;
  hp: number;
  attack: number;
  name: string;
  description: string;
  imageUrl: string | null;
  weakness: PokemonType;
  resistance: PokemonType | null;
  rarity: Rarity;
  expansion: Expansion;
}

export type Rarity = "COMMON" | "UNCOMMON" | "RARE";

export type Expansion =
  | "BASE"
  | "JUNGLE"
  | "FOSSIL"
  | "TEAMROCKET"
  | "GYMHEROES"
  | "GYMCHALLENGE";

export type PokemonType =
  | "NORMAL"
  | "FIRE"
  | "WATER"
  | "ELECTRIC"
  | "GRASS"
  | "ICE"
  | "FIGHTING"
  | "POISON"
  | "GROUND"
  | "FLYING"
  | "PSYCHIC"
  | "BUG"
  | "ROCK"
  | "GHOST"
  | "DRAGON"
  | "DARK"
  | "STEEL"
  | "FAIRY";
