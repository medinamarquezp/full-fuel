import { FuelTypes } from "@/sharedDomain/FuelTypes";
export interface SubscriptionsRepo {
  addSubscriptions(fuelstationID: number, fuelType: FuelTypes): Promise<void>,
  removeSubscriptions(fuelstationID: number, fuelType: FuelTypes): Promise<void>,
  getSubscriptions(fuelstationID: number, fuelType: FuelTypes): Promise<number>
}
