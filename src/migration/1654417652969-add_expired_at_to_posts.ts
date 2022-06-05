import { MigrationInterface, QueryRunner } from "typeorm"

export class addExpiredAtToPosts1654417652969 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE posts ADD expired_at DATETIME`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE posts DROP COLUMN expired_at`);
    }

}
