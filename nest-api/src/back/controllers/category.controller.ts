import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { Category } from "../entity/category.entity";
import { Result } from "../entity/result.model";
import { CategoryRepository } from "../repository/category.repository";
import { CategoryValidator } from "../validators/category.validator";
import { ValidatorInterceptor } from "../validators/interceptor.validator";


@Controller('category')
export class CategoryController {

    constructor(private repository: CategoryRepository) { }

    @Get()
    async get() {
        try {
            const category = await this.repository.get();
            return new Result(null, true, category, null);
        } catch (error) {
            return new Result('Falha ao obter as categorias.', false, null, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        try {
            const category = await this.repository.getById(id);
            return new Result(null, true, category, null);
        } catch (error) {
            return new Result('Falha ao obter a categoria por ID', false, null, HttpStatus.BAD_REQUEST)
        }
    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CategoryValidator()))
    async post(@Body() model: Category) {
        try {
            await this.repository.post(model);
            return new Result('Categporia cadastrado com sucesso.', true, model, HttpStatus.CREATED)
        } catch (error) {
            return new Result('Falha ao cadastrar a categoria', false, [], HttpStatus.BAD_REQUEST)

        }
    }

    @Put()
    @UseInterceptors(new ValidatorInterceptor(new CategoryValidator()))
    async put(@Body() model: Category, @Param('id') id: number) {
        try {
            await this.repository.put(id, model);
            return new Result('Categoria atualizado com sucesso.', true, model, HttpStatus.OK)

        } catch (error) {
            return new Result('Falha ao atualizar a categoria', false, [], HttpStatus.BAD_REQUEST)
        }
    }

    @Delete()
    async delete(@Param('id') id: number) {
        try {
            await this.repository.delete(id)
            return new Result('Categoria deletado com sucesso.', true, [], HttpStatus.OK)

        } catch (error) {
            return new Result('Falha ao deletar a categoria', false, null, HttpStatus.BAD_REQUEST)

        }
    }
}