import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entity/product.entity";


@Entity()
export class Category {

    @ApiProperty({ type: Number })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ type: String })
    @Column("varchar", { length: 30 })
    name: string;

    @ApiProperty({ type: Number })
    @Column('decimal')
    fees: number;

    @ApiProperty({ type: Product })
    @OneToMany(() => Product, product => product.categoria)
    products: Promise<Product[]>;



}