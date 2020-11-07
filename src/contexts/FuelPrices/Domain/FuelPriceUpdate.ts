import { FuelTypes } from "@/sharedDomain/FuelTypes";
import { FuelPriceEvolution } from "./FuelPriceEvolution";

export interface FuelPriceUpdate{
  fuelstationID: number,
  fuelType: FuelTypes,
  evolution: FuelPriceEvolution | undefined,
  price: number
}
