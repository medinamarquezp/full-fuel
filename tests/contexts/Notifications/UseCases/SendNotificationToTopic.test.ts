import { Notification } from "@/contexts/Notifications/Domain/Notification";
import { SendNotificationToTopic } from "@/contexts/Notifications/UseCases/SendNotificationToTopic";
import { FCMNotificationRepo } from "@/contexts/Notifications/Infrastructure/Push/FCMNotificationRepo";

describe.skip('Send notification to topic use case test', () => {
  let sendNotificationToTopic: SendNotificationToTopic, repo: FCMNotificationRepo, topic: string;
  beforeAll(async () => {
    repo = new FCMNotificationRepo();
    sendNotificationToTopic = new SendNotificationToTopic(repo);
    topic = "14128-g95";
    const token = "bk3RNwTe3H0:CI2k_HHwgIpoDKCIZvvDMExUdFQ3P1";
    await repo.subscribeToTopic(topic, token)
  })
  afterAll(async() => {
    await repo.endApp();
  })
  test('it should send a notification to specific topic', async() => {
    const notification = new Notification(
      topic,
      "Bajada de precio de la gasolina 95 en AUTONET&OIL",
      "El precio de la gasolina 95 en AUTONET&OIL ha bajado 0.15€. Ahora puedes repostar a 1.09€"
    );
    const sut = await sendNotificationToTopic.send(notification);
    expect(sut).toContain(process.env.FCM_PROJECT_ID);
  })
})
