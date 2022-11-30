import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
/* eslint-disable prettier/prettier */
import * as common from '@nestjs/common';
import { Jogador } from './interfaces/jogador.interface';
//import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador-dto';

@common.Injectable()
export class JogadoresService {
  //private jogadores: Jogador[] = [];
  
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  //private readonly logger = new Logger(JogadoresService.name);

  async criarJogador(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {

    const {email} = criaJogadorDto;
    const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

    if(jogadorEncontrado){
      throw new BadRequestException(`Jogador com e-mail ${email} já cadastrado.`)
    }
    const jogadorCriado = new this.jogadorModel(criaJogadorDto).save()
    return await jogadorCriado;
  }

  async atualizarJogador(_id: string, atualizarJogadorDto: AtualizarJogadorDto): Promise<void> {

    const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

    if (!jogadorEncontrado) {
      throw new common.NotFoundException(`Jogador com id ${_id} não encontrado.`)
    } 
    await this.jogadorModel.findOneAndUpdate({_id}, {$set: atualizarJogadorDto}).exec();
  }

  async consultaTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadorPorId(_id: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${_id}, não encontrado`);
    }
    return jogadorEncontrado;
  }

  async consultarJogadorPorEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();
    if (!jogadorEncontrado) {
      throw new common.NotFoundException(`Jogador com e-mail ${email}, não encontrado`,
      );
    }
    return jogadorEncontrado;
  }

  async deletarJogador(_id: string): Promise<any> {

    const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();
        
    if (!jogadorEncontrado) {
      throw new common.NotFoundException(`Jogador com id ${_id}, não encontrado`);
    }

    return await this.jogadorModel.deleteOne({ _id }).exec(); 
  }

}
