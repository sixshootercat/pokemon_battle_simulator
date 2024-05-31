"use client";

import { useState } from "react";
import { Dialog } from "./Dialog";
import { PlusIcon } from "./PlusIcon";
import { CreatePokemonRequestBody } from "@/types/requests.types";
import { Expansion, PokemonType, type Rarity } from "@/types/pokemon.types";

interface FormField {
  value: string | null | number;
  error?: string;
}

type FormFields = {
  [K in keyof CreatePokemonRequestBody]: FormField;
};

const validRarity: Rarity[] = ["COMMON", "UNCOMMON", "RARE"];
const validExpansion: Expansion[] = [
  "BASE",
  "JUNGLE",
  "FOSSIL",
  "TEAMROCKET",
  "GYMHEROES",
  "GYMCHALLENGE",
];
const validType: PokemonType[] = [
  "NORMAL",
  "FIRE",
  "WATER",
  "ELECTRIC",
  "GRASS",
  "ICE",
  "FIGHTING",
  "POISON",
  "GROUND",
  "FLYING",
  "PSYCHIC",
  "BUG",
  "ROCK",
  "GHOST",
  "DRAGON",
  "DARK",
  "STEEL",
  "FAIRY",
];

const emptyFormFields: FormFields = {
  name: {
    value: "",
    error: "",
  },
  hp: {
    value: null,
    error: "",
  },
  attack: {
    value: null,
    error: "",
  },
  type: {
    value: "",
    error: "",
  },
  rarity: {
    value: "",
    error: "",
  },
  expansion: {
    value: "",
    error: "",
  },
  description: {
    value: "",
    error: "",
  },
  imageUrl: {
    value: null,
    error: "",
  },
  weakness: {
    value: "",
    error: "",
  },
  resistance: {
    value: null,
    error: "",
  },
};

interface PokemonComposerProps {}

