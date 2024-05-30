import { PrismaClient } from '@prisma/client';
import pokemon from './seed.json';

const prisma = new PrismaClient();

async function main() {
  const existingPokemon = await prisma.pokemon.findFirst();

  if (existingPokemon) {
    console.log('Data already exists in the database. Skipping seed.');
    return;
  }

  pokemon.forEach(async (p: any) => {
    await prisma.pokemon.create({
      data: {
        name: p.name,
        type: p.type,
        hp: p.hp,
        attack: p.attack,
        imageUrl: p.imageUrl,
        description: p.description,
        weakness: p.weakness,
        resistance: p.resistance,
      },
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
