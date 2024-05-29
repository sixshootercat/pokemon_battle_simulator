import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  createPokemon(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.createPokemon(createPokemonDto);
  }
  @Get('effectiveness/:id')
  getPokemonWeaknessAndResistance(@Param('id', ParseIntPipe) id: number) {
    return this.pokemonService.getPokemonWeaknessAndResistance(id);
  }

  @Get()
  getAllPokemon() {
    return this.pokemonService.getAllPokemon();
  }

  @Get(':id')
  getSinglePokemon(@Param('id', ParseIntPipe) id: number) {
    return this.pokemonService.getSinglePokemon(id);
  }

  @Patch(':id')
  updatePokemon(
    @Param('id') id: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ) {
    return this.pokemonService.updatePokemon(+id, updatePokemonDto);
  }

  @Delete(':id')
  removePokemon(@Param('id') id: string) {
    return this.pokemonService.removePokemon(+id);
  }
}
