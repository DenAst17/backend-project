import { MigrationInterface, QueryRunner } from "typeorm";

export class PWMigration1653593737996 implements MigrationInterface {
    name = 'PWMigration1653593737996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`posts_ibfk_1\``);
        await queryRunner.query(`DROP INDEX \`user_id\` ON \`posts\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`id\` \`id\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`surname\` \`surname\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`id\` \`id\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`post_title\` \`post_title\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`post_text\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`post_text\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`user_id\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`user_id\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`post_text\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`post_text\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`post_title\` \`post_title\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`id\` bigint NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`id\` \`id\` bigint NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`surname\` \`surname\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`name\` \`name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`id\` bigint NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`id\` \`id\` bigint NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
        await queryRunner.query(`CREATE INDEX \`user_id\` ON \`posts\` (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`posts_ibfk_1\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
