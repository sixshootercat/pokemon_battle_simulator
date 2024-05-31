import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
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
  GetAttackResultsResponse,
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

  @ApiOperation({ summary: 'Get attack results' })
  @ApiResponse({ status: 200 })
  @ApiOkResponse({
    // not sure why this is not generating docs in the swagger UI
    type: GetAttackResultsResponse,
  })
  @Get(':attackerId/attack/:defenderId')
  async getCanDefeatInSingleAttack(
    @Param('attackerId') attackerId: string,
    @Param('defenderId') defenderId: string,
  ) {
    return this.pokemonService.getCanDefeatInSingleAttack(
      attackerId,
      defenderId,
    );
  }

  @Get('weakness-resistance/:id')
  getPokemonWeaknessAndResistance(@Param('id') id: string) {
    return this.pokemonService.getPokemonWeaknessAndResistance(id);
  }

  @Get()
  getAllPokemon(
    @Query() filter: { name?: string; limit?: string; offset?: string },
  ) {
    // parse limit and offset to numbers by creating a new object
    const newFilter = {
      ...filter,
      limit: filter.limit ? parseInt(filter.limit) : undefined,
      offset: filter.offset ? parseInt(filter.offset) : undefined,
    };
    return this.pokemonService.getAllPokemon(newFilter);
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
