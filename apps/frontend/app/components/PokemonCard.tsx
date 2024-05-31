import { Pokemon } from "@/types/pokemon.types";
import { CircleIcon } from "./CircleIcon";
import { type Rarity } from "@/types/pokemon.types";

interface PokemonProps {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: PokemonProps) => {
  return (
    <div
      className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-yellow-600 bg-opacity-50 p-4 flex flex-col h-full border-8 border-yellow-400 hover:border-yellow-500 hover:bg-opacity-70 transition duration-300 ease-in-out"
      key={pokemon.id}
    >
      <div className="flex justify-between my-2 font-bold text-sm">
        <h3 className="font-bold text-xl">{pokemon.name}</h3>
        <div className="flex justify-center items-center gap-1">
          <div className="flex justify-center items-center bg-blue-500 text-white rounded-full h-8 w-8">
            <p className="text-sm">{pokemon.hp}</p>
          </div>
          <p className="font-bold">HP</p>
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
      <div className="flex gap-2 mt-auto font-bold text-sm justify-between">
        <div className="flex gap-2 flex-col ">
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
        <div className="flex justify-center items-center gap-1 flex-end self-start">
          <p className="font-bold">ATK</p>
          <div className="flex justify-center items-center bg-blue-500 text-white rounded-full h-8 w-8">
            <p className="text-sm">{pokemon.attack}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Rarity = ({ rarity }: { rarity: Rarity }) => {
  return (
    <div
      className={`flex items-center gap-2 ${rarity === "UNCOMMON" ? "mt-1" : ""}`}
    >
      {rarity === "RARE" ? (
        <StarIcon />
      ) : rarity === "UNCOMMON" ? (
        <SquareIcon />
      ) : (
        <CircleIcon />
      )}
      <p>{rarity}</p>
    </div>
  );
};

const SquareIcon = () => {
  return (
    <div className="pl-1 mr-0.5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="18"
        height="18"
        style={{ transform: "rotate(45deg)" }}
      >
        <path d="M0 0H512V512H0V0z" />
      </svg>
    </div>
  );
};

const StarIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      width="26"
      height="26"
    >
      <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
    </svg>
  );
};
