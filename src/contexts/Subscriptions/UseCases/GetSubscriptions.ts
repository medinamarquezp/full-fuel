import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
import { SubscriptionsRepo } from "@/contexts/Subscriptions/Domain/SubscriptionsRepo";
import { FuelTypes } from "@/sharedDomain/FuelTypes";

export class GetSubscriptions extends BaseUseCase {

  constructor(private repo: SubscriptionsRepo){ super(); }

  async remove(fuelstationID: number, fuelType: FuelTypes): Promise<number> {
    let subscribers = 0;

    try {
      subscribers = await this.repo.getSubscriptions(fuelstationID, fuelType);
    } catch (error) {
      this.handleError(error);
    }
    return subscribers;
  }

}
