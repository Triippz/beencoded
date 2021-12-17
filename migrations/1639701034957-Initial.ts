import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1639701034957 implements MigrationInterface {
    name = 'Initial1639701034957'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`beencoded\`.\`post_meta\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ogImage\` varchar(255) NULL, \`ogDescription\` longtext NULL, \`ogTitle\` varchar(255) NULL, \`twitterImage\` varchar(255) NULL, \`twitterDescription\` varchar(255) NULL, \`twitterTitle\` varchar(255) NULL, \`metaTitle\` varchar(255) NULL, \`metaDescription\` varchar(255) NULL, \`emailSubject\` varchar(255) NULL, \`frontMatter\` longtext NULL, \`featureImageAlt\` varchar(255) NULL, \`featureImageCaption\` varchar(255) NULL, \`emailOnly\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`beencoded\`.\`authority\` (\`id\` char(36) NOT NULL, \`name\` varchar(50) NOT NULL, \`description\` longtext NULL, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`beencoded\`.\`user_profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cover_image\` varchar(256) NULL, \`bio\` longtext NULL, \`website\` varchar(256) NULL, \`facebook\` varchar(256) NULL, \`twitter\` varchar(256) NULL, \`linkedin\` varchar(256) NULL, \`visibility\` varchar(256) NOT NULL DEFAULT 'PUBLIC', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`beencoded\`.\`users\` (\`id\` char(36) NOT NULL, \`first_name\` varchar(100) NOT NULL, \`last_name\` varchar(100) NOT NULL, \`password\` varchar(255) NOT NULL, \`slug\` varchar(191) NOT NULL, \`username\` varchar(200) NOT NULL, \`is_account_disabled\` tinyint NOT NULL DEFAULT 1, \`email\` varchar(200) NOT NULL, \`profile_image\` varchar(256) NULL, \`locale\` varchar(6) NULL, \`last_seen_at\` datetime NULL, \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`activation_key\` varchar(36) NULL, \`reset_key\` varchar(36) NULL, \`reset_date\` datetime NULL, \`profile_id\` int NULL, INDEX \`IDX_bc0c27d77ee64f0a097a5c269b\` (\`slug\`), INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`slug\` (\`slug\`), UNIQUE INDEX \`username\` (\`username\`), UNIQUE INDEX \`email\` (\`email\`), UNIQUE INDEX \`activationKey\` (\`activation_key\`), UNIQUE INDEX \`resetKey\` (\`reset_key\`), UNIQUE INDEX \`REL_23371445bd80cb3e413089551b\` (\`profile_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`beencoded\`.\`tags\` (\`id\` char(36) NOT NULL, \`name\` varchar(191) NOT NULL, \`slug\` varchar(191) NOT NULL, \`description\` longtext NULL, \`featureImage\` varchar(255) NULL, \`visibility\` varchar(255) NOT NULL DEFAULT 'PUBLIC', \`ogImage\` varchar(255) NULL, \`ogTitle\` varchar(255) NULL, \`ogDescription\` varchar(255) NULL, \`twitterImage\` varchar(255) NULL, \`twitterTitle\` varchar(255) NULL, \`twitterDescription\` varchar(255) NULL, \`metaTitle\` varchar(255) NULL, \`metaDescription\` varchar(255) NULL, \`canonicalUrl\` varchar(255) NULL, \`accentColor\` varchar(255) NULL, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`parentTagId\` char(36) NULL, \`createdById\` char(36) NULL, \`updatedById\` char(36) NULL, INDEX \`IDX_d90243459a697eadb8ad56e909\` (\`name\`), INDEX \`IDX_b3aa10c29ea4e61a830362bd25\` (\`slug\`), UNIQUE INDEX \`name\` (\`name\`), UNIQUE INDEX \`slug\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`beencoded\`.\`posts\` (\`id\` char(36) NOT NULL, \`title\` varchar(256) NOT NULL, \`slug\` varchar(191) NOT NULL, \`mobileDoc\` longtext NULL, \`html\` longtext NULL, \`plaintext\` longtext NULL, \`featureImg\` varchar(255) NULL, \`featured\` tinyint NOT NULL DEFAULT 0, \`status\` varchar(256) NOT NULL, \`locale\` varchar(6) NULL, \`visibility\` varchar(255) NOT NULL DEFAULT 'PUBLIC', \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`publishedAt\` datetime NULL, \`customExcerpt\` varchar(255) NULL, \`canonicalUrl\` varchar(255) NULL, \`authorId\` char(36) NULL, \`createdById\` char(36) NULL, \`updatedById\` char(36) NULL, \`publishedById\` char(36) NULL, \`metaId\` int NULL, INDEX \`IDX_54ddf9075260407dcfdd724857\` (\`slug\`), UNIQUE INDEX \`slug\` (\`slug\`), UNIQUE INDEX \`REL_ad26004fc7cc142c2a8fcb5419\` (\`metaId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`beencoded\`.\`users_authorities_authority\` (\`usersId\` char(36) NOT NULL, \`authorityId\` char(36) NOT NULL, INDEX \`IDX_40f9a46b50f9eaea1cd2abeecb\` (\`usersId\`), INDEX \`IDX_b6bcbfeda86bc600aaf799cf4b\` (\`authorityId\`), PRIMARY KEY (\`usersId\`, \`authorityId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`beencoded\`.\`posts_tags_tags\` (\`postsId\` char(36) NOT NULL, \`tagsId\` char(36) NOT NULL, INDEX \`IDX_cf364c7e6905b285c4b55a0034\` (\`postsId\`), INDEX \`IDX_ce163a967812183a51b044f740\` (\`tagsId\`), PRIMARY KEY (\`postsId\`, \`tagsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`beencoded\`.\`posts_authors_users\` (\`postsId\` char(36) NOT NULL, \`usersId\` char(36) NOT NULL, INDEX \`IDX_9daa1f21cc8733ad08dc341c8c\` (\`postsId\`), INDEX \`IDX_cc63fc050a3b2b1743415f1991\` (\`usersId\`), PRIMARY KEY (\`postsId\`, \`usersId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`users\` ADD CONSTRAINT \`FK_23371445bd80cb3e413089551bf\` FOREIGN KEY (\`profile_id\`) REFERENCES \`beencoded\`.\`user_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`tags\` ADD CONSTRAINT \`FK_8221bbe0507e44cdce13a07ad25\` FOREIGN KEY (\`parentTagId\`) REFERENCES \`beencoded\`.\`tags\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`tags\` ADD CONSTRAINT \`FK_e56de5f3dcb3c112de1e983b8e7\` FOREIGN KEY (\`createdById\`) REFERENCES \`beencoded\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`tags\` ADD CONSTRAINT \`FK_613bccbbe697ffcb6d454c8c137\` FOREIGN KEY (\`updatedById\`) REFERENCES \`beencoded\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`posts\` ADD CONSTRAINT \`FK_c5a322ad12a7bf95460c958e80e\` FOREIGN KEY (\`authorId\`) REFERENCES \`beencoded\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`posts\` ADD CONSTRAINT \`FK_14ee02b0fe49a09d1bcee6ce5ba\` FOREIGN KEY (\`createdById\`) REFERENCES \`beencoded\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`posts\` ADD CONSTRAINT \`FK_b53a4efade0e83a9a3d2a9ec9dd\` FOREIGN KEY (\`updatedById\`) REFERENCES \`beencoded\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`posts\` ADD CONSTRAINT \`FK_baa53a1b182b5b8d066cb11b154\` FOREIGN KEY (\`publishedById\`) REFERENCES \`beencoded\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`posts\` ADD CONSTRAINT \`FK_ad26004fc7cc142c2a8fcb54195\` FOREIGN KEY (\`metaId\`) REFERENCES \`beencoded\`.\`post_meta\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`users_authorities_authority\` ADD CONSTRAINT \`FK_40f9a46b50f9eaea1cd2abeecbd\` FOREIGN KEY (\`usersId\`) REFERENCES \`beencoded\`.\`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`users_authorities_authority\` ADD CONSTRAINT \`FK_b6bcbfeda86bc600aaf799cf4bd\` FOREIGN KEY (\`authorityId\`) REFERENCES \`beencoded\`.\`authority\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`posts_tags_tags\` ADD CONSTRAINT \`FK_cf364c7e6905b285c4b55a00343\` FOREIGN KEY (\`postsId\`) REFERENCES \`beencoded\`.\`posts\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`posts_tags_tags\` ADD CONSTRAINT \`FK_ce163a967812183a51b044f7404\` FOREIGN KEY (\`tagsId\`) REFERENCES \`beencoded\`.\`tags\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`posts_authors_users\` ADD CONSTRAINT \`FK_9daa1f21cc8733ad08dc341c8c4\` FOREIGN KEY (\`postsId\`) REFERENCES \`beencoded\`.\`posts\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`posts_authors_users\` ADD CONSTRAINT \`FK_cc63fc050a3b2b1743415f19913\` FOREIGN KEY (\`usersId\`) REFERENCES \`beencoded\`.\`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`posts_authors_users\` DROP FOREIGN KEY \`FK_cc63fc050a3b2b1743415f19913\``);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`posts_authors_users\` DROP FOREIGN KEY \`FK_9daa1f21cc8733ad08dc341c8c4\``);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`posts_tags_tags\` DROP FOREIGN KEY \`FK_ce163a967812183a51b044f7404\``);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`posts_tags_tags\` DROP FOREIGN KEY \`FK_cf364c7e6905b285c4b55a00343\``);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`users_authorities_authority\` DROP FOREIGN KEY \`FK_b6bcbfeda86bc600aaf799cf4bd\``);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`users_authorities_authority\` DROP FOREIGN KEY \`FK_40f9a46b50f9eaea1cd2abeecbd\``);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`posts\` DROP FOREIGN KEY \`FK_ad26004fc7cc142c2a8fcb54195\``);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`posts\` DROP FOREIGN KEY \`FK_baa53a1b182b5b8d066cb11b154\``);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`posts\` DROP FOREIGN KEY \`FK_b53a4efade0e83a9a3d2a9ec9dd\``);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`posts\` DROP FOREIGN KEY \`FK_14ee02b0fe49a09d1bcee6ce5ba\``);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`posts\` DROP FOREIGN KEY \`FK_c5a322ad12a7bf95460c958e80e\``);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`tags\` DROP FOREIGN KEY \`FK_613bccbbe697ffcb6d454c8c137\``);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`tags\` DROP FOREIGN KEY \`FK_e56de5f3dcb3c112de1e983b8e7\``);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`tags\` DROP FOREIGN KEY \`FK_8221bbe0507e44cdce13a07ad25\``);
        await queryRunner.query(`ALTER TABLE \`beencoded\`.\`users\` DROP FOREIGN KEY \`FK_23371445bd80cb3e413089551bf\``);
        await queryRunner.query(`DROP INDEX \`IDX_cc63fc050a3b2b1743415f1991\` ON \`beencoded\`.\`posts_authors_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_9daa1f21cc8733ad08dc341c8c\` ON \`beencoded\`.\`posts_authors_users\``);
        await queryRunner.query(`DROP TABLE \`beencoded\`.\`posts_authors_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_ce163a967812183a51b044f740\` ON \`beencoded\`.\`posts_tags_tags\``);
        await queryRunner.query(`DROP INDEX \`IDX_cf364c7e6905b285c4b55a0034\` ON \`beencoded\`.\`posts_tags_tags\``);
        await queryRunner.query(`DROP TABLE \`beencoded\`.\`posts_tags_tags\``);
        await queryRunner.query(`DROP INDEX \`IDX_b6bcbfeda86bc600aaf799cf4b\` ON \`beencoded\`.\`users_authorities_authority\``);
        await queryRunner.query(`DROP INDEX \`IDX_40f9a46b50f9eaea1cd2abeecb\` ON \`beencoded\`.\`users_authorities_authority\``);
        await queryRunner.query(`DROP TABLE \`beencoded\`.\`users_authorities_authority\``);
        await queryRunner.query(`DROP INDEX \`REL_ad26004fc7cc142c2a8fcb5419\` ON \`beencoded\`.\`posts\``);
        await queryRunner.query(`DROP INDEX \`slug\` ON \`beencoded\`.\`posts\``);
        await queryRunner.query(`DROP INDEX \`IDX_54ddf9075260407dcfdd724857\` ON \`beencoded\`.\`posts\``);
        await queryRunner.query(`DROP TABLE \`beencoded\`.\`posts\``);
        await queryRunner.query(`DROP INDEX \`slug\` ON \`beencoded\`.\`tags\``);
        await queryRunner.query(`DROP INDEX \`name\` ON \`beencoded\`.\`tags\``);
        await queryRunner.query(`DROP INDEX \`IDX_b3aa10c29ea4e61a830362bd25\` ON \`beencoded\`.\`tags\``);
        await queryRunner.query(`DROP INDEX \`IDX_d90243459a697eadb8ad56e909\` ON \`beencoded\`.\`tags\``);
        await queryRunner.query(`DROP TABLE \`beencoded\`.\`tags\``);
        await queryRunner.query(`DROP INDEX \`REL_23371445bd80cb3e413089551b\` ON \`beencoded\`.\`users\``);
        await queryRunner.query(`DROP INDEX \`resetKey\` ON \`beencoded\`.\`users\``);
        await queryRunner.query(`DROP INDEX \`activationKey\` ON \`beencoded\`.\`users\``);
        await queryRunner.query(`DROP INDEX \`email\` ON \`beencoded\`.\`users\``);
        await queryRunner.query(`DROP INDEX \`username\` ON \`beencoded\`.\`users\``);
        await queryRunner.query(`DROP INDEX \`slug\` ON \`beencoded\`.\`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`beencoded\`.\`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`beencoded\`.\`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_bc0c27d77ee64f0a097a5c269b\` ON \`beencoded\`.\`users\``);
        await queryRunner.query(`DROP TABLE \`beencoded\`.\`users\``);
        await queryRunner.query(`DROP TABLE \`beencoded\`.\`user_profile\``);
        await queryRunner.query(`DROP TABLE \`beencoded\`.\`authority\``);
        await queryRunner.query(`DROP TABLE \`beencoded\`.\`post_meta\``);
    }

}
