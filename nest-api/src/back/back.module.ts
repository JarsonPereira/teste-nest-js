import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryController } from "../category/controller/category.controller";
import { Category } from "../category/entity/category.entity";
import { Product } from "../product/entity/product.entity";
import { CategoryService } from "../category/service/category.service";


@Module({
    imports: [TypeOrmModule.forFeature([Category, Product])],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService]
})

export class BackModule { }
