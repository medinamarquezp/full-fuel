import { SubscriptionsProperties } from "./SubscriptionsProperties";
import { FuelTypes } from "@/sharedDomain/FuelTypes";

export class Subscriptions implements SubscriptionsProperties {

  numSubscribers: number;

  constructor(readonly fuelstationID: number, readonly fuelType: FuelTypes){
    this.numSubscribers = 0;
  }

  addSubscribers(): void {
    this.numSubscribers++;
  }

  removeSubscribers(): void {
    this.numSubscribers--;
  }
}
