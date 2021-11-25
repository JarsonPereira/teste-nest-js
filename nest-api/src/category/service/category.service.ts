import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../../category/entity/category.entity";
import { CategoryContract } from "../../category/service/contract/categoty.contract";

@Injectable()
export class CategoryService implements CategoryContract {

    constructor(@InjectRepository(Category) private readonly repository: Repository<Category>) { }

    async get(): Promise<Category[]> {
        return await this.repository.find();
    }

    async getById(id: number): Promise<Category> {
        return await this.repository.findOne(id);
    }

    async post(category: Category) {
        await this.repository.save(category);
    }

    async put(id: number, category: Category) {
        await this.repository.update(id, category);
    }
    async delete(id: number) {
        await this.repository.delete(id);
    }
}