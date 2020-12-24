import { FuelTypes } from "@/sharedDomain/FuelTypes";
// Notifications
import { Notification } from "@/contexts/Notifications/Domain/Notification";
import { SendNotificationToTopic } from "@/contexts/Notifications/UseCases/SendNotificationToTopic";
import { FCMNotificationRepo } from "@/contexts/Notifications/Infrastructure/Push/FCMNotificationRepo";
// Subscriptions
import { Subscriptions } from "@/contexts/Subscriptions/Domain/Subscriptions";
import { GetSubscriptions } from "@/contexts/Subscriptions/UseCases/GetSubscriptions";
import { MysqlSubscriptionsRepo } from "@/contexts/Subscriptions/Infrastructure/Persistence/MysqlSubscriptionsRepo";
// FuelStations
import { GetFuelStations } from "@/contexts/FuelStations/UseCases/GetFuelStations";
import { MysqlFuelStationRepo } from "@/contexts/FuelStations/Infrastructure/Persistence/MysqlFuelStationRepo";
// FuelPrices
import { FuelPriceUpdate } from "@/contexts/FuelPrices/Domain/FuelPriceUpdate";
import { GetLastPriceUpdate } from "@/contexts/FuelPrices/UseCases/GetLastPriceUpdate";
import { MysqlFuelPriceRepo } from "@/contexts/FuelPrices/Infrastructure/Persistence/MysqlFuelPriceRepo";

export class NotificationsJobController {
  static fuelstationsDBRepo = new MysqlFuelStationRepo();
  static fuelPriceDBRepo = new MysqlFuelPriceRepo();
  static subscriptionsDBRepo = new MysqlSubscriptionsRepo();
  static notificationsPushRepo = new FCMNotificationRepo();

  static async run(): Promise<void> {
    const notifications = await this.getNotifications();
    const sendNotifications = new SendNotificationToTopic(this.notificationsPushRepo);

    for (const notification of notifications){
      await sendNotifications.send(notification);
    }
    console.log(`It has been sended a total of ${notifications.length} notifications`);
  }

  private static async getNotifications(): Promise<Notification[]>{
    const notifications: Notification[] = [];
    const subscriptions = await this.getSubscriptions();

    for (const subscription of subscriptions){
      const { fuelstationID, fuelType } = subscription;
      const isPriceCheapest = await this.isPriceCheapest(fuelstationID, fuelType);
      const { isCheapest, priceUpdate } = isPriceCheapest;

      if(isCheapest){
        const notification = await this.createNotification(fuelstationID, fuelType, priceUpdate);
        notifications.push(notification);
      }
    }
    return notifications;
  }

  private static async getSubscriptions(): Promise<Subscriptions[]>{
    const subscriptions = new GetSubscriptions(this.subscriptionsDBRepo);
    return await subscriptions.getAll();
  }

  private static async getFuelStationNameByID(fuelstationID: number): Promise<string> {
    const fuelstations = new GetFuelStations(this.fuelstationsDBRepo);
    const fuelstation = await fuelstations.getByID(fuelstationID);
    return `${fuelstation.name} (${fuelstationID})`;
  }

  private static async isPriceCheapest(fuelstationID: number, fuelType: FuelTypes): Promise<{isCheapest: boolean, priceUpdate: FuelPriceUpdate[]}>{
    const priceUpdate = await this.getLastPriceUpdate(fuelstationID, fuelType);
    const currentPrice = priceUpdate[0];
    const isCheapest = currentPrice.evolution === "D";
    return { isCheapest, priceUpdate };
  }

  private static async getLastPriceUpdate(fuelstationID: number, fuelType: FuelTypes): Promise<FuelPriceUpdate[]>{
    const priceUpdate = new GetLastPriceUpdate(this.fuelPriceDBRepo);
    const lastPriceUpdate = await priceUpdate.getLastPriceUpdate(fuelstationID, fuelType);
    return lastPriceUpdate;
  }

  private static async createNotification(fuelstationID: number, fuelType: FuelTypes, priceUpdate: FuelPriceUpdate[]): Promise<Notification>{
    const fuelstationName = await this.getFuelStationNameByID(fuelstationID);
    const fuelAlias = this.fuelAlias(fuelType);
    const topic = `${fuelstationID}-${fuelType}`;
    const title = `Bajada de precio ${fuelAlias} en ${fuelstationName}`;
    const currentPrice = priceUpdate[0].price;
    const lastPrice = priceUpdate[1].price;
    const priceDifference = (lastPrice - currentPrice).toFixed(3);
    const message= `El precio ${fuelAlias} en ${fuelstationName} ha bajado ${priceDifference}€. Ahora puedes repostar a ${currentPrice}€.`;
    return new Notification(topic, title, message);
  }

  private static fuelAlias(fuelType: FuelTypes): string
  {
    switch (fuelType) {
      case FuelTypes.G95:
        return "de la gasolina 95";
      case FuelTypes.G98:
        return "de la gasolina 98";
      case FuelTypes.GASOIL:
          return "del gasoil";
    }
  }
}
