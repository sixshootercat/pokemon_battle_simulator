/*
  Warnings:

  - Added the required column `expansion` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rarity` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Expansion" AS ENUM ('BASE', 'JUNGLE', 'FOSSIL', 'TEAMROCKET', 'GYMHEROES', 'GYMCHALLENGE');

-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('COMMON', 'UNCOMMON', 'RARE');

-- AlterTable
ALTER TABLE "Pokemon" ADD COLUMN     "expansion" "Expansion" NOT NULL,
ADD COLUMN     "rarity" "Rarity" NOT NULL;
