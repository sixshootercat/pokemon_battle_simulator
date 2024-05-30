import { $Enums, Pokemon } from '@prisma/client';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
} from 'class-validator';

export class CreatePokemonDto
  implements Pick<Pokemon, 'name' | 'type' | 'hp' | 'attack' | 'description'>
{
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  hp: number;

  @IsNotEmpty()
  @IsInt()
  attack: number;

  @IsNotEmpty()
  @IsEnum($Enums.PokemonType)
  type: $Enums.PokemonType;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum($Enums.PokemonType)
  weakness: $Enums.PokemonType;

  @IsOptional()
  @IsEnum($Enums.PokemonType)
  resistance: $Enums.PokemonType;

  @IsNotEmpty()
  @IsEnum($Enums.Rarity)
  rarity: $Enums.Rarity;

  @IsNotEmpty()
  @IsEnum($Enums.Expansion)
  expansion: $Enums.Expansion;
}
