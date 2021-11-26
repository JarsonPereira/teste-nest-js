import { Body, Controller, Delete, forwardRef, Get, HttpStatus, Inject, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { Category } from "../entity/category.entity";
import { Result } from "../../back/entity/result.model";
import { CategoryService } from "../service/category.service";
import { CategoryValidator } from "../validator/category.validator";
import { ValidatorInterceptor } from "../../back/validators/interceptor.validator";
import { ApiBody, ApiParam, ApiResponse } from "@nestjs/swagger";


@Controller('category')
export class CategoryController {

    constructor(@Inject(forwardRef(() => CategoryService))
    private repository: CategoryService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Sucesso ao obter as categorias' })
    @ApiResponse({ status: 404, description: 'Falha ao obter as categorias.' })
    async get() {
        try {
            const category = await this.repository.get();
            return new Result(null, true, category, null);
        } catch (error) {
            return new Result('Falha ao obter as categorias.', false, null, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':id')
    @ApiParam({ name: "id", type: Number })
    @ApiResponse({ status: 200, description: 'Sucesso ao obter a categoria por id' })
    @ApiResponse({ status: 404, description: 'Falha ao obter a categoria por ID.' })
    async getById(@Param('id') id: number) {
        try {
            const category = await this.repository.getById(id);
            return new Result(null, true, category, null);
        } catch (error) {
            return new Result('Falha ao obter a categoria por ID', false, null, HttpStatus.BAD_REQUEST)
        }
    }

    @Get('/search/:name')
    @ApiParam({ name: "name", type: String })
    async getByName(@Param('name') name: string) {
        try {
            const category = await this.repository.getByName(name);
            return new Result(null, true, category, null);
        } catch (error) {
            return new Result('Falha ao obter a categoria por Nome', false, null, HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    @ApiBody({ type: Category })
    @ApiResponse({ status: 201, description: 'Categoria cadastrada2 com sucesso.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    //@UseInterceptors(new ValidatorInterceptor(new CategoryValidator()))
    async post(@Body() model: Category) {
        try {
            await this.repository.post(model);
            return " Categoria cadastrada com sucesso.";
            //  new Result('Categoria cadastrado com sucesso.', true, model, HttpStatus.CREATED);
        } catch (error) {
            return new Result('Falha ao cadastrar a categoria', false, model, HttpStatus.BAD_REQUEST);

        }
    }

    @Put(':id')
    @ApiParam({ name: "id", type: Number })
    @ApiBody({ type: Category })
    // @UseInterceptors(new ValidatorInterceptor(new CategoryValidator()))
    async put(@Body() model: Category, @Param('id') id: number) {
        try {
            await this.repository.put(id, model);
            return new Result('Categoria atualizado com sucesso.', true, model, HttpStatus.OK)

        } catch (error) {
            return new Result('Falha ao atualizar a categoria', false, [], HttpStatus.BAD_REQUEST)
        }
    }

    @Delete(':id')
    @ApiParam({ name: "id", type: Number })
    async delete(@Param('id') id: number) {
        try {
            await this.repository.delete(id)
            return new Result('Categoria deletado com sucesso.', true, [], HttpStatus.OK)

        } catch (error) {
            return new Result('Falha ao deletar a categoria', false, null, HttpStatus.BAD_REQUEST)

        }
    }
}