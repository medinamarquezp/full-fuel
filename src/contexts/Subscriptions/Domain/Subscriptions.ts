import { SubscriptionsProperties } from "./SubscriptionsProperties";
import { FuelTypes } from "@/sharedDomain/FuelTypes";

export class Subscriptions implements SubscriptionsProperties {

  numSubscriptions: number;

  constructor(readonly fuelstationID: number, readonly fuelType: FuelTypes){
    this.numSubscriptions = 1;
  }

  setSubscriptions(subscriptions: number): void {
    this.numSubscriptions = subscriptions;
  }

  addSubscriptions(): void {
    this.numSubscriptions++;
  }

  removeSubscriptions(): void {
    this.numSubscriptions--;
  }
}
