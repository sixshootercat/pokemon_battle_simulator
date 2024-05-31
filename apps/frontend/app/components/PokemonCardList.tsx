"use client";
import { Pokemon } from "@/types/pokemon.types";
import Link from "next/link";
import { PokemonCard } from "./PokemonCard";
import { CardSkeleton } from "./CardSkeleton";

interface PokemonCardListProps {
  pokemon: Pokemon[];
  isLoading?: boolean;
}

export const PokemonCardList = ({
  pokemon,
  isLoading,
}: PokemonCardListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {isLoading && [...Array(10)].map((_, i) => <CardSkeleton key={i} />)}
      {pokemon?.length > 0 &&
        pokemon?.map((pokemon) => (
          <Link href={`/pokemon/${pokemon.id}`} key={pokemon.id}>
            <PokemonCard pokemon={pokemon} />
          </Link>
        ))}
    </div>
  );
};
