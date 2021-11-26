import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { Product } from "../entity/product.entity";
import { Result } from "../../utils/entity/result.model";
import { ProductService } from "../service/product.service";
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";

@Controller('product')
export class ProductController {
    constructor(private readonly repository: ProductService) { }

    @Get()
    @ApiOperation({ description: "Obtem todos os produtos." })
    @ApiResponse({ status: 200, description: 'Sucesso ao obter os produtos.' })
    @ApiResponse({ status: 400, description: 'Falha ao obter os produtos.' })
    async get() {
        try {
            const products = await this.repository.get();
            return new Result(null, true, products, null);
        } catch (error) {
            return new Result('Falha ao obter os produtos.', false, error, HttpStatus.BAD_REQUEST);
        }
    };

    @Get(':id')
    @ApiOperation({ description: "Obtem um produto pelo id." })
    @ApiResponse({ status: 200, description: 'Sucesso ao obter o produto pelo id.' })
    @ApiResponse({ status: 400, description: 'Falha ao obter o produto pelo id.' })
    @ApiParam({ name: "id", description: "Id do produto" })
    async getById(@Param('id') id: number) {
        try {
            const produtc = await this.repository.getById(id);
            return new Result(null, true, produtc, null);
        } catch (error) {
            return new Result('Falha ao obter o produto por ID', false, null, HttpStatus.BAD_REQUEST)
        }
    };

    @Post()
    @ApiOperation({ description: "Cadastra um novo produto." })
    @ApiResponse({ status: 200, description: 'Produto cadastrado com sucesso.' })
    @ApiResponse({ status: 400, description: 'Falha ao cadastrar novo produto.' })
    @ApiBody({ type: Product, description: "Produto" })
    // @UseInterceptors(new ValidatorInterceptor(new ProductValidator()))
    async post(@Body() model: Product) {
        try {
            const product = new Product();
            product.name = model.name;
            product.description = model.description;
            product.price = model.price;
            product.categoria = model.categoria;
            await this.repository.post(product);
            return new Result('Produto cadastrado com sucesso.', true, product, HttpStatus.CREATED)
        } catch (error) {
            return new Result('Falha ao cadastrar o produto', false, [], HttpStatus.BAD_REQUEST)
        }
    };

    @Put(':id')
    @ApiOperation({ description: "Atualiza um produto." })
    @ApiResponse({ status: 200, description: 'Produto atualizado com sucesso.' })
    @ApiResponse({ status: 400, description: 'Falha ao atualizado produto.' })
    @ApiParam({ name: "id", type: Number, description: "Id do produto" })
    @ApiBody({ type: Product, description: "Produto" })
    // @UseInterceptors(new ValidatorInterceptor(new ProductValidator()))
    async put(@Body() model: Product, @Param('id') id: number) {
        try {
            await this.repository.put(id, model);
            return new Result('Produto atualizado com sucesso.', true, model, HttpStatus.OK)
        } catch (error) {
            return new Result('Falha ao atualizar o produto', false, [], HttpStatus.BAD_REQUEST)
        }
    };

    @Delete(':id')
    @ApiOperation({ description: "Apaga um produto pelo id." })
    @ApiResponse({ status: 200, description: 'Produto apagado com sucesso.' })
    @ApiResponse({ status: 400, description: 'Falha ao apagar produto.' })
    @ApiParam({ name: "id", type: Number, description: "Id do produto" })
    async delete(@Param('id') id: number) {
        try {
            await this.repository.delete(id)
            return new Result('Produto apagado com sucesso.', true, [], HttpStatus.OK)
        } catch (error) {
            return new Result('Falha ao apagar o produto', false, null, HttpStatus.BAD_REQUEST)
        }
    };
}