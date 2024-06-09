import { MigrationInterface, QueryRunner } from 'typeorm';

export class CREATEINITIALSTRUCTURE1717948263856 implements MigrationInterface {
  name = 'CREATEINITIALSTRUCTURE1717948263856';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "type" character varying(100) NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_role" ("id" SERIAL NOT NULL, "fk_user_id" integer, "fk_role_id" integer, CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "email_type" ("id" SERIAL NOT NULL, "type" character varying(256) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_68f3e9ddad2035c256245f37855" UNIQUE ("type"), CONSTRAINT "PK_052f23c54fa604cc27c38c978e7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "recipient" ("id" SERIAL NOT NULL, "email" character varying(256) NOT NULL, CONSTRAINT "UQ_1c7edb75902f3ae5e8029875ee8" UNIQUE ("email"), CONSTRAINT "PK_9f7a695711b2055e3c8d5cfcfa1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sent_email_count" ("id" SERIAL NOT NULL, "date_sent" TIMESTAMP NOT NULL DEFAULT now(), "recipient_count" integer NOT NULL, "fk_user_id" integer, "fk_email_type_id" integer, CONSTRAINT "PK_0a466b3cc172ceccbbdeb729caf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sent_email_recipient" ("id" SERIAL NOT NULL, "date_sent" TIMESTAMP NOT NULL, "fk_recipient_id" integer, "fk_email_batch_id" integer, CONSTRAINT "PK_4a099b1eac4531d354f8cda5d4c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "unsuscribed" ("id" SERIAL NOT NULL, "date_unsuscribed" TIMESTAMP NOT NULL, "fk_email_type_id" integer, "fk_recipient_id" integer, CONSTRAINT "REL_b397b6fd07be29e92c4cb5f8b6" UNIQUE ("fk_recipient_id"), CONSTRAINT "PK_f69598a07c784f4e132ce704062" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_57c3af6b060d4c56bde237afd06" FOREIGN KEY ("fk_user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_3dfb13d2c2f2d5d5800bcfc0a11" FOREIGN KEY ("fk_role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sent_email_count" ADD CONSTRAINT "FK_de19eff78720153c721644b1999" FOREIGN KEY ("fk_user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sent_email_count" ADD CONSTRAINT "FK_6a5f61e6f3bcf5b10fc04cacaeb" FOREIGN KEY ("fk_email_type_id") REFERENCES "email_type"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sent_email_recipient" ADD CONSTRAINT "FK_a7d13c7555651e58b80aafd88bb" FOREIGN KEY ("fk_recipient_id") REFERENCES "recipient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sent_email_recipient" ADD CONSTRAINT "FK_3b026e66b9f22f0eeb8b06974f7" FOREIGN KEY ("fk_email_batch_id") REFERENCES "sent_email_count"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "unsuscribed" ADD CONSTRAINT "FK_54f83bd575d29d26d84077d4035" FOREIGN KEY ("fk_email_type_id") REFERENCES "email_type"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "unsuscribed" ADD CONSTRAINT "FK_b397b6fd07be29e92c4cb5f8b6a" FOREIGN KEY ("fk_recipient_id") REFERENCES "recipient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "unsuscribed" DROP CONSTRAINT "FK_b397b6fd07be29e92c4cb5f8b6a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "unsuscribed" DROP CONSTRAINT "FK_54f83bd575d29d26d84077d4035"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sent_email_recipient" DROP CONSTRAINT "FK_3b026e66b9f22f0eeb8b06974f7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sent_email_recipient" DROP CONSTRAINT "FK_a7d13c7555651e58b80aafd88bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sent_email_count" DROP CONSTRAINT "FK_6a5f61e6f3bcf5b10fc04cacaeb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sent_email_count" DROP CONSTRAINT "FK_de19eff78720153c721644b1999"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_3dfb13d2c2f2d5d5800bcfc0a11"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_57c3af6b060d4c56bde237afd06"`,
    );
    await queryRunner.query(`DROP TABLE "unsuscribed"`);
    await queryRunner.query(`DROP TABLE "sent_email_recipient"`);
    await queryRunner.query(`DROP TABLE "sent_email_count"`);
    await queryRunner.query(`DROP TABLE "recipient"`);
    await queryRunner.query(`DROP TABLE "email_type"`);
    await queryRunner.query(`DROP TABLE "user_role"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
