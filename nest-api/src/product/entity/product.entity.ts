import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../../category/entity/category.entity";


@Entity()
export class Product {

    @PrimaryGeneratedColumn()
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