import { Pokemon } from "@/types/pokemon.types";
import { PokemonCard } from "@/app/components/PokemonCard";
import { BattleSimulator } from "./BattleSimulator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pokemon Battle Simulator | Battle ",
  description: "battle against your favorite pokemon",
};

export default async function BattlePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const pokemon: Pokemon = await fetch(
    `${process.env.API_URL}/pokemon/${id}`
  ).then((res) => res.json());

  const allPokemon: Pokemon[] = await fetch(`${process.env.API_URL}/pokemon`, {
    cache: "no-cache",
  }).then((res) => res.json());

  const filteredPokemon = allPokemon.filter((p) => p.id !== id);

  return (
    <main className="flex justify-center items-center w-100 my-20 px-20">
      <div id="modal-root"></div>
      <div>
        <div>
          <h1 className="text-4xl font-bold text-cyan-900 mb-10">
            {pokemon.name}
          </h1>
        </div>
        <BattleSimulator pokemon={pokemon} allPokemon={filteredPokemon} />
      </div>
    </main>
  );
}
