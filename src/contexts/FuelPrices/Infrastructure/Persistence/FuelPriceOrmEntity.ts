/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, Column, CreatedAt, UpdatedAt, Model, Unique, PrimaryKey, AutoIncrement } from "sequelize-typescript";
import { FuelPriceProperties } from "@/contexts/FuelPrices/Domain/FuelPriceProperties";
import { dayMoments } from "@/sharedDomain/Today";
import { FuelTypes } from "@/contexts/FuelPrices/Domain/FuelTypes";
import { FuelPriceEvolution } from "@/contexts/FuelPrices/Domain/FuelPriceEvolution";

@Table({ timestamps: true, tableName: "fuelprices" })
export class FuelPriceOrmEntity extends Model<FuelPriceOrmEntity> implements FuelPriceProperties
{
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @PrimaryKey
  @Column
  fuelstationID: number;

  @Column
  month: number;

  @Column
  week: number;

  @Column
  day: number;

  @Column
  weekDay: number;

  @Column
  hour: number;

  @Column
  moment: dayMoments;

  @Column
  fuelType: FuelTypes;

  @Column
  price: number;

  @Column
  evolution: FuelPriceEvolution;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
