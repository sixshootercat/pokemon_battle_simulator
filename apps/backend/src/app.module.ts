import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { TypeModule } from './type/type.module';

@Module({
  imports: [PokemonModule, TypeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
