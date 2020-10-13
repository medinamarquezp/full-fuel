/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, Column, CreatedAt, UpdatedAt, Model, Unique, PrimaryKey, AutoIncrement } from "sequelize-typescript";
import { TimetablesProperties } from "@/contexts/Timetables/Domain/TimetablesProperties";

@Table({ timestamps: true, tableName: "timetables" })
export class TimetablesOrmEntity extends Model<TimetablesOrmEntity> implements TimetablesProperties
{
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @PrimaryKey
  @Column
  fuelstationID: number;

  @Column
  weekDay: number;

  @Column
  alwaysOpen: boolean;

  @Column
  opening: string;

  @Column
  closing: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