export const PokemonComposer = ({}: PokemonComposerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [formFields, setFormFields] = useState<FormFields>({
    ...emptyFormFields,
  });

  const createPokemon = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/pokemon`;

    const flattenedFormFields = Object.keys(formFields).reduce((acc, key) => {
      return {
        ...acc,
        [key]: formFields[key as keyof FormFields].value,
      };
    }, {} as any);

    if (flattenedFormFields?.resistance) {
      flattenedFormFields.resistance = String(
        flattenedFormFields.resistance
      ).toUpperCase();
    }
    if (flattenedFormFields?.weakness) {
      flattenedFormFields.weakness = String(
        flattenedFormFields.weakness
      ).toUpperCase();
    }
    if (flattenedFormFields?.rarity) {
      flattenedFormFields.rarity = String(
        flattenedFormFields.rarity
      ).toUpperCase();
    }
    if (flattenedFormFields?.expansion) {
      flattenedFormFields.expansion = String(
        flattenedFormFields.expansion
      ).toUpperCase();
    }
    if (flattenedFormFields?.attack) {
      flattenedFormFields.attack = Number(flattenedFormFields.attack);
    }
    if (flattenedFormFields?.hp) {
      flattenedFormFields.hp = Number(flattenedFormFields.hp);
    }

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(flattenedFormFields),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const data = await response.json();
      const errorMessages = data.message;

      const newFormFields = { ...formFields };

      errorMessages.forEach((errorMessage: string) => {
        const field = (errorMessage as any).split(" ")[0].toLowerCase();
        if (newFormFields[field as keyof FormFields]) {
          newFormFields[field as keyof FormFields].error = errorMessage;
        }
      });

      setFormFields(newFormFields);
    } else {
      await response.json();
      setFormFields({ ...emptyFormFields });
    }
  };

  return (
    <div>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1
          px-4 rounded flex justify-center items-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <PlusIcon />
        <p>New Card</p>
      </button>
      <Dialog
        isOpen={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
          setFormFields({ ...emptyFormFields });
        }}
      >
        <div className="flex justify-between">
          <form className=" w-full">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={formFields?.name.value || ""}
                onChange={(e) => {
                  setFormFields({
                    ...formFields,
                    name: { value: e.target.value },
                  });
                }}
                placeholder="Name"
              />
              <p className="text-red-600">{formFields.name.error}</p>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="hp"
              >
                HP
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="hp"
                value={formFields.hp.value || ""}
                onChange={(e) => {
                  setFormFields({
                    ...formFields,
                    hp: { value: e.target.value },
                  });
                }}
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="HP"
              />
              <p className="text-red-600">{formFields.hp.error}</p>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="attack"
              >
                Attack
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="attack"
                value={formFields.attack.value || ""}
                onChange={(e) => {
                  setFormFields({
                    ...formFields,
                    attack: { value: e.target.value },
                  });
                }}
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Attack"
              />
              <p className="text-red-600">{formFields.attack.error}</p>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formFields.description.value || ""}
                onChange={(e) => {
                  setFormFields({
                    ...formFields,
                    description: { value: e.target.value },
                  });
                }}
                type="text"
                placeholder="Description"
              />
              <p className="text-red-600">{formFields.description.error}</p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Type
              </label>
              <select
                name="type"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formFields.type.value || ""}
                onChange={(e) => {
                  setFormFields({
                    ...formFields,
                    type: { value: e.target.value },
                  });
                }}
              >
                <option className="text-md" disabled value="">
                  Select type
                </option>
                {validType.map((type, id) => (
                  <option key={id} value={type} className="text-md">
                    {type.toLocaleLowerCase()}
                  </option>
                ))}
              </select>
              <p className="text-red-600">{formFields.type.error}</p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="rarity"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Rarity
              </label>
              <select
                value={formFields.rarity.value || ""}
                name="rarity"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => {
                  setFormFields({
                    ...formFields,
                    rarity: { value: e.target.value },
                  });
                }}
              >
                <option className="text-md" disabled value="">
                  Select rarity
                </option>
                {validRarity.map((rarity, id) => (
                  <option key={id} value={rarity} className="text-md">
                    {rarity.toLocaleLowerCase()}
                  </option>
                ))}
              </select>
              <p className="text-red-600">{formFields.rarity.error}</p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="expansion"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Expansion
              </label>
              <select
                value={formFields.expansion.value || ""}
                name="expansion"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => {
                  setFormFields({
                    ...formFields,
                    expansion: { value: e.target.value },
                  });
                }}
              >
                <option className="text-md" disabled value="">
                  Select expansion
                </option>
                {validExpansion.map((expansion, id) => (
                  <option key={id} value={expansion} className="text-md">
                    {expansion.toLocaleLowerCase()}
                  </option>
                ))}
              </select>
              <p className="text-red-600">{formFields.expansion.error}</p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="weakness"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Weakness
              </label>
              <select
                value={formFields.weakness.value || ""}
                name="weakness"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => {
                  setFormFields({
                    ...formFields,
                    weakness: { value: e.target.value },
                  });
                }}
              >
                <option className="text-md" disabled value="">
                  Select weakness
                </option>
                {validType.map((weakness, id) => (
                  <option key={id} value={weakness} className="text-md">
                    {weakness.toLocaleLowerCase()}
                  </option>
                ))}
              </select>
              <p className="text-red-600">{formFields.weakness.error}</p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="resistance"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Resistance
              </label>
              <select
                value={formFields.resistance.value || ""}
                name="resistance"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => {
                  setFormFields({
                    ...formFields,
                    resistance: { value: e.target.value },
                  });
                }}
              >
                <option className="text-md" disabled value="">
                  Select resistance
                </option>
                {validType.map((resistance, id) => (
                  <option key={id} value={resistance} className="text-md">
                    {resistance.toLocaleLowerCase()}
                  </option>
                ))}
              </select>
              <p className="text-red-600">{formFields.resistance.error}</p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={createPokemon}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};
