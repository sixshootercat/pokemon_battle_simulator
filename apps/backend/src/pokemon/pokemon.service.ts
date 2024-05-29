import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PokemonService {
  constructor(private prisma: PrismaService) {}

  createPokemon(_createPokemonDto: CreatePokemonDto) {
    return 'This action adds a new pokemon';
  }

  async getPokemonWeaknessAndResistance(id: number) {
    try {
      const pokemon = await this.getSinglePokemon(id);
      const weakAgainst = await this.prisma.pokemon.findMany({
        where: { type: pokemon.weakness },
      });

      const resistantAgainst = pokemon.resistance
        ? await this.prisma.pokemon.findMany({
            where: { type: pokemon.resistance },
          })
        : [];

      return { weakAgainst, resistantAgainst };
    } catch (error) {
      // handled by the getSinglePokemon method
      throw error;
    }
  }

  async canDefeatInSingleAttack(attackerId: number, defenderId: number) {
    const [attacker, defender] = await Promise.all([
      this.getSinglePokemon(attackerId),
      this.getSinglePokemon(defenderId),
    ]);

    let damage = attacker.attack;

    // Check attack effectiveness
    const defenderEffectiveness =
      await this.getPokemonWeaknessAndResistance(defenderId);

    const isEffectiveAttack = !!defenderEffectiveness.weakAgainst.find(
      (el) => el.type === attacker.type,
    );

    // If the attack is effective, we double the damage
    if (isEffectiveAttack) {
      damage *= 2;
    }

    const isResistantAttack = !!defenderEffectiveness.resistantAgainst.find(
      (el) => el.type === attacker.type,
    );

    // If the attack is resistant, we reduce the damage by 20
    if (isResistantAttack) {
      damage -= 20;
    }

    return { successful: damage >= defender.hp };
  }

  getAllPokemon() {
    return this.prisma.pokemon.findMany();
  }

  async getSinglePokemon(id: number) {
    const pokemon = await this.prisma.pokemon.findUnique({ where: { id } });

    if (!pokemon) {
      throw new NotFoundException(`Pokemon with ID ${id} not found`);
    }

    return pokemon;
  }

  updatePokemon(id: number, _updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  removePokemon(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
