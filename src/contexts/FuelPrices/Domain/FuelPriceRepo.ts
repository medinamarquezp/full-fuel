import { FuelPrice } from "./FuelPrice";
import { FuelTypes } from "./FuelTypes";
import { FuelPriceEvolution } from "./FuelPriceEvolution";
import { FuelPriceStatisticsType } from "./FuelPriceStatistics";

export interface FuelPriceRepo {
  save(price: FuelPrice): Promise<void>;
  getEvolution(fuelstationID: number, fueltype: FuelTypes, price: number): Promise<FuelPriceEvolution>;
  getPriceStatistics(fuelstationID: number, fueltype: FuelTypes): Promise<FuelPriceStatisticsType>;
  pricesDump(fuelstationID: number, fueltype: FuelTypes, priceStatistics: FuelPriceStatisticsType): Promise<void>;
}
