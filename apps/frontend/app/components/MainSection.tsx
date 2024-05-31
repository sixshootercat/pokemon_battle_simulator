"use client";
import { PokemonCardList } from "./PokemonCardList";
import { PokemonComposer } from "./PokemonComposer";
import { SearchBox } from "./SearchBox";
import { useGetPokemon } from "../hooks/useGetPokemon";

export const MainSection = () => {
  const { data, isLoading, refetch } = useGetPokemon({});

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-4xl font-bold text-cyan-900">
          Pokemon Battle Simulator
        </h1>
        <SearchBox
          onSearchSubmit={(query) => {
            refetch({ query });
          }}
        />

        <PokemonComposer />
      </div>
      <PokemonCardList pokemon={data?.pokemon || []} isLoading={isLoading} />
      <div className="flex justify-between items-center mt-10">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            if (data?.meta?.prevUrl) {
              refetch({ url: data.meta.prevUrl });
            }
          }}
        >
          Back
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            if (data?.meta?.nextUrl) {
              refetch({ url: data.meta.nextUrl });
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
