import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Product } from "./product.entity";


@Entity()
export class Category {

    @PrimaryColumn()
    id: number

    @Column("varchar", { length: 30 })
    name: string

    @OneToMany(() => Product, categoria => Category)
    products: Product[];
}