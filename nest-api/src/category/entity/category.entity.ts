import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entity/product.entity";


@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 30 })
    name: string

    @Column('decimal')
    fees: number

    @OneToMany(() => Product, categoria => Category)
    products: Product[];
}