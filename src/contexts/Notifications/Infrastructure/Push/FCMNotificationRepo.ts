import * as admin from "firebase-admin";
import { Notification } from "@/contexts/Notifications/Domain/Notification";
import { NotificationRepo } from "@/contexts/Notifications/Domain/NotificationRepo";

export class FCMNotificationRepo implements NotificationRepo {

  constructor(){
    this.initApp();
  }

  private initApp(): void {
    const serviceAccount = {
      "projectId": process.env.FCM_PROJECT_ID as string,
      "privateKey": process.env.FCM_PROJECT_KEY?.replace(/\\n/g, "\n") as string,
      "clientEmail": process.env.FCM_CLIENT_EMAIL as string
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://fullfuel-app.firebaseio.com"
    });
  }

  async subscribeToTopic(topic: string, appToken?: string): Promise<void>{
    try {
      const token = process.env.APP_TOKEN || appToken as string;
      await admin.messaging().subscribeToTopic(token, topic);
    } catch (error) {
      console.log(error);
    }
  }

  async endApp(): Promise<void>{
    await admin.app().delete();
  }

  async sendToTopic(notification: Notification): Promise<string>{
    let response = "";
    const { topic, title, message } = notification;

    const messageObject = {
      topic,
      notification: { title, body: message },
      data:{ "click_action": "FLUTTER_NOTIFICATION_CLICK", title, message }
    };

    try {
      response = await admin.messaging().send(messageObject);
    } catch (error) {
      throw new Error(error);
    }
    return response;
  }
}
