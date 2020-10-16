import { FuelTypes } from "./FuelTypes";

export interface FuelPricesDumpProperties {
  readonly fuelstationID: number,
  readonly year: number,
  readonly month: number,
  readonly fuelType: FuelTypes,
  readonly max: number,
  readonly min: number,
  readonly avg: number
}
