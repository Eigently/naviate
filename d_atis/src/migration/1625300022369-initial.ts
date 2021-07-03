import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1625300022369 implements MigrationInterface {
  name = "initial1625300022369";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "d_atis_type_enum" AS ENUM(
        'combined',
        'arrival',
        'departure'
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "d_atis" (
        "id" SERIAL NOT NULL,
        "icao_code" text NOT NULL,
        "type" "d_atis_type_enum" NOT NULL,
        "body" text NOT NULL,
        "timestamp" TIMESTAMP NOT NULL,
        CONSTRAINT "PK_aa0ae5ef17aaafc9c775b01496c" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "d_atis"
    `);
    await queryRunner.query(`
      DROP TYPE "d_atis_type_enum"
    `);
  }
}
