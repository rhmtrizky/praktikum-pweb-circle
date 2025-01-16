import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1691749603762 implements MigrationInterface {
    name = 'MyMigration1691749603762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

}
