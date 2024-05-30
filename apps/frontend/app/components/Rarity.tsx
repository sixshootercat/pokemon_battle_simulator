import { Rarity as IRarity } from "../../types/pokemon.types";
import { CircleIcon } from "./CircleIcon";

interface RarityProps {
  rarity: IRarity;
}

export const Rarity = ({ rarity }: RarityProps) => {
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
    <div className="pl-1 mr-1">
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
