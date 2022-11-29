import { CriarJogadorDto } from './dtos/criar-jogador.dto';
/* eslint-disable prettier/prettier */
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];

  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<void> {
    // Persistência em memoria
    const { email } = criaJogadorDto;

    //const emailEncontrado = this.jogadores.find((j) => j.email === email);

    const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

    if (jogadorEncontrado) {
      this.atualizar(jogadorEncontrado, criaJogadorDto);
    } else {
      this.criar(jogadorEncontrado);
    }
  }

  async consultaTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadores;
  }

  async consultarJogadorPorEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = this.jogadores.find((j) => j.email === email);
    if (!jogadorEncontrado) {
      throw new NotFoundException(
        `Jogador com e-mail ${email}, não encontrado`,
      );
    }
    return jogadorEncontrado;
  }

  private atualizar(
    emailEncontrado: Jogador,
    criarJogadorDto: CriarJogadorDto,
  ): void {
    const { nome } = criarJogadorDto;
    emailEncontrado.nome = nome;
  }

  async deletarJogador(email: string): Promise<void> {
    const jogadorEncontrado = this.jogadores.find((j) => j.email === email);
    this.jogadores = this.jogadores.filter(
      (jogador) => jogador.email !== jogadorEncontrado.email,
    );
  }

  private async criar(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const jogadorCriado = new this.jogadorModel(criaJogadorDto)
    return await jogadorCriado.save();

    /*
    const { nome, telefoneCelular, email } = criaJogadorDto;
    const jogador: Jogador = {
      //_id: uuidv4(),
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: 'www.google.com.br/foto.jpg',
    };
    this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`);
    this.jogadores.push(jogador);
    */
  }
}
