import { Controller, Get } from "@nestjs/common";

@Controller('parcelamento')
export class InstallmentController {

    @Get()
    get() {
        return "Teste";
    }



}