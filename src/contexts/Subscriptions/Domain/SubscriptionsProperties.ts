import { FuelTypes } from "@/sharedDomain/FuelTypes";

export interface SubscriptionsProperties {
  readonly fuelstationID: number,
  readonly fuelType: FuelTypes,
  numSubscriptions: number,
  addSubscriptions(): void;
  removeSubscriptions(): void;
}
