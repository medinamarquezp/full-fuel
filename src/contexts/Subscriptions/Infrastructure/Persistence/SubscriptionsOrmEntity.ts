/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, Column, CreatedAt, UpdatedAt, Model, Unique, PrimaryKey, AutoIncrement } from "sequelize-typescript";
import { FuelTypes } from "@/sharedDomain/FuelTypes";
import { SubscriptionsProperties } from "@/contexts/Subscriptions/Domain/SubscriptionsProperties";

@Table({ timestamps: true, tableName: "subscriptions" })
export class SubscriptionsOrmEntity extends Model<SubscriptionsOrmEntity> implements SubscriptionsProperties
{
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @PrimaryKey
  @Column
  fuelstationID: number;

  @Column
  fuelType: FuelTypes;

  @Column
  numSubscriptions: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
