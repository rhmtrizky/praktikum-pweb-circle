import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1691655478314 implements MigrationInterface {
    name = 'MyMigration1691655478314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follows" DROP COLUMN "is_likes"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follows" ADD "is_likes" boolean NOT NULL`);
    }

}
