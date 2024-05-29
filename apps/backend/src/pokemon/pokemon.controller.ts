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

  @Get(':attackerId/attack/:defenderId')
  async canDefeatInSingleAttack(
    @Param('attackerId', ParseIntPipe) attackerId: number,
    @Param('defenderId', ParseIntPipe) defenderId: number,
  ) {
    return this.pokemonService.canDefeatInSingleAttack(attackerId, defenderId);
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
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ) {
    return this.pokemonService.updatePokemon(id, updatePokemonDto);
  }

  @Delete(':id')
  removePokemon(@Param('id') id: string) {
    return this.pokemonService.removePokemon(+id);
  }
}
