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
    async installment(@Body('installment') installment, @Param('name') name) {
        
        const produtc = await this.product.getByName(name);
        const price = produtc.price;
      

        
        return installment + " " + price
        //return new Result(null, true, IdCategoria, null);
    }

    
}