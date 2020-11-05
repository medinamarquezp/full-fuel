import { FuelTypes } from "@/contexts/Shared/Domain/FuelTypes";
import { ConflictException } from "@/sharedExceptions/ConflictException";
import { InternalServerErrorException } from "@/sharedDomain/Exceptions/InternalServerErrorException";
import { IsPriceAvailable } from "@/contexts/FuelPrices/UseCases/IsPriceAvailable";
import { AddSubscriptions } from "@/contexts/Subscriptions/UseCases/AddSubscriptions";
import { RemoveSubscriptions } from "@/contexts/Subscriptions/UseCases/RemoveSubscriptions";
import { MysqlFuelPriceRepo } from "@/contexts/FuelPrices/Infrastructure/Persistence/MysqlFuelPriceRepo";
import { MysqlSubscriptionsRepo } from "@/contexts/Subscriptions/Infrastructure/Persistence/MysqlSubscriptionsRepo";

export class SubscriptionsRepo {
  private static dbSubscriptionsRepo = new MysqlSubscriptionsRepo();
  private static dbFuelPriceRepo = new MysqlFuelPriceRepo();

  public static async newSubscription(fuelstationID: number, fueltype: FuelTypes): Promise<string> {
    try {
      await this.isFuelTypeAvailable(fuelstationID, fueltype);
      await this.subscribe(fuelstationID, fueltype);
      return `Subscribed to fuel type ${fueltype} on fuel station ${fuelstationID}`;
    } catch (error) {
      if (error instanceof ConflictException) throw new ConflictException(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  public static async removeSubscription(fuelstationID: number, fueltype: FuelTypes): Promise<string> {
    try {
      await this.unSubscribe(fuelstationID, fueltype);
      return `Unsubscribed to fuel type ${fueltype} on fuel station ${fuelstationID}`;
    } catch (error) {
      if (error instanceof ConflictException) throw new ConflictException(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  private static async unSubscribe(fuelstationID: number, fueltype: FuelTypes): Promise<void>{
    const removeSubscriptions = new RemoveSubscriptions(this.dbSubscriptionsRepo);
    await removeSubscriptions.remove(fuelstationID, fueltype);
  }

  private static async subscribe(fuelstationID: number, fueltype: FuelTypes): Promise<void>{
    const addSubscription = new AddSubscriptions(this.dbSubscriptionsRepo);
    await addSubscription.add(fuelstationID, fueltype);
  }

  private static async isFuelTypeAvailable(fuelstationID: number, fueltype: FuelTypes): Promise<void> {
    const checkFuelTypeAvailability = new IsPriceAvailable(this.dbFuelPriceRepo);
    const isAvailable = await checkFuelTypeAvailability.check(fuelstationID, fueltype);
    if (!isAvailable)
      throw new ConflictException(`Fuel type '${fueltype}' is not available to subscribe it on fuel station '${fuelstationID}'`);
  }
}
