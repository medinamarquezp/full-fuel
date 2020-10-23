import { dayMoments } from "@/sharedDomain/Today";
import { FuelTypes } from "@/sharedDomain/FuelTypes";
import { FuelPriceEvolution } from "./FuelPriceEvolution";

export interface FuelPriceProperties {
  readonly fuelstationID: number,
  readonly month: number,
  readonly week: number,
  readonly day: number,
  readonly weekDay: number,
  readonly hour: number,
  readonly moment: dayMoments,
  readonly fuelType: FuelTypes,
  readonly price: number,
  evolution?: FuelPriceEvolution
}
