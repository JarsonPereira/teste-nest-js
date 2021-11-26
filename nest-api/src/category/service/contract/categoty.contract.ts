import { Category } from "../../entity/category.entity";

export interface CategoryContract {
    get(): Promise<Category[]>;
    getById(id: number): Promise<Category>;
    getByName(name: string): Promise<Category>;
    post(category: Category);
    put(id: number, category: Category);
    delete(id: number);
}