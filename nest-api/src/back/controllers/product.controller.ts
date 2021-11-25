import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Product } from "../entity/product.entity";
import { ProductRepository } from "../repository/product.repository";

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
    async post(@Body() model: Product) {
        try {
            await this.repository.post(model);
        } catch (error) {
            return "Error"
        }
    }

    @Put()
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