import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryModule } from "../category/category.module";
import { Product } from "../product/entity/product.entity";
import { ProductModule } from "../product/product.module";
import { ProductService } from "../product/service/product.service";
import { InstallmentController } from "./controller/installment.controller";
import { InstallmentService } from "./service/installment.service";

@Module({
    imports: [CategoryModule, ProductModule],
    controllers: [InstallmentController],
    providers: [],
    exports: []
})
export class InstallmentModule { }