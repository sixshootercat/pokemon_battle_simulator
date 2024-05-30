import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PokemonService {
  constructor(private prisma: PrismaService) {}

  async createPokemon(createPokemonDto: CreatePokemonDto) {
    try {
      return await this.prisma.pokemon.create({ data: createPokemonDto });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('A Pokemon with this name already exists');
      }
      throw error;
    }
  }

  async getPokemonWeaknessAndResistance(id: string) {
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
      throw error;
    }
  }

  async canDefeatInSingleAttack(attackerId: string, defenderId: string) {
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

  async getAllPokemon() {
    return this.prisma.pokemon.findMany();
  }

  async getSinglePokemon(id: string) {
    const pokemon = await this.prisma.pokemon.findUnique({ where: { id } });

    if (!pokemon) {
      throw new NotFoundException(`Pokemon with ID ${id} not found`);
    }

    return pokemon;
  }

  async updatePokemon(id: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      return await this.prisma.pokemon.update({
        data: updatePokemonDto,
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('A Pokemon with this name already exists');
      }
      throw error;
    }
  }

  removePokemon(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
