import { Injectable } from "@nestjs/common";
import { Product } from "../entity/product.entity";
import { Validators } from "../../back/validators/validators";
import { ValidatorsContract } from "../../back/validators/validators.contract";

@Injectable()
export class ProductValidator implements ValidatorsContract {
    errors: any[];

    validator(product: Product): boolean {

        const validator = new Validators();

        validator.hasMaxLen(product.name, 30, "Número máximo de caracteres são permitidos 30.");
        validator.hasMinLen(product.name, 2, "Nome do produto muito curto.");
        validator.isRequired(product.name, "Informe  o nome do produto.")

        validator.hasMaxLen(product.description, 50, "Número máximo de caracteres permitidos são 50.");
        validator.hasMinLen(product.description, 10, "Descrição do produto muito curto.");
        validator.isRequired(product.description, "Informe a descrição do nome do produto.")

        validator.isRequired(product.price, "Informe o preço do produto.")

        this.errors = validator.errors;
        return validator.isValid();

    }


}