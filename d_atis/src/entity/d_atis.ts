import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { DAtisType } from "../service/d_atis";

@Entity()
export class DAtis extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: false })
  icaoCode: string;

  @Column({
    type: "enum",
    enum: DAtisType,
    enumName: "d_atis_type_enum",
    nullable: false,
  })
  type: DAtisType;

  @Column({ type: "text", nullable: false })
  body: string;

  @Column({ type: "timestamp", nullable: false })
  timestamp: Date;
}
