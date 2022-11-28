/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  // Injeção de dependência
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  // eslint-disable-next-line prettier/prettier
  async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    await this.jogadoresService.criarAtualizarJogador(criarJogadorDto);
  }

  @Get()
  async buscaJogadores(@Query('email') email: string): Promise<Jogador[] | Jogador> {
    if (email) {
      return await this.jogadoresService.consultarJogadorPorEmail(email);
    } else {
      return await this.jogadoresService.consultaTodosJogadores();
    }
  }

  @Delete()
  async deletarJogador(@Query('email') email: string):Promise<void>{
    this.jogadoresService.deletarJogador(email);
  }
}

//npm run start:dev
