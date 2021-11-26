import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entity/product.entity";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ type: String, description: "Nome da Categoria" })
    @Column("varchar", { length: 30 })
    name: string;

    @ApiProperty({ type: Number, description: "Juros" })
    @Column('decimal')
    fees: number;

    @OneToMany(() => Product, product => product.categoria)
    products: Promise<Product[]>;
}