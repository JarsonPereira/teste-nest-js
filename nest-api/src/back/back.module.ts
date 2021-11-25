import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryController } from "./controllers/category.controller";
import { Category } from "./entity/category.entity";
import { CategoryRepository } from "./repository/category.repository";


@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [CategoryController],
    providers: [CategoryRepository],
})

export class Back { }
