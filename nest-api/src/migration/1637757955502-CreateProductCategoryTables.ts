import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateProductCategoryTables1637757955502 implements MigrationInterface {
    name = 'CreateProductCategoryTables1637757955502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" integer NOT NULL, "name" character varying(30) NOT NULL, "description" character varying(50) NOT NULL, "price" numeric NOT NULL, "categoriaId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" integer NOT NULL, "name" character varying(30) NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_4571d9be1660f363029320af4da" FOREIGN KEY ("categoriaId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_4571d9be1660f363029320af4da"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
