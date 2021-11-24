import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Back } from "./back/back.module";
import { CategoryController } from "./back/controllers/category.controller";
import { Category } from "./back/entity/category.entity";
import { Product } from "./back/entity/product.entity";
import { CategoryRepository } from "./back/repository/category.repository";

@Module({
  imports: [Back],
  controllers: [],
  providers: [],
})

export class AppModule { }
