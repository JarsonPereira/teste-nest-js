import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { Result } from "../entity/result.model";
import { ValidatorsContract } from "./validators.contract";

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
    constructor(public contract: ValidatorsContract) { }
    
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        throw new Error("Method not implemented.");
    }

 /* intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const body = context.switchToHttp().getRequest().body;
        const valid = this.contract.validator(body);
        if (!valid) {
            throw new HttpException(new Result('Erro ao validar requisição', false, body, this.contract.errors), HttpStatus.BAD_REQUEST)
        }
        return next;
    } */
}