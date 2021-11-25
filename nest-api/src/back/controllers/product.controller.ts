import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { Product } from "../entity/product.entity";
import { ProductRepository } from "../repository/product.repository";
import { ValidatorInterceptor } from "../validators/interceptor.validator";
import { ProductValidator } from "../validators/product.validator";

@Controller('product')
export class ProductController {

    constructor(private repository: ProductRepository) { }

    @Get()
    async get() {
        try {
            return await this.repository.get();
        } catch (error) {
            return "Error"
        }
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        try {
            return await this.repository.getById(id);
        } catch (error) {
            return "Error"
        }
    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new ProductValidator()))
    async post(@Body() model: Product) {
        try {
            await this.repository.post(model);
        } catch (error) {
            return "Error"
        }
    }

    @Put()
    @UseInterceptors(new ValidatorInterceptor(new ProductValidator()))
    async put(@Body() model: Product, @Param('id') id: number) {
        try {
            await this.repository.put(id, model);
        } catch (error) {
            return "Error"
        }
    }

    @Delete()
    async delete(@Param('id') id: number) {
        try {
            await this.repository.delete(id)
        } catch (error) {
            return "Error"
        }
    }

}