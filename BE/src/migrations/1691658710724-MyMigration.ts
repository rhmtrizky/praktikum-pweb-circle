import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1691658710724 implements MigrationInterface {
    name = 'MyMigration1691658710724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follows" DROP CONSTRAINT "FK_eeb492da6894abf2e0acceb53f2"`);
        await queryRunner.query(`ALTER TABLE "follows" DROP CONSTRAINT "FK_c77d420803befa5276899a1a620"`);
        await queryRunner.query(`ALTER TABLE "follows" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "follows" DROP COLUMN "threadId"`);
        await queryRunner.query(`ALTER TABLE "follows" ADD "followerId" integer`);
        await queryRunner.query(`ALTER TABLE "follows" ADD "followedId" integer`);
        await queryRunner.query(`ALTER TABLE "follows" ADD CONSTRAINT "FK_fdb91868b03a2040db408a53331" FOREIGN KEY ("followerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follows" ADD CONSTRAINT "FK_d5ab44405d07cecac582c6448bf" FOREIGN KEY ("followedId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follows" DROP CONSTRAINT "FK_d5ab44405d07cecac582c6448bf"`);
        await queryRunner.query(`ALTER TABLE "follows" DROP CONSTRAINT "FK_fdb91868b03a2040db408a53331"`);
        await queryRunner.query(`ALTER TABLE "follows" DROP COLUMN "followedId"`);
        await queryRunner.query(`ALTER TABLE "follows" DROP COLUMN "followerId"`);
        await queryRunner.query(`ALTER TABLE "follows" ADD "threadId" integer`);
        await queryRunner.query(`ALTER TABLE "follows" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "follows" ADD CONSTRAINT "FK_c77d420803befa5276899a1a620" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follows" ADD CONSTRAINT "FK_eeb492da6894abf2e0acceb53f2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
