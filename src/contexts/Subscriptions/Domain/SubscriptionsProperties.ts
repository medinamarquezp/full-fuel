import { FuelTypes } from "@/sharedDomain/FuelTypes";

export interface SubscriptionsProperties {
  fuelstationID: number,
  fuelType: FuelTypes,
  numSuscribers: number
}
