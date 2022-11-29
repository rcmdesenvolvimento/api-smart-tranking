import { MongooseModule } from '@nestjs/mongoose';
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';
import { JogadorSchema } from './interfaces/jogador.schema';

@Module({
  imports: [MongooseModule.forFeature([{name:'Jogador', schema: JogadorSchema}])],
  controllers: [JogadoresController],
  providers: [JogadoresService]
})
export class JogadoresModule {}
