/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, Column, CreatedAt, UpdatedAt, Model, Unique, PrimaryKey, AutoIncrement } from "sequelize-typescript";
import { FuelPricesDumpProperties } from "@/contexts/FuelPrices/Domain/FuelPricesDumpProperties";
import { FuelTypes } from "@/sharedDomain/FuelTypes";

@Table({ timestamps: true, tableName: "fuelpricesdump" })
export class FuelPricesDumpOrmEntity extends Model<FuelPricesDumpOrmEntity> implements FuelPricesDumpProperties
{
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @PrimaryKey
  @Column
  fuelstationID: number;

  @Column
  year: number;

  @Column
  month: number;

  @Column
  fuelType: FuelTypes;

  @Column
  max: number;

  @Column
  min: number;

  @Column
  avg: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
