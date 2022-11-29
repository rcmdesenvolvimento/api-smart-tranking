import { BadRequestException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
/* eslint-disable prettier/prettier */
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  //private jogadores: Jogador[] = [];

  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  private readonly logger = new Logger(JogadoresService.name);

  

  async criarJogador(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {

    const {email} = criaJogadorDto;
    const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

    if(jogadorEncontrado){
      throw new BadRequestException(`Jogador com e-mail ${email} já cadastrado.`)
    }
    const jogadorCriado = new this.jogadorModel(criaJogadorDto).save()
    return await jogadorCriado;
  }

  async AtualizarJogador(criaJogadorDto: CriarJogadorDto, id: string): Promise<void> {

    const jogadorEncontrado = await this.jogadorModel.findById({id}).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${id} não encontrado.`)
    } 
    await this.jogadorModel.findOneAndUpdate({id}, {$set: criaJogadorDto}).exec();
  }

  async consultaTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadorPorId(id: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findById({ id }).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${id}, não encontrado`);
    }
    return jogadorEncontrado;
  }

  async consultarJogadorPorEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com e-mail ${email}, não encontrado`,
      );
    }
    return jogadorEncontrado;
  }

  private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    return await this.jogadorModel
      .findOneAndUpdate(
        { email: criarJogadorDto.email },
        { $set: CriarJogadorDto },
      )
      .exec();
  }

  async deletarJogador(id: string): Promise<any> {
        
    if (!this.consultarJogadorPorId(id)) {
      throw new NotFoundException(`Jogador com id ${id}, não encontrado`);
    }

    return await this.jogadorModel.deleteOne({ id }).exec();
  }

}
