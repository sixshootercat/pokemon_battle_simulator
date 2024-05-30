import { Pokemon } from "../types/pokemon.types";

export default async function HomePage() {
  const allPokemon: Pokemon[] = await fetch(
    `${process.env.API_URL}/pokemon`
  ).then((res) => res.json());

  return (
    <main className="flex justify-center items-center w-100 my-20 px-20">
      <div className="">
        <h1 className="text-4xl font-bold text-cyan-900 mb-10">
          Pokemon Battle Simulator
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allPokemon.map((pokemon) => (
            <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-slate-300">
              <img
                className="w-full"
                src="/pikachu_pic.jpeg"
                alt="picture of a pokemon"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{pokemon.name}</div>
                <p className="text-gray-700 text-base">{pokemon.description}</p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #photography
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #travel
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #winter
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
