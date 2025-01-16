import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1697515676268 implements MigrationInterface {
    name = 'MyMigration1697515676268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "picture" TO "image"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "image" TO "picture"`);
    }

}
