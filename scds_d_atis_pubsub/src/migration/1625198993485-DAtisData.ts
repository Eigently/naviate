import { MigrationInterface, QueryRunner } from "typeorm";

export class DAtisData1625198993485 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "d_atis_type" AS ENUM (
        'combined',
        'arrival',
        'departure'
      );
    `);
    await queryRunner.query(`
      CREATE TABLE "d_atis" (
        "id" SERIAL PRIMARY KEY,
        "icao_code" text,
        "type" d_atis_type,
        "body" text,
        "timestamp" timestamp DEFAULT (now())
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "d_atis";
    `);
    await queryRunner.query(`
      DROP TYPE "d_atis_type";
    `);
  }
}
