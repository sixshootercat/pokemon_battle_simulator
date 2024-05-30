import { Pokemon } from "../types/pokemon.types";
import { PokemonCard } from "./components/PokemonCard";

export default async function HomePage() {
  const allPokemon: Pokemon[] = await fetch(`${process.env.API_URL}/pokemon`, {
    cache: "no-cache",
  }).then((res) => res.json());

  return (
    <main className="flex justify-center items-center w-100 my-20 px-20">
      <div className="">
        <h1 className="text-4xl font-bold text-cyan-900 mb-10">
          Pokemon Battle Simulator
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </div>
    </main>
  );
}
