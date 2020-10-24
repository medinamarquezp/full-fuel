/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, Column, CreatedAt, UpdatedAt, Model, Unique, PrimaryKey, HasMany } from "sequelize-typescript";
import { CCAAProperties } from "@/contexts/CCAAs/Domain/CCAAProperties";
import { FuelStationOrmEntity } from "@/contexts/FuelStations/Infrastructure/Persistence/FuelStationOrmEntity";

@Table({ timestamps: true, tableName: "ccaas" })
export class CCAAOrmEntity extends Model<CCAAOrmEntity> implements CCAAProperties
{
  @PrimaryKey
  @Unique
  @Column
  ccaaID: string;

  @Column
  name: string;

  @HasMany(() => FuelStationOrmEntity, "fuelstationID")
  fuelstations: FuelStationOrmEntity[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
