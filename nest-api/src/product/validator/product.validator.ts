import { Injectable } from "@nestjs/common";
import { Product } from "../entity/product.entity";
import { Validators } from "../../utils/validators/validators";
import { ValidatorsContract } from "../../utils/validators/validators.contract";

@Injectable()
export class ProductValidator implements ValidatorsContract {
    errors: any[];

    validator(product: Product): boolean {

        const validator = new Validators();
        validator.isRequired(product.name, "Informe  o nome do produto.");
        validator.hasMaxLen(product.name, 30, "Número máximo de caracteres são permitidos 30.");
        validator.hasMinLen(product.name, 2, "Nome do produto muito curto.");

        validator.isRequired(product.description, "Informe a descrição do nome do produto.");
        validator.hasMaxLen(product.description, 50, "Número máximo de caracteres permitidos são 50.");
        validator.hasMinLen(product.description, 10, "Descrição do produto muito curto.");

        validator.isRequired(product.price, "Informe o preço do produto.");
        validator.hasMaxLen(product.price, 50, "Número máximo de caracteres permitidos são 10.");

        validator.isRequired(product.categoria, "Informe o id da categoria");
        validator.hasMaxLen(product.categoria, 3, "Número máximo de caracteres permitidos são 3");

        this.errors = validator.errors;
        return validator.isValid();
    }
}