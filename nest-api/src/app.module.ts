import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryModule } from "./category/category.module";
import { InstallmentModule } from "./installment/installment.module";
import { ProductModule } from "./product/product.module";

@Module({
  imports: [TypeOrmModule.forRoot({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "951357",
    "database": "products",
    "synchronize": true,
    "logging": false,
    "entities": [
      "src/category/entity/**/*.ts",
      "src/product/entity/**/*.ts",
      "src/installment/entity/**/*.ts"
    ],
  }
  ), CategoryModule, ProductModule, InstallmentModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
