import { Category } from "../entity/category.entity";
import { Validators } from "../../back/validators/validators";
import { ValidatorsContract } from "../../back/validators/validators.contract";

export class CategoryValidator implements ValidatorsContract {
    errors: any[];
    validator(category: Category) {
    
        const validator = new Validators();
        validator.hasMaxLen(category.name, 30, "Número máximo de caracteres são permitidos 30.");
        validator.hasMinLen(category.name, 2, "Nome da categoria muito curto.");
        validator.isRequired(category.name, "Informe a categoria.")
        
        this.errors = validator.errors;
        return validator.isValid();

    }

}