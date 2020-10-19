import { FuelTypes } from "@/sharedDomain/FuelTypes";
import { Subscriptions } from "./Subscriptions";
export interface SubscriptionsRepo {
  addSubscriptions(fuelstationID: number, fuelType: FuelTypes): Promise<void>,
  removeSubscriptions(fuelstationID: number, fuelType: FuelTypes): Promise<void>,
  getSubscriptorsNumber(fuelstationID: number, fuelType: FuelTypes): Promise<number>,
  getSubscriptions(): Promise<Subscriptions[]>
}
