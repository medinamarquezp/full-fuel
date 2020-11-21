import { FuelPrice } from "./FuelPrice";
import { FuelPricesDump } from "./FuelPricesDump";
import { FuelTypes } from "@/sharedDomain/FuelTypes";
import { FuelPriceEvolution } from "./FuelPriceEvolution";
import { FuelPriceStatisticsType } from "./FuelPriceStatistics";
import { FuelPricesBestMoments } from "./FuelPricesBestMoments";
import { FuelMonthlyPrices } from "./FuelMonthlyPrices";
import { FuelPriceUpdate } from "./FuelPriceUpdate";

export interface FuelPriceRepo {
  save(price: FuelPrice): Promise<void>;
  getAll(): Promise<FuelPrice[]>;
  findByCriteria(criteria: Criteria): Promise<FuelPrice[]>;
  getMonthlyPrices(fuelstationID: number): Promise<FuelMonthlyPrices[]>;
  getEvolution(fuelstationID: number, fueltype: FuelTypes, price: number): Promise<FuelPriceEvolution>;
  getPriceStatistics(fuelstationID: number, fueltype: FuelTypes): Promise<FuelPriceStatisticsType>;
  getLastPriceUpdate(fuelstationID: number, fueltype: FuelTypes): Promise<FuelPriceUpdate[]>
  isPriceAvailable(fuelstationID: number, fueltype: FuelTypes): Promise<boolean>;
  pricesDump(fuelstationID: number, fueltype: FuelTypes, priceStatistics: FuelPriceStatisticsType): Promise<void>;
  getPricesDump(): Promise<FuelPricesDump[]>;
  getBestMoments(fuelstationID: number): Promise<FuelPricesBestMoments>
}
export interface Criteria {
  fuelstationID: number,
  month: number,
  day: number,
  hour: number,
  fuelType: FuelTypes
}
