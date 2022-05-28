import { MigrationInterface, QueryRunner } from "typeorm"

export class passwordAdded1653747646999 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> { // add migration
        await queryRunner.query(`ALTER TABLE users ADD password varchar(255) NOT NULL DEFAULT ''`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> { // cancel migration
    }

}
