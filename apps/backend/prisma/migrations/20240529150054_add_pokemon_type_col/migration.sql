/*
  Warnings:

  - Added the required column `resistance` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weakness` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Pokemon` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PokemonType" AS ENUM ('NORMAL', 'FIRE', 'WATER', 'ELECTRIC', 'GRASS', 'ICE', 'FIGHTING', 'POISON', 'GROUND', 'FLYING', 'PSYCHIC', 'BUG', 'ROCK', 'GHOST', 'DRAGON', 'DARK', 'STEEL', 'FAIRY');

-- AlterTable
ALTER TABLE "Pokemon" ADD COLUMN     "resistance" "PokemonType" NOT NULL,
ADD COLUMN     "weakness" "PokemonType" NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "PokemonType" NOT NULL;
