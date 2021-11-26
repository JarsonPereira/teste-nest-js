import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam } from "@nestjs/swagger";
import { ProductService } from "../../product/service/product.service";

@Controller('installment')
export class InstallmentController {
    constructor(private product: ProductService) { }

    @Get()
    @ApiOperation({ description: "Metodo Get simples" })
    get() {
        return "Bem vindo ao endpoint de parcelamento."
    };

    @Post(':name')
    @ApiOperation({
        description: "EndPoint para calcular o valor mensal do produto" +
            +" Deverar acessar o metodo Post informando o nome do produto na url." +
            +" No corpo da requisição deverá informar em quantas vezes quer parcelar o produto."
    })
    @ApiParam({ name: "Nome do produto", type: String })
    @ApiBody({ description: "Número de parcelas" })
    async installment(@Body('installment') quota, @Param('name') name: string) {
        const product = await this.product.getByName(name);
        let categoryFees = (await product.categoria).fees;
        categoryFees = categoryFees / 100;
        const productPrice = product.price;
        var result = productPrice * categoryFees / (1 - Math.pow(1 + categoryFees, - quota))
        const total = result * quota;
        return `Valor Mensal: ${result.toFixed(2)} por ${quota} meses. Totalizando: ${total.toFixed(2)}`;
    };
}