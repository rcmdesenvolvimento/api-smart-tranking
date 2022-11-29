import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {

  // Injeção de dependência
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Get()
  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadoresService.consultaTodosJogadores();
  }

  @Get('/:_id')
  async consultarJogadorePorId(@Param('_id', JogadoresValidacaoParametrosPipe) _id: string): Promise<Jogador> {
    return await this.jogadoresService.consultarJogadorPorId(_id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(@Body() criarJogadorDto: CriarJogadorDto):Promise<Jogador> {
    return await this.jogadoresService.criarJogador(criarJogadorDto); 
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async AtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto, 
                         @Param (':_id', JogadoresValidacaoParametrosPipe) _id: string): Promise<void> {
    await this.jogadoresService.AtualizarJogador(criarJogadorDto, _id);
  }

  @Delete('/:_id')
  async deletarJogador(
    @Param (':_id', JogadoresValidacaoParametrosPipe) _id: string): Promise<void> {
    this.jogadoresService.deletarJogador(_id);
  }
}

//npm run start:dev
// eslint-disable-next-line prettier/prettier
// @Get()
//   async consultarJogadores(
//     @Query('email', JogadoresValidacaoParametrosPipe) email: string,
//   ): Promise<Jogador[] | Jogador> {
//     if (email) {
//       return await this.jogadoresService.consultarJogadorPorEmail(email);
//     } else {
//       return await this.jogadoresService.consultaTodosJogadores();
//     }
//   }
