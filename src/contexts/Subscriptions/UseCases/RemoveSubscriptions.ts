import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
import { SubscriptionsRepo } from "@/contexts/Subscriptions/Domain/SubscriptionsRepo";
import { FuelTypes } from "@/sharedDomain/FuelTypes";

export class RemoveSubscriptions extends BaseUseCase {

  constructor(private repo: SubscriptionsRepo){ super(); }

  async remove(fuelstationID: number, fuelType: FuelTypes): Promise<void> {
    try {
      await this.repo.removeSubscriptions(fuelstationID, fuelType);
    } catch (error) {
      this.handleError(error);
    }
  }

}
