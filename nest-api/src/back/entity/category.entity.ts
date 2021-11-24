import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";


@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 30 })
    name: string

    @OneToMany(() => Product, categoria => Category)
    products: Product[];
}