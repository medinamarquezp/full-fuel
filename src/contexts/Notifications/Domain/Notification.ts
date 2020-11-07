import { NotificationProperties } from "./NotificationProperties";

export class Notification implements NotificationProperties {
  topic: string;
  title: string;
  message: string;

  constructor(topic: string, title: string, message: string){
    this.topic = topic;
    this.title = title;
    this.message = message;
  }
}
