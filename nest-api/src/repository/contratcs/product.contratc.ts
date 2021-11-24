import { Product } from "../../entity/product.entity";

export interface ProductContracts {

    get(): Promise<Product[]>;
    getById(id: number): Promise<Product>;
    post(product: Product);
    put(id: number, product: Product);
    delete(id:number);

}