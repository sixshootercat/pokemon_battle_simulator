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

  async getCanDefeatInSingleAttack(attackerId: string, defenderId: string) {
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

    return {
      successful: damage >= defender.hp,
      attackDamage: damage,
      remainingHp: defender.hp - damage,
    };
  }

  async getAllPokemon({
    name,
    limit,
    offset,
  }: {
    name?: string;
    limit?: number;
    offset?: number;
  }) {
    const total = await this.prisma.pokemon.count({
      where: {
        name: name ? { contains: name, mode: 'insensitive' } : undefined,
      },
    });

    const pokemon = await this.prisma.pokemon.findMany({
      where: {
        name: name ? { contains: name, mode: 'insensitive' } : undefined,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit || undefined,
      skip: offset || undefined,
    });

    const nextOffset = offset + limit;
    const prevOffset = offset - limit < 0 ? 0 : offset - limit;

    const nextUrl =
      nextOffset < total
        ? `${process.env.BASE_URL}:${process.env.PORT}/v1/api/pokemon?limit=${limit}&offset=${nextOffset}`
        : null;

    const prevUrl =
      offset > 0
        ? `${process.env.BASE_URL}:${process.env.PORT}/v1/api/pokemon?limit=${limit}&offset=${prevOffset}`
        : null;

    return {
      meta: {
        total,
        count: pokemon.length,
        left: total - (offset + pokemon.length),
        nextUrl,
        prevUrl,
      },
      pokemon,
    };
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

  async removePokemon(id: string) {
    try {
      return await this.prisma.pokemon.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException('Pokemon not found');
    }
  }
}
