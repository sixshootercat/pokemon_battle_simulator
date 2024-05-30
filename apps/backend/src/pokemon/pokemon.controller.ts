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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiBody,
} from '@nestjs/swagger';
import {
  CreatePokemonResponse,
  CreatePokemonRequestBody,
} from './pokemon.swagger';

@ApiTags('pokemon')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @ApiOperation({ summary: 'Create a pokemon' })
  @ApiResponse({ status: 201 })
  @ApiConflictResponse({
    description: 'A Pokemon with this name already exists',
  })
  @ApiOkResponse({
    type: CreatePokemonResponse,
  })
  @ApiBody({ type: CreatePokemonRequestBody })
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
