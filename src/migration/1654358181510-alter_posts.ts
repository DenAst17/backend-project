import { MigrationInterface, QueryRunner } from "typeorm"

export class alterPosts1654358181510 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE posts ADD created_at timestamp NOT NULL DEFAULT NOW()`);
        await queryRunner.query(`ALTER TABLE posts ADD updated_at timestamp NOT NULL DEFAULT NOW()`);
        await queryRunner.query(`ALTER TABLE posts ADD deleted_at timestamp DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE posts DROP COLUMN created_at`);
        await queryRunner.query(`ALTER TABLE posts DROP COLUMN updated_at`);
        await queryRunner.query(`ALTER TABLE posts DROP COLUMN deleted_at`);
    }

}
