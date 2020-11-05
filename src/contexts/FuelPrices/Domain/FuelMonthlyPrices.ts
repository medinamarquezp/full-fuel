import { FuelTypes } from "@/sharedDomain/FuelTypes";

export interface FuelMonthlyPrices {
  month: number,
  day: number,
  fuelType: FuelTypes,
  price: number
}
