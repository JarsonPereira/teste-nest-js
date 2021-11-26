import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { Category } from "../entity/category.entity";
import { Result } from "../../utils/entity/result.model";
import { CategoryService } from "../service/category.service";
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { ValidatorInterceptor } from "../../utils/validators/interceptor.validator";
import { CategoryValidator } from "../validator/category.validator";

@Controller('category')
export class CategoryController {
    constructor(private readonly repository: CategoryService) { }

    @Get()
    @ApiOperation({ description: "Obtem todas as categorias." })
    @ApiResponse({ status: 200, description: 'Sucesso ao obter as categorias.' })
    @ApiResponse({ status: 400, description: 'Falha ao obter as categorias.' })
    async get() {
        try {
            const category = await this.repository.get();
            return new Result(null, true, category, null);
        } catch (error) {
            return new Result('Falha ao obter as categorias.', false, null, HttpStatus.BAD_REQUEST);
        }
    };

    @Get(':id')
    @ApiOperation({ description: "Obtem a categoria pelo id." })
    @ApiResponse({ status: 200, description: 'Sucesso ao obter a categoria por id.' })
    @ApiResponse({ status: 400, description: 'Falha ao obter a categoria por id.' })
    @ApiParam({ name: "id", type: Number, description: "Id da categoria" })
    async getById(@Param('id') id: number) {
        try {
            const category = await this.repository.getById(id);
            return new Result(null, true, category, null);
        } catch (error) {
            return new Result('Falha ao obter a categoria por ID', false, null, HttpStatus.BAD_REQUEST)
        }
    };

    @Get('/search/:name')
    @ApiOperation({ description: "Obtem a categoria pelo nome." })
    @ApiResponse({ status: 200, description: 'Sucesso ao obter a categoria pelo nome.' })
    @ApiResponse({ status: 400, description: 'Falha ao obter a categoria pelo nome.' })
    @ApiParam({ name: "name", type: String, description: "Nome da categoria" })
    async getByName(@Param('name') name: string) {
        try {
            const category = await this.repository.getByName(name);
            return new Result(null, true, category, null);
        } catch (error) {
            return new Result('Falha ao obter a categoria pelo nome.', false, null, HttpStatus.BAD_REQUEST);
        }
    };

    @Post()
    @ApiOperation({ description: "Cadastra uma nova categoria." })
    @ApiResponse({ status: 201, description: 'Categoria cadastrada com sucesso.' })
    @ApiResponse({ status: 400, description: 'Falha ao cadastrar uma nova categoria.' })
    @UseInterceptors(new ValidatorInterceptor(new CategoryValidator()))
    @ApiBody({ type: Category, description: "Categoria" })
    async post(@Body() model: Category) {
        try {
            await this.repository.post(model);
            return new Result('Categoria cadastrado com sucesso.', true, model, HttpStatus.CREATED);
        } catch (error) {
            return new Result('Falha ao cadastrar a categoria', false, model, HttpStatus.BAD_REQUEST);
        }
    };

    @Put(':id')
    @ApiOperation({ description: "Edita uma categoria existente." })
    @ApiResponse({ status: 200, description: 'Categoria atualizada com sucesso.' })
    @ApiResponse({ status: 400, description: 'Falha ao atualizar a categoria.' })
    @ApiParam({ name: "id", type: Number, description: "Id da categoria" })
    @ApiBody({ type: Category })
    @UseInterceptors(new ValidatorInterceptor(new CategoryValidator()))
    async put(@Body() model: Category, @Param('id') id: number) {
        try {
            await this.repository.put(id, model);
            return new Result('Categoria atualizado com sucesso.', true, model, HttpStatus.OK)

        } catch (error) {
            return new Result('Falha ao atualizar a categoria', false, [], HttpStatus.BAD_REQUEST)
        }
    };

    @Delete(':id')
    @ApiOperation({ description: "Apaga uma categoria existente baseada no id." })
    @ApiResponse({ status: 200, description: 'Categoria apagada com sucesso.' })
    @ApiResponse({ status: 400, description: 'Falha ao apagar a categoria.' })
    @ApiParam({ name: "id", type: Number, description: "Id da categoria" })
    async delete(@Param('id') id: number) {
        try {
            await this.repository.delete(id)
            return new Result('Categoria deletado com sucesso.', true, [], HttpStatus.OK)
        } catch (error) {
            return new Result('Falha ao deletar a categoria', false, null, HttpStatus.BAD_REQUEST)

        }
    };
}