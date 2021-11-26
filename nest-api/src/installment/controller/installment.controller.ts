import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Result } from "../../back/entity/result.model";
import { Category } from "../../category/entity/category.entity";
import { CategoryService } from "../../category/service/category.service";
import { Product } from "../../product/entity/product.entity";
import { ProductService } from "../../product/service/product.service";

@Controller('installment')
export class InstallmentController {
    constructor(
        private product: ProductService,
        private category: CategoryService,
    ) {

    }
    @Get()
    get() {
        return "Teste";
    }

    @Post(':name')
    async installment(@Body('installment') quota, @Param('name') name: string) {

        const produtc = await this.product.getByName(name);
        let categoryFees = (await produtc.categoria).fees;
        categoryFees = categoryFees / 100;
        const productPrice = produtc.price;

        const result = productPrice * categoryFees / (1 - Math.pow(1 + categoryFees, - quota))
        return result.toFixed(2);
        //return new Result(null, true, IdCategoria, null);
    }


}