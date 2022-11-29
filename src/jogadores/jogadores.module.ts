import { ProfessorSchema } from './interfaces/professor.schema';
import { MongooseModule } from '@nestjs/mongoose';
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';
import { JogadorSchema } from './interfaces/jogador.schema';


@Module({
  imports: [MongooseModule.forFeature([{name:'Jogador', schema: JogadorSchema}]),
            MongooseModule.forFeature([{name:'Professor', schema:ProfessorSchema}])
],
  controllers: [JogadoresController],
  providers: [JogadoresService]
})
export class JogadoresModule {}
