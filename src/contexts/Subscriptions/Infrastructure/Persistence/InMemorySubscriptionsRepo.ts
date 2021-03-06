import { Subscriptions } from "@/contexts/Subscriptions/Domain/Subscriptions";
import { SubscriptionsRepo } from "@/contexts/Subscriptions/Domain/SubscriptionsRepo";
import { FuelTypes } from "@/sharedDomain/FuelTypes";

export class InMemorySubscriptionsRepo implements SubscriptionsRepo {

  private subscriptions: Subscriptions[] = [];

  async addSubscriptions(fuelstationID: number, fuelType: FuelTypes): Promise<void>{
    const subscriptionIndex = this.subscriptionIndex(fuelstationID, fuelType);

    if (subscriptionIndex >= 0) {
      this.subscriptions[subscriptionIndex].addSubscriptions();
    } else {
      const newSubscription = new Subscriptions(fuelstationID, fuelType);
      this.subscriptions.push(newSubscription);
    }
  }

  async removeSubscriptions(fuelstationID: number, fuelType: FuelTypes): Promise<void>{
    const subscriptionIndex = this.subscriptionIndex(fuelstationID, fuelType);
    const numSubscriptions = await this.getSubscriptorsNumber(fuelstationID, fuelType);

    if (subscriptionIndex >= 0 && numSubscriptions > 1) {
      this.subscriptions[subscriptionIndex].removeSubscriptions();
    } else if (subscriptionIndex >= 0 && numSubscriptions === 1) {
      this.subscriptions.splice(subscriptionIndex, 1);
    } else {
      return;
    }
  }

  async getSubscriptorsNumber(fuelstationID: number, fuelType: FuelTypes): Promise<number>{
    const subscriptionIndex = this.subscriptionIndex(fuelstationID, fuelType);
    return (subscriptionIndex >= 0) ? this.subscriptions[subscriptionIndex].numSubscriptions : 0;
  }

  async getSubscriptions(): Promise<Subscriptions[]>{
    return this.subscriptions;
  }

  private subscriptionIndex(fuelstationID: number, fuelType: FuelTypes): number {
    return this.subscriptions.findIndex(subscription => {
      return subscription.fuelstationID === fuelstationID && subscription.fuelType === fuelType;
    });
  }

}
