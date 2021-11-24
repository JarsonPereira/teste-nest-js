import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Category } from "./category.entity";


@Entity()
export class Product {

    @PrimaryColumn()
    id: number

    @Column("varchar", { length: 30 })
    name: string

    @Column({ length: 50 })
    description: string

    @Column('decimal')
    price: number

    @ManyToOne(() => Category, products => Product)
    categoria: Category

}