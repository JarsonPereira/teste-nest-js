import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../../category/entity/category.entity";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ type: String, description: "Nome do produto" })
    @Column("varchar", { length: 30 })
    name: string;

    @ApiProperty({ type: String, description: "Descrição do produto" })
    @Column({ length: 50 })
    description: string;

    @ApiProperty({ type: Number, description: "Preço do produto" })
    @Column('decimal')
    price: number;

    @ApiProperty({ type: Number, description: "Id da categoria ao qual se relaciona." })
    @ManyToOne(() => Category, category => category.products)
    categoria: Promise<Category>;
}