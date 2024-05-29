import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [PrismaModule],
})
export class PokemonModule {}
