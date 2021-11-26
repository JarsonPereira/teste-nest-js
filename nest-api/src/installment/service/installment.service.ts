import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../../category/entity/category.entity";
import { Product } from "../../product/entity/product.entity";


export class InstallmentService {

    constructor(
        @InjectRepository(Product)
        private readonly product: Repository<Product>,

        @InjectRepository(Category)
        private readonly category: Repository<Product>,

    ) { }

    calc(value: number, porcent: number, quota: number): number {
        porcent = porcent / 100;
        var result = value * porcent / (1 - Math.pow(1 + porcent, -quota));
        return result;
    }
}