/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, Column, CreatedAt, UpdatedAt, Model, Unique, PrimaryKey } from "sequelize-typescript";
import { CCAAProperties } from "@/contexts/CCAAs/Domain/CCAAProperties";

@Table({ timestamps: true, tableName: "ccaas" })
export class CCAAOrmEntity extends Model<CCAAOrmEntity> implements CCAAProperties
{
  @PrimaryKey
  @Unique
  @Column
  externalID: string;

  @Column
  name: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
