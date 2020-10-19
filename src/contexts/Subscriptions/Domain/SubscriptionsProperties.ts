import { FuelTypes } from "@/sharedDomain/FuelTypes";

export interface SubscriptionsProperties {
  readonly fuelstationID: number,
  readonly fuelType: FuelTypes,
  numSubscribers: number,
  addSubscribers(): void;
  removeSubscribers(): void;
}
