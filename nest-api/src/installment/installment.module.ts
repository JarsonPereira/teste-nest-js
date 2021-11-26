import { Module } from "@nestjs/common";
import { CategoryModule } from "../category/category.module";
import { ProductModule } from "../product/product.module";
import { InstallmentController } from "./controller/installment.controller";

@Module({
    imports: [CategoryModule, ProductModule],
    controllers: [InstallmentController],
    providers: [],
    exports: []
})
export class InstallmentModule { };