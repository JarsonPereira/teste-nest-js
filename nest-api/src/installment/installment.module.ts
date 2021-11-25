import { Module } from "@nestjs/common";
import { InstallmentController } from "./controller/installment.controller";

@Module({
    imports: [],
    controllers: [InstallmentController],
    providers: [],
    exports: []
})
export class InstallmentModule { }