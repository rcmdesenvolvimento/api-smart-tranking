/* eslint-disable prettier/prettier */
import { Body, Controller } from '@nestjs/common';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';

@Controller('api/v1/categorias')
export class CategoriasController {

    constructor(){}

    async criarCategoria(@Body(criarCategoriaDto: CriarCategoriaDto)){

    }


}
