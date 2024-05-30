import { Pokemon } from "../../types/pokemon.types";

interface PokemonProps {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: PokemonProps) => {
  return (
    <div className="pokemon-card">
      <div className="pokemon-card__id">{pokemon.id}</div>
      <div className="pokemon-card__image">
        <img src={pokemon?.imageUrl || ""} alt={pokemon.name} />
      </div>
      <div className="pokemon-card__name">{pokemon.name}</div>
    </div>
  );
};
