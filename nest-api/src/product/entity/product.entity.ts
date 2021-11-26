import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../../category/entity/category.entity";


@Entity()
export class Product {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ type: String })
    @Column("varchar", { length: 30 })
    name: string;

    @ApiProperty({ type: String })
    @Column({ length: 50 })
    description: string;

    @ApiProperty({ type: Number })
    @Column('decimal')
    price: number;

    @ApiProperty({ type: Number })
    @ManyToOne(() => Category, category => category.products)
    categoria: Promise<Category>;





    /* @OneToMany(() => Category, products => Product)
     categoria: Category
     */

}