import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../../category/entity/category.entity";
import { Product } from "../entity/product.entity";
import { ProductContracts } from "./contract/product.contratc";

@Injectable()
export class ProductService implements ProductContracts {
    constructor(@InjectRepository(Product)
    private readonly repository: Repository<Product>) { }

    async get(): Promise<Product[]> {
        return await this.repository.find({ relations: ['categoria'] });
    };

    async getByName(name: string): Promise<Product> {
        return await this.repository.findOne({ name: name })
    };

    async getById(id: number): Promise<Product> {
        return await this.repository.findOne(id);
    };

    async post(product: Product) {
        await this.repository.save(product);
    };

    async put(id: number, product: Product) {
        await this.repository.update(id, product)
    };

    async delete(id: number) {
        await this.repository.delete(id);
    };
}