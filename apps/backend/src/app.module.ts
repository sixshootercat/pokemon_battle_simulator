import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { TypeModule } from './type/type.module';

@Module({
  imports: [PokemonModule, TypeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
