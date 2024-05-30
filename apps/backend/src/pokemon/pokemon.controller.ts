import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
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
    @Param('attackerId') attackerId: string,
    @Param('defenderId') defenderId: string,
  ) {
    return this.pokemonService.canDefeatInSingleAttack(attackerId, defenderId);
  }

  @Get('effectiveness/:id')
  getPokemonWeaknessAndResistance(@Param('id') id: string) {
    return this.pokemonService.getPokemonWeaknessAndResistance(id);
  }

  @Get()
  getAllPokemon() {
    return this.pokemonService.getAllPokemon();
  }

  @Get(':id')
  getSinglePokemon(@Param('id') id: string) {
    return this.pokemonService.getSinglePokemon(id);
  }

  @Patch(':id')
  updatePokemon(
    @Param('id') id: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ) {
    return this.pokemonService.updatePokemon(id, updatePokemonDto);
  }

  @Delete(':id')
  @HttpCode(204)
  removePokemon(@Param('id') id: string) {
    return this.pokemonService.removePokemon(id);
  }
}
