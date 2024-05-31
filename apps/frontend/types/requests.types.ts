import { Expansion, Pokemon, PokemonType } from "./pokemon.types";

export interface GetWeaknessAndResistanceResponse {
  weakAgainst: Pokemon[];
  resistantAgainst: Pokemon[];
}

export type CreatePokemonRequestBody = Omit<
  Pokemon,
  "id" | "createdAt" | "updatedAt"
>;

export interface Meta {
  count: number;
  total: number;
  left: string | null;
  nextUrl: string | null;
  prevUrl: string | null;
}

export interface GetAllPokemonResponse {
  meta: Meta;
  pokemon: Pokemon[];
}

export type GetSinglePokemonResponse = Pokemon;

export interface GetAttackResultsResponse {
  successful: boolean;
  attackDamage: number;
  remainingHp: number;
}
