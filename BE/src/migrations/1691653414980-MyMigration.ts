import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1691653414980 implements MigrationInterface {
    name = 'MyMigration1691653414980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "likes"`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "is_likes" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "threadId" integer`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_111596eb3f640a4c675ca0b6b9d" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_111596eb3f640a4c675ca0b6b9d"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "threadId"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "is_likes"`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "likes" integer NOT NULL`);
    }

}
