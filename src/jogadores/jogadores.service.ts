import { CriarJogadorDto } from './dtos/criar-jogador.dto';
/* eslint-disable prettier/prettier */
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Jogador } from './interfaces/jogador.interface';
//import * as uuid from 'uuid/v1'
import { v4 as uuidv4} from 'uuid'

@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = [];

    private readonly logger = new Logger(JogadoresService.name)

    async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<void>{
        
        // Persistência em memoria
        const {email} = criaJogadorDto;

        const emailEncontrado = this.jogadores.find(j => j.email === email)

        if(emailEncontrado){
            this.atualizar(emailEncontrado, criaJogadorDto);
        }else{
            this.criar(criaJogadorDto);
        }
    }

    async consultaTodosJogadores():Promise<Jogador[]>{
        return await this.jogadores;
    }

    async consultarJogadorPorEmail(email:string):Promise<Jogador>{
        const jogadorEncontrado = this.jogadores.find(j => j.email === email)
        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com e-mail ${email}, não encontrado`)
        }
        return jogadorEncontrado;
    }

    private atualizar(emailEncontrado:Jogador, criarJogadorDto: CriarJogadorDto):void
    {
        const {nome} = criarJogadorDto;
        emailEncontrado.nome = nome;
    }

    async deletarJogador(email:string):Promise<void>{
        const jogadorEncontrado = this.jogadores.find(j => j.email === email);
        this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email)
    }

    private criar(criaJogadorDto: CriarJogadorDto): void {
        const {nome, telefoneCelular, email} = criaJogadorDto;
        const jogador: Jogador = {
            _id: uuidv4(),
            nome,
            telefoneCelular,
            email,
            ranking: 'A',
            posicaoRanking: 1,
            urlFotoJogador: 'www.google.com.br/foto.jpg'
        }
        this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`)
        this.jogadores.push(jogador);
    }

}

