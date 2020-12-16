import Sequelize from "sequelize";
import { Today, dayMoments } from "@/sharedDomain/Today";
import { FuelPrice } from "@/contexts/FuelPrices/Domain/FuelPrice";
import { FuelPricesDump } from "@/contexts/FuelPrices/Domain/FuelPricesDump";
import { FuelTypes } from "@/sharedDomain/FuelTypes";
import { FuelPriceEvolution } from "@/contexts/FuelPrices/Domain/FuelPriceEvolution";
import { FuelPriceRepo, Criteria } from "@/contexts/FuelPrices/Domain/FuelPriceRepo";
import { FuelPriceStatisticsType } from "@/contexts/FuelPrices/Domain/FuelPriceStatistics";
import { FuelPriceOrmEntity } from "./FuelPriceOrmEntity";
import { FuelPricesDumpOrmEntity } from "./FuelPricesDumpOrmEntity";
import { Serializer } from "@/sharedInfrastructure/Serializer";
import { DBConnection } from "@/sharedInfrastructure/Persistence/ORM/DBconnection";
import { FuelPricesBestMoments } from "@/contexts/FuelPrices/Domain/FuelPricesBestMoments";
import { FuelMonthlyPrices } from "@/contexts/FuelPrices/Domain/FuelMonthlyPrices";
import { FuelPriceUpdate } from "@/contexts/FuelPrices/Domain/FuelPriceUpdate";

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
      const serializedResult = this.serializeFuelPriceToEntity(queryResult);
      return serializedResult;
    } catch (error)
    {
      throw new Error(error);
    }
  }

  async findByCriteria(criteria: Criteria): Promise<FuelPrice[]>{
    let fuelPrices: FuelPrice[] = [];

    try {
      const queryResult = await FuelPriceOrmEntity.findAll({where: {...criteria}, order: [["id", "ASC"]], raw: true});
      fuelPrices = this.serializeFuelPriceToEntity(queryResult);
    } catch (error) {
      throw new Error(error);
    }
    return fuelPrices;
  }

  async getMonthlyPrices(fuelstationID: number): Promise<FuelMonthlyPrices[]>{
    let monthlyPrices: FuelMonthlyPrices[] = [];

    try {
      const month = Today.month();

      const queryResult = await FuelPriceOrmEntity.findAll({
        attributes: ["month", "day", "fuelType", [Sequelize.fn("MIN", Sequelize.col("price")), "price"]],
        where: { fuelstationID, month },
        order: [["day", "ASC"]],
        group: ["month", "day", "fuelType"],
        raw: true
      }) as FuelPrice[];

      monthlyPrices = queryResult.map(fuelPrice => {
        const { month, day, fuelType, price } = fuelPrice;
        return { month, day, fuelType, price };
      });
    } catch (error) {
      throw new Error(error);
    }

    return monthlyPrices;
  }

  private serializeFuelPriceToEntity(queryResult: FuelPriceOrmEntity[])
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
          [Sequelize.fn("MAX", Sequelize.col("price")), "max"],
          [Sequelize.fn("MIN", Sequelize.col("price")), "min"],
          [Sequelize.fn("AVG", Sequelize.col("price")), "avg"]
        ],
        where: { fuelType, fuelstationID, month: Today.month() },
        raw: true
      }) as unknown as { [key: string]: string };
      const { min, max, avg } = fuelPrices;
      priceEvolution = { min: this.fixDecimals(min), max: this.fixDecimals(max), avg: this.fixDecimals(avg) };
    } catch (error) {
      throw new Error(error);
    }
    return priceEvolution;
  }

  async getLastPriceUpdate(fuelstationID: number, fueltype: FuelTypes): Promise<FuelPriceUpdate[]>{
    let pricesUpdate: FuelPriceUpdate[] = [];

    try {
      const queryResult = await FuelPriceOrmEntity.findAll({
        attributes: ["fuelstationID", "fuelType", "evolution", "price"],
        where: {fuelstationID, fueltype},
        order: [["id", "DESC"]],
        limit: 2,
        raw: true
      });

      pricesUpdate = queryResult.map((result: FuelPrice) => {
        const {fuelstationID, fuelType, evolution, price} = result;
        return {fuelstationID, fuelType, evolution, price};
      });

    } catch (error) {
      throw new Error(error);
    }
    return pricesUpdate;
  }

  private fixDecimals = (value: string) => parseFloat(parseFloat(value).toFixed(3));

  async isPriceAvailable(fuelstationID: number, fueltype: FuelTypes): Promise<boolean> {
    let isPriceavailable = false;

    try {
      const totalPrices = await FuelPriceOrmEntity.count({where: {fuelstationID, fueltype}});
      if (totalPrices > 0) isPriceavailable = true;
    } catch (error) {
      throw new Error(error);
    }
    return isPriceavailable;
  }

  async pricesDump(fuelstationID: number, fueltype: FuelTypes, priceStatistics: FuelPriceStatisticsType): Promise<void>
  {
    try {
      const fuelPriceToDump = new FuelPricesDump(fuelstationID, fueltype, priceStatistics);
      const serializedData = Serializer.classToObject<FuelPricesDump>(fuelPriceToDump);
      const isDayOne = Today.day() === 1;
      const wherePricesDump = {fuelstationID, fueltype, year: Today.year(), month: Today.month()};
      const isPriceDumped = await FuelPricesDumpOrmEntity.count({ where: wherePricesDump});

      if (!isPriceDumped && isDayOne) {
        await FuelPricesDumpOrmEntity.create(serializedData);
      } else {
        const {min, max, avg} = priceStatistics;

        FuelPricesDumpOrmEntity.update(
          { min, max, avg }, {where: wherePricesDump });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async getPricesDump(): Promise<FuelPricesDump[]>{
    try
    {
      const queryResult = await FuelPricesDumpOrmEntity.findAll();
      const serializedResult = this.serializePricesDumpToEntity(queryResult);
      return serializedResult;
    } catch (error)
    {
      throw new Error(error);
    }
  }

  async getBestMoments(fuelstationID: number): Promise<FuelPricesBestMoments> {
    try {
      const frequentDay = await this.getFrequentMoment(fuelstationID, "weekDay");
      const bestDay = (frequentDay && frequentDay.weekDay) ? frequentDay.weekDay : 1;
      const frequentMoment = await this.getFrequentMoment(fuelstationID, "moment");
      const bestMoment = (frequentMoment && frequentMoment.moment) ? frequentMoment.moment : dayMoments.MORNING;
      return {
        fuelstationID,
        bestDay,
        bestMoment
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  private async getFrequentMoment(fuelstationID:number, column:string) : Promise<FuelPriceOrmEntity>{
    try{
      const frequentMoment =  await FuelPriceOrmEntity.findOne({
        attributes: [column],
        where: {
          fuelstationID,
          "evolution": "D"
        },
        group: column,
        order: [[Sequelize.fn("COUNT", Sequelize.col(column)), "DESC"]],
      });
      return frequentMoment as FuelPriceOrmEntity;
    } catch (error) {
      throw new Error(error);
    }
  }

  private serializePricesDumpToEntity(queryResult: FuelPricesDumpOrmEntity[])
  {
    return queryResult.map(priceDump =>
    {
      const { fuelstationID, fuelType } = priceDump;
      const min = this.fixDecimals(priceDump.min.toString());
      const max = this.fixDecimals(priceDump.max.toString());
      const avg = this.fixDecimals(priceDump.avg.toString());
      return new FuelPricesDump(fuelstationID, fuelType, { min, max, avg } );
    });
  }

}
