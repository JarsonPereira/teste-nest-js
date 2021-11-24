import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Category } from "../entity/category.entity";
import { CategoryRepository } from "../repository/category.repository";

@Controller('category')
export class CategoryController {

    constructor(private repository: CategoryRepository) { }

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
    async post(@Body() model: Category) {
        try {
            await this.repository.post(model);
        } catch (error) {
            return "Error"
        }
    }

    @Put()
    async put(@Body() model: Category, @Param('id') id: number) {
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