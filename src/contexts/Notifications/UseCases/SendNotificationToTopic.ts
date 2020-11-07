import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
import { Notification } from "@/contexts/Notifications/Domain/Notification";
import { NotificationRepo } from "@/contexts/Notifications/Domain/NotificationRepo";

export class SendNotificationToTopic extends BaseUseCase {

  constructor(private repo: NotificationRepo){ super(); }

  async send(notification: Notification): Promise<string> {
    let response = "";

    try {
      response = await this.repo.sendToTopic(notification);
    } catch (error) {
      this.handleError(error);
    }
    return response;
  }

}
