import Link from "next/link";
import { Pokemon } from "@/types/pokemon.types";
import { PokemonCard } from "./components/PokemonCard";
import { Metadata } from "next";
import { PokemonComposer } from "./components/PokemonComposer";

export const metadata: Metadata = {
  title: "Pokemon Battle Simulator | Home",
  description: "battle against your favorite pokemon",
};

export default async function HomePage() {
  const allPokemon: Pokemon[] = await fetch(`${process.env.API_URL}/pokemon`, {
    cache: "no-cache",
  }).then((res) => res.json());

  return (
    <main className="flex justify-center items-center w-100 my-20 px-20">
      <div id="modal-root"></div>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-cyan-900 mb-10">
            Pokemon Battle Simulator
          </h1>
          <PokemonComposer />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allPokemon.map((pokemon) => (
            <Link href={`/pokemon/${pokemon.id}`} key={pokemon.id}>
              <PokemonCard pokemon={pokemon} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
