"use client";
import { Dialog } from "@/app/components/Dialog";
import { PokemonCard } from "@/app/components/PokemonCard";
import { useGetBattleResults } from "@/app/hooks/useGetBattleResults";
import { useGetEffectiveness } from "@/app/hooks/useGetEffectiveness";
import { Pokemon } from "@/types/pokemon.types";
import { useState } from "react";

interface BattleSimulatorProps {
  pokemon: Pokemon;
  allPokemon: Pokemon[];
}

export const BattleSimulator = ({
  pokemon,
  allPokemon,
}: BattleSimulatorProps) => {
  const [selectedOpponent, setSelectedOpponent] = useState<Pokemon | null>(
    null
  );
  const battleResultsData = useGetBattleResults({
    id: pokemon.id,
    onComplete: () => setOpenResultsDialog(true),
  });
  const effectivenessData = useGetEffectiveness({
    id: pokemon.id,
    onComplete: () => setOpenEffectivenessDialog(true),
  });

  const [openEffectivenessDialog, setOpenEffectivenessDialog] =
    useState<boolean>(false);
  const [openResultsDialog, setOpenResultsDialog] = useState<boolean>(false);

  return (
    <main className="flex justify-center items-center gap-6">
      <PokemonCard pokemon={pokemon} />
      <div className="flex justify-center items-center bg-orange-600 rounded-full h-16 w-16">
        <p className="text-2xl font-bold text-slate-50">VS</p>
      </div>
      <div className="flex flex-col gap-10">
        <div>
          <label
            htmlFor="opponent"
            className="block text-sm font-medium text-gray-700"
          >
            <p className="text-lg font-bold">Battle with:</p>
          </label>
          <select
            id="opponent"
            name="opponent"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            defaultValue=""
            onChange={(e) =>
              setSelectedOpponent(
                allPokemon.find((pokemon) => pokemon.id === e.target.value) ||
                  null
              )
            }
          >
            <option className="text-md" disabled value="">
              Select opponent
            </option>
            {allPokemon.map((pokemon) => (
              <option key={pokemon.id} value={pokemon.id} className="text-md">
                {pokemon.name}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() =>
            battleResultsData.getBattleResults(selectedOpponent?.id || "")
          }
        >
          Battle
        </button>
        {battleResultsData.error && (
          <p className="text-red-500 text-center">{battleResultsData.error}</p>
        )}
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={effectivenessData.getEffectiveness}
          >
            Check Weakness/Resistance
          </button>
        </div>
        <Dialog
          isOpen={openEffectivenessDialog}
          onRequestClose={() => {
            setOpenEffectivenessDialog(false);
          }}
        >
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-bold">Weak Against:</h3>
              <ul>
                {effectivenessData?.data?.weakAgainst?.map((pokemon) => (
                  <li key={pokemon.id}>{pokemon.name}</li>
                ))}
                {effectivenessData?.data?.weakAgainst?.length === 0 && (
                  <p className="italic">None</p>
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold">Resistant Against:</h3>
              <ul>
                {effectivenessData?.data?.resistantAgainst?.map((pokemon) => (
                  <li key={pokemon.id}>{pokemon.name}</li>
                ))}
                {effectivenessData?.data?.resistantAgainst?.length === 0 && (
                  <p className="italic">None</p>
                )}
              </ul>
            </div>
          </div>
        </Dialog>
        <Dialog
          isOpen={openResultsDialog}
          onRequestClose={() => {
            setOpenResultsDialog(false);
          }}
        >
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-lg font-bold">Battle results:</h3>
            <div className="mt-2">
              {battleResultsData.data?.successful ? (
                <p className="px-4 py-2 bg-green-500 text-white text-lg rounded-full">
                  You defeated {selectedOpponent?.name}!
                </p>
              ) : (
                <div className="flex justify-end items-center flex-col">
                  <p className="px-4 py-2 bg-red-500 text-white text-lg rounded-full">
                    Unable to defeat {selectedOpponent?.name}
                  </p>
                  <p className="text-md font-bold">
                    Damage Dealt: {battleResultsData.data?.attackDamage} points
                  </p>
                  <p className="text-md font-bold">
                    Opponent HP Remaining: {battleResultsData.data?.remainingHp}{" "}
                    points
                  </p>
                </div>
              )}
            </div>
          </div>
        </Dialog>
      </div>
    </main>
  );
};
