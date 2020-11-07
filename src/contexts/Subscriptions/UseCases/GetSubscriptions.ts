import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
import { Subscriptions } from "@/contexts/Subscriptions/Domain/Subscriptions";
import { SubscriptionsRepo } from "@/contexts/Subscriptions/Domain/SubscriptionsRepo";

export class GetSubscriptions extends BaseUseCase {

  constructor(private repo: SubscriptionsRepo){ super(); }

  async getAll(): Promise<Subscriptions[]> {
    let subscriptions: Subscriptions[] = [];

    try {
      subscriptions = await this.repo.getSubscriptions();
    } catch (error) {
      this.handleError(error);
    }
    return subscriptions;
  }

}
