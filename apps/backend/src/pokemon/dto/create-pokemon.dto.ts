import { $Enums, Pokemon } from '@prisma/client';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  Min,
  Max,
} from 'class-validator';

export class CreatePokemonDto
  implements Pick<Pokemon, 'name' | 'type' | 'hp' | 'attack' | 'description'>
{
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsInt()
  @Max(999)
  @Min(40)
  hp: number;

  @IsInt()
  @Max(999)
  @Min(20)
  attack: number;

  @IsEnum($Enums.PokemonType, { message: 'type must be a valid value' })
  type: $Enums.PokemonType;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsEnum($Enums.PokemonType, { message: 'weakness must be a valid value' })
  weakness: $Enums.PokemonType;

  @IsOptional()
  @IsEnum($Enums.PokemonType)
  resistance?: $Enums.PokemonType;

  @IsEnum($Enums.Rarity, { message: 'rarity must be a valid value' })
  rarity: $Enums.Rarity;

  @IsEnum($Enums.Expansion, { message: 'expansion must be a valid value' })
  expansion: $Enums.Expansion;
}
