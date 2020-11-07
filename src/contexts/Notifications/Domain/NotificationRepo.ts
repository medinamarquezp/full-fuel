import { Notification } from "@/contexts/Notifications/Domain/Notification";

export interface NotificationRepo {
  sendToTopic(notification: Notification): Promise<string>;
  subscribeToTopic(topic: string, appToken?: string): Promise<void>
}
