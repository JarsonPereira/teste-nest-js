import { Body, Controller, Delete, forwardRef, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { Product } from "../entity/product.entity";
import { Result } from "../../back/entity/result.model";
import { ProductService } from "../service/product.service";
import { ValidatorInterceptor } from "../../back/validators/interceptor.validator";
import { ProductValidator } from "../validator/product.validator";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiBody } from "@nestjs/swagger";
import { Category } from "../../category/entity/category.entity";
import { doesNotReject } from "assert";

@Controller('product')
export class ProductController {
    constructor(@Inject(forwardRef(() => ProductService))
    private repository: ProductService) { }

    @Get()
    async get() {
        try {
            const products = await this.repository.get();
            return new Result(null, true, products, null);
        } catch (error) {
            console.log(error);
            return new Result('Falha ao obter os produtos.', false, null, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        try {
            const produtc = await this.repository.getById(id);
            return new Result(null, true, produtc, null);
        } catch (error) {
            return new Result('Falha ao obter o produto por ID', false, null, HttpStatus.BAD_REQUEST)
        }
    }

    @Post()
    @ApiBody({ type: Product })
    // @UseInterceptors(new ValidatorInterceptor(new ProductValidator()))
    async post(@Body() model: Product) {
        try {

            console.log(this.repository);
            const product = new Product();
            product.name = model.name;
            product.description = model.description;
            product.price = model.price;
            product.categoria = model.categoria;
            // model.
            await this.repository.post(product);
            return new Result('Produto cadastrado com sucesso.', true, model, HttpStatus.CREATED)
        } catch (error) {
            console.log(error);


            return new Result('Falha ao cadastrar o produto', false, [], HttpStatus.BAD_REQUEST)

        }
    }

    @Put(':id')
    // @UseInterceptors(new ValidatorInterceptor(new ProductValidator()))
    async put(@Body() model: Product, @Param('id') id: number) {
        try {
            await this.repository.put(id, model);
            return new Result('Produto atualizado com sucesso.', true, model, HttpStatus.OK)

        } catch (error) {
            return new Result('Falha ao atualizar o produto', false, [], HttpStatus.BAD_REQUEST)
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        try {
            await this.repository.delete(id)
            return new Result('Produto deletado com sucesso.', true, [], HttpStatus.OK)

        } catch (error) {
            return new Result('Falha ao deletar o produto', false, null, HttpStatus.BAD_REQUEST)

        }
    }

}