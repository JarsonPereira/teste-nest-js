import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryController } from "./controllers/category.controller";
import { Category } from "./entity/category.entity";
import { Product } from "./entity/product.entity";
import { CategoryRepository } from "./repository/category.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product])],
  controllers: [CategoryController],
  providers: [CategoryRepository],
})

export class AppModule { }
