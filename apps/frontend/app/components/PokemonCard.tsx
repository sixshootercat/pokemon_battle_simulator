import { Pokemon } from "../../types/pokemon.types";
import { CircleIcon } from "./CircleIcon";
import { Rarity } from "./Rarity";

interface PokemonProps {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: PokemonProps) => {
  return (
    <div
      className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-slate-300 p-4 flex flex-col"
      key={pokemon.id}
    >
      <div className="flex justify-between my-2">
        <h3 className="font-bold text-xl">{pokemon.name}</h3>
        <div className="flex justify-center items-center gap-1 font-bold">
          <p>HP</p>
          <div className="flex justify-center items-center bg-blue-500 text-white rounded-full h-8 w-8">
            <p className="text-sm">{pokemon.hp}</p>
          </div>
        </div>
      </div>
      <img
        className="w-full rounded-lg"
        src="/pikachu_pic.jpeg"
        alt="picture of a pokemon"
      />
      <div className="py-4">
        <p className="text-gray-700 text-base">{pokemon.description}</p>
      </div>
      <div className="flex gap-2 flex-col mt-auto font-bold text-sm">
        <div className="flex items-center gap-2">
          <CircleIcon />
          <p>{pokemon.type}</p>
        </div>
        <div className="flex items-center gap-2">
          <CircleIcon />
          <p>{pokemon.expansion}</p>
        </div>
        <Rarity rarity={pokemon.rarity} />
      </div>
    </div>
  );
};
