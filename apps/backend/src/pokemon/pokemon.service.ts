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
