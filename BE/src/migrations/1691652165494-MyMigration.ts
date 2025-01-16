import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1691652165494 implements MigrationInterface {
    name = 'MyMigration1691652165494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "likes" ("id" SERIAL NOT NULL, "likes" integer NOT NULL, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "likes"`);
    }

}
