import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { CreatePokemonDto } from './dto/create-pokemon.dto';

export class CreatePokemonRequestBody extends CreatePokemonDto {
  @ApiProperty({ example: 'Pikachu' })
  name: string;

  @ApiProperty({ example: 'ELECTRIC' })
  type: $Enums.PokemonType;

  @ApiProperty({ example: 100 })
  hp: number;

  @ApiProperty({ example: 50 })
  attack: number;

  @ApiProperty({ example: 'A cute electric mouse' })
  description: string;

  @ApiProperty({ example: 'FIRE' })
  weakness: $Enums.PokemonType;

  @ApiProperty({ example: 'WATER', nullable: true })
  resistance: $Enums.PokemonType;
}

export class CreatePokemonResponse extends CreatePokemonRequestBody {
  @ApiProperty({ example: '0fc0364f-423e-4bde-972e-91f843a495cd' })
  id: string;

  @ApiProperty({ example: '2021-09-29T14:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2021-09-29T14:00:00.000Z' })
  updatedAt: Date;
}
