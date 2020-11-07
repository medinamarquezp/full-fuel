import { Notification } from "@/contexts/Notifications/Domain/Notification";
import { SendNotificationToTopic } from "@/contexts/Notifications/UseCases/SendNotificationToTopic";
import { FCMNotificationRepo } from "@/contexts/Notifications/Infrastructure/Push/FCMNotificationRepo";

describe('Send notification to topic use case test', () => {
  let sendNotificationToTopic: SendNotificationToTopic, repo: FCMNotificationRepo, topic: string;
  beforeAll(async () => {
    repo = new FCMNotificationRepo();
    sendNotificationToTopic = new SendNotificationToTopic(repo);
    topic = "testTopic";
    await repo.subscribeToTopic(topic)
  })
  afterAll(async() => {
    await repo.endApp();
  })
  test('it should send a notification to specific topic', async() => {
    const notification = new Notification(topic, "New test notification", "This is a test notification");
    const sut = await sendNotificationToTopic.send(notification);
    expect(sut).toContain(process.env.FCM_PROJECT_ID);
  })
})
