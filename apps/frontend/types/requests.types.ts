import { Expansion, Pokemon, PokemonType } from "./pokemon.types";

export interface GetWeaknessAndResistanceResponse {
  weakAgainst: Pokemon[];
  resistantAgainst: Pokemon[];
}

export type CreatePokemonRequestBody = Omit<
  Pokemon,
  "id" | "createdAt" | "updatedAt"
>;

export interface GetAllPokemonResponse {
  pokemon: Pokemon[];
}

export interface GetSinglePokemonResponse {
  pokemon: Pokemon;
}

export interface GetAttackResultsResponse {
  successful: boolean;
  attackDamage: number;
  remainingHp: number;
}
