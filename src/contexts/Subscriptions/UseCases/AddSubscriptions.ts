import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
import { SubscriptionsRepo } from "@/contexts/Subscriptions/Domain/SubscriptionsRepo";
import { FuelTypes } from "@/sharedDomain/FuelTypes";

export class AddSubscriptions extends BaseUseCase {

  constructor(private repo: SubscriptionsRepo){ super(); }

  async add(fuelstationID: number, fuelType: FuelTypes): Promise<void> {
    try {
      await this.repo.addSubscriptions(fuelstationID, fuelType);
    } catch (error) {
      this.handleError(error);
    }
  }

}
