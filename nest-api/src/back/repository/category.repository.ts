import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../entity/category.entity";
import { CategoryContract } from "./contratcs/categoty.contract";

@Injectable()
export class CategoryRepository implements CategoryContract {
    constructor(@InjectRepository(Category) private readonly abc: Repository<Category>) { }

    async get(): Promise<Category[]> {
        return await this.abc.find();
    }

    async getById(id: number): Promise<Category> {
        return await this.abc.findOne(id);
    }

    async post(category: Category) {
        await this.abc.save(category);
    }

    async put(id: number, category: Category) {
        await this.abc.update(id, category);
    }
    async delete(id: number) {
        await this.abc.delete(id);
    }
}