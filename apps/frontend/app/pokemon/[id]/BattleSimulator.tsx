"use client";

import { Dialog } from "@/app/components/Dialog";
import { PokemonCard } from "@/app/components/PokemonCard";
import { Pokemon } from "@/types/pokemon.types";
import {
  GetAttackResultsResponse,
  GetWeaknessAndResistanceResponse,
} from "@/types/requests.types";
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [respData, setRespData] = useState<GetAttackResultsResponse>();
  const [weakAgainst, setWeakAgainst] = useState<Pokemon[]>([]);
  const [resistantAgainst, setResistantAgainst] = useState<Pokemon[]>([]);
  const [openEffectivenessDialog, setOpenEffectivenessDialog] =
    useState<boolean>(false);
  const [openResultsDialog, setOpenResultsDialog] = useState<boolean>(false);

  const getBattleResults = async () => {
    if (!selectedOpponent) {
      setErrorMessage("Please select an opponent to battle");
      return;
    }

    setOpenResultsDialog(true);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/pokemon/${pokemon.id}/attack/${selectedOpponent.id}`;

    const resp = await fetch(url).then((res) => res.json());

    setRespData(resp);
    setErrorMessage(null);
  };

  const getEffectiveness = async () => {
    setOpenEffectivenessDialog(true);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/pokemon/weakness-resistance/${pokemon.id}`;

    const resp: GetWeaknessAndResistanceResponse = await fetch(url).then(
      (res) => res.json()
    );

    setWeakAgainst(resp.weakAgainst);
    setResistantAgainst(resp.resistantAgainst);
  };

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
          onClick={getBattleResults}
        >
          Battle
        </button>
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={getEffectiveness}
          >
            Check Weakness/Resistance
          </button>
        </div>
        <Dialog
          isOpen={openEffectivenessDialog}
          onRequestClose={() => {
            setWeakAgainst([]);
            setResistantAgainst([]);
            setOpenEffectivenessDialog(false);
          }}
        >
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-bold">Weak Against:</h3>
              <ul>
                {weakAgainst?.map((pokemon) => (
                  <li key={pokemon.id}>{pokemon.name}</li>
                ))}
                {weakAgainst?.length === 0 && <p className="italic">None</p>}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold">Resistant Against:</h3>
              <ul>
                {resistantAgainst?.map((pokemon) => (
                  <li key={pokemon.id}>{pokemon.name}</li>
                ))}
                {resistantAgainst?.length === 0 && (
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
              {respData?.successful ? (
                <p className="px-4 py-2 bg-green-500 text-white text-lg rounded-full">
                  You defeated {selectedOpponent?.name}!
                </p>
              ) : (
                <div className="flex justify-end items-center flex-col">
                  <p className="px-4 py-2 bg-red-500 text-white text-lg rounded-full">
                    Unable to defeat {selectedOpponent?.name}
                  </p>
                  <p className="text-md font-bold">
                    Damage Dealt: {respData?.attackDamage} points
                  </p>
                  <p className="text-md font-bold">
                    Opponent HP Remaining: {respData?.remainingHp} points
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
