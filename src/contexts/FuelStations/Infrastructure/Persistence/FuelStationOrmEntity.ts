/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, Column, CreatedAt, UpdatedAt, Model, Unique, PrimaryKey, AutoIncrement, HasMany, ForeignKey, AllowNull } from "sequelize-typescript";
import { FuelStationProperties } from "@/contexts/FuelStations/Domain/FuelStationProperties";
import { CCAAOrmEntity } from "@/contexts/CCAAs/Infrastructure/Persistence/CCAAOrmEntity";
import { FuelPriceOrmEntity } from "@/contexts/FuelPrices/Infrastructure/Persistence/FuelPriceOrmEntity";
import { TimetablesOrmEntity } from "@/contexts/Timetables/Infrastructure/Persistence/TimetablesOrmEntity";

@Table({ timestamps: true, tableName: "fuelstations" })
export class FuelStationOrmEntity extends Model<FuelStationOrmEntity> implements FuelStationProperties
{
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @PrimaryKey
  @Column
  fuelstationID: number;

  @ForeignKey(() => CCAAOrmEntity)
  @Column
  ccaaID: string;

  @Column
  name: string;

  @Column
  address: string;

  @Column
  postalCode: string;

  @Column
  province: string;

  @Column
  city: string;

  @Column
  town: string;

  @Column
  latitude: number;

  @Column
  longitude: number;

  @Column
  isAlwaysOpen: boolean;

  @Column
  timetable: string;

  @HasMany(() => TimetablesOrmEntity, "fuelstationID")
  timetables: TimetablesOrmEntity[];

  @HasMany(() => FuelPriceOrmEntity, "fuelstationID")
  prices: FuelPriceOrmEntity[];

  @AllowNull
  @Column
  bestDay: number;

  @AllowNull
  @Column
  bestMoment: string;

  @AllowNull
  @Column
  brandImage: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
