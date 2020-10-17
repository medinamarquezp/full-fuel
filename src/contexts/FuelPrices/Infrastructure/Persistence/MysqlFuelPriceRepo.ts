import Sequelize from "sequelize";
import { FuelPrice } from "@/contexts/FuelPrices/Domain/FuelPrice";
import { FuelPricesDump } from "@/contexts/FuelPrices/Domain/FuelPricesDump";
import { FuelTypes } from "@/contexts/FuelPrices/Domain/FuelTypes";
import { FuelPriceEvolution } from "@/contexts/FuelPrices/Domain/FuelPriceEvolution";
import { FuelPriceRepo } from "@/contexts/FuelPrices/Domain/FuelPriceRepo";
import { FuelPriceStatisticsType } from "@/contexts/FuelPrices/Domain/FuelPriceStatistics";
import { FuelPriceOrmEntity } from "./FuelPriceOrmEntity";
import { FuelPricesDumpOrmEntity } from "./FuelPricesDumpOrmEntity";
import { Serializer } from "@/sharedInfrastructure/Serializer";
import { DBConnection } from "@/sharedInfrastructure/Persistence/ORM/DBconnection";

export class MysqlFuelPriceRepo implements FuelPriceRepo
{
  constructor()
  {
    DBConnection.getInstance().addModels([FuelPriceOrmEntity, FuelPricesDumpOrmEntity]);
  }

  async save(price: FuelPrice): Promise<void>{
    const serializedData = Serializer.classToObject<FuelPrice>(price);

    try
    {
      await FuelPriceOrmEntity.create(serializedData);
    } catch (error)
    {
      throw new Error(error);
    }
  }

  async getAll(): Promise<FuelPrice[]>{
    try
    {
      const queryResult = await FuelPriceOrmEntity.findAll();
      const serializedResult = this.serializeRepoToEntity(queryResult);
      return serializedResult;
    } catch (error)
    {
      throw new Error(error);
    }
  }

  private serializeRepoToEntity(queryResult: FuelPriceOrmEntity[])
  {
    return queryResult.map(fuelPrice =>
    {
      const { fuelstationID, fuelType, price, evolution } = fuelPrice;
      return new FuelPrice(fuelstationID, fuelType, price, evolution );
    });
  }

  async getEvolution(fuelstationID: number, fuelType: FuelTypes, price: number): Promise<FuelPriceEvolution>
  {
    let priceEvolution = FuelPriceEvolution.EQUALS;

    try {
      const lastPriceRegistered = await FuelPriceOrmEntity.findOne({
        attributes: ["price"],
        where: {fuelstationID, fuelType},
        order: [["id", "DESC"]],
        raw: true
      });
      if (lastPriceRegistered && price > lastPriceRegistered.price) priceEvolution = FuelPriceEvolution.UP;
      if (lastPriceRegistered && price < lastPriceRegistered.price) priceEvolution = FuelPriceEvolution.DOWN;
    } catch (error) {
      throw new Error(error);
    }
    return priceEvolution;
  }

  async getPriceStatistics(fuelstationID: number, fuelType: FuelTypes): Promise<FuelPriceStatisticsType>
  {
    let priceEvolution = { min: 0, max: 0, avg: 0 };

    try {
      const fuelPrices = await FuelPriceOrmEntity.findOne({
        attributes: [
          [Sequelize.fn("MAX", Sequelize.col("price")), "maxPrice"],
          [Sequelize.fn("MIN", Sequelize.col("price")), "minPrice"],
          [Sequelize.fn("AVG", Sequelize.col("price")), "avgPrice"]
        ],
        where: { fuelType, fuelstationID },
        raw: true
      }) as unknown as FuelPriceStatisticsType;
      priceEvolution = { min: fuelPrices.min, max: fuelPrices.max, avg: fuelPrices.avg };
    } catch (error) {
      throw new Error(error);
    }
    return priceEvolution;
  }

  async pricesDump(fuelstationID: number, fueltype: FuelTypes, priceStatistics: FuelPriceStatisticsType): Promise<void>
  {
    const fuelPriceToDump = new FuelPricesDump(fuelstationID, fueltype, priceStatistics);
    const serializedData = Serializer.classToObject<FuelPricesDump>(fuelPriceToDump);

    try
    {
      await FuelPricesDumpOrmEntity.create(serializedData);
    } catch (error)
    {
      throw new Error(error);
    }
  }

}
