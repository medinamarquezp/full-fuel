import { FuelTypes } from "./FuelTypes";
import { FuelPricesDumpProperties } from "./FuelPricesDumpProperties";
import { FuelPriceStatisticsType } from "./FuelPriceStatistics";
import { Today } from "@/sharedDomain/Today";

export class FuelPricesDump implements FuelPricesDumpProperties {
  readonly year: number;
  readonly month: number;
  readonly min: number;
  readonly max: number;
  readonly avg: number;

  constructor(
    readonly fuelstationID: number,
    readonly fuelType: FuelTypes,
    priceStatistics: FuelPriceStatisticsType
  ) {
    this.year = Today.year();
    this.month = Today.month();
    this.min = priceStatistics.min;
    this.max = priceStatistics.max;
    this.avg = priceStatistics.avg;
  }

}
