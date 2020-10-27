import { FuelPrice } from "./FuelPrice";
import { FuelPricesDump } from "./FuelPricesDump";
import { FuelTypes } from "@/sharedDomain/FuelTypes";
import { FuelPriceEvolution } from "./FuelPriceEvolution";
import { FuelPriceStatisticsType } from "./FuelPriceStatistics";
import { FuelPricesBestMoments } from "./FuelPricesBestMoments";

export interface FuelPriceRepo {
  save(price: FuelPrice): Promise<void>;
  getAll(): Promise<FuelPrice[]>;
  getEvolution(fuelstationID: number, fueltype: FuelTypes, price: number): Promise<FuelPriceEvolution>;
  getPriceStatistics(fuelstationID: number, fueltype: FuelTypes): Promise<FuelPriceStatisticsType>;
  pricesDump(fuelstationID: number, fueltype: FuelTypes, priceStatistics: FuelPriceStatisticsType): Promise<void>;
  getPricesDump(): Promise<FuelPricesDump[]>;
  getBestMoments(fuelstationID: number): Promise<FuelPricesBestMoments>
}
