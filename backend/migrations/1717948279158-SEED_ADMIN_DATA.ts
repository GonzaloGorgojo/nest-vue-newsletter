import { MigrationInterface, QueryRunner } from 'typeorm';

export class SEEDADMINDATA1717948279158 implements MigrationInterface {
  name = 'SEEDADMINDATA1717948279158';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "user" (id, name, email, password) VALUES (1, 'admin', 'admin@gmail.com', 'admin1234');`,
    );
    await queryRunner.query(
      `INSERT INTO "role" (id, type) VALUES (1, 'admin');`,
    );
    await queryRunner.query(
      `INSERT INTO "user_role" (fk_user_id, fk_role_id) VALUES (1, 1);`,
    );
    await queryRunner.query(
      `INSERT INTO "email_type" (type) VALUES ('Stori Cuenta');`,
    );
    await queryRunner.query(
      `INSERT INTO "email_type" (type) VALUES ('Stori Card');`,
    );
    await queryRunner.query(
      `INSERT INTO "email_type" (type) VALUES ('Stori Black');`,
    );
    await queryRunner.query(
      `INSERT INTO "email_type" (type) VALUES ('Stori Prestamo');`,
    );
    await queryRunner.query(
      `INSERT INTO "email_type" (type) VALUES ('Stori News');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "sent_email_recipient"`);
    await queryRunner.query(`DELETE FROM "sent_email_count"`);
    await queryRunner.query(`DELETE FROM "user"`);
    await queryRunner.query(`DELETE FROM "role"`);
    await queryRunner.query(`DELETE FROM "user_role"`);
    await queryRunner.query(`DELETE FROM "email_type"`);
  }
}
