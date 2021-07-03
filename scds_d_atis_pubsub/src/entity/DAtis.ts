import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

export enum DAtisType {
  COMBINED = "combined",
  ARRIVAL = "arrival",
  DEPARTURE = "departure",
}

@Entity()
export class DAtis extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: false })
  icaoCode: string;

  @Column({ type: "enum", enum: DAtisType, nullable: false })
  type: DAtisType;

  @Column({ type: "text", nullable: false })
  body: string;

  @Column({ type: "timestamp", nullable: false })
  timestamp: Date;
}
