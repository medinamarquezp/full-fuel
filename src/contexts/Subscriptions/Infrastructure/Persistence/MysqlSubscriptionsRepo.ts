import { Subscriptions } from "@/contexts/Subscriptions/Domain/Subscriptions";
import { SubscriptionsRepo } from "@/contexts/Subscriptions/Domain/SubscriptionsRepo";
import { FuelTypes } from "@/sharedDomain/FuelTypes";
import { SubscriptionsOrmEntity } from "./SubscriptionsOrmEntity";
import { DBConnection } from "@/sharedInfrastructure/Persistence/ORM/DBconnection";

export class MysqlSubscriptionsRepo implements SubscriptionsRepo {

  constructor()
  {
    DBConnection.getInstance().addModels([SubscriptionsOrmEntity]);
  }

  async addSubscriptions(fuelstationID: number, fuelType: FuelTypes): Promise<void> {
    try {
      const existsSubscription = await SubscriptionsOrmEntity.count({ where: {fuelstationID, fuelType} });

      if (existsSubscription) {
        await SubscriptionsOrmEntity.increment("numSubscriptions", {where: {fuelstationID, fuelType}});
      } else {
        await SubscriptionsOrmEntity.create({fuelstationID, fuelType, numSubscriptions: 1});
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeSubscriptions(fuelstationID: number, fuelType: FuelTypes): Promise<void> {
    try {
      const subscription = await SubscriptionsOrmEntity.findOne({ where: {fuelstationID, fuelType} });

      if (subscription && subscription.numSubscriptions > 1) {
        await SubscriptionsOrmEntity.decrement("numSubscriptions", {where: {fuelstationID, fuelType}});
      } else if (subscription && subscription.numSubscriptions === 1){
        await SubscriptionsOrmEntity.destroy({where: {fuelstationID, fuelType}});
      } else {
        return;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async getSubscriptorsNumber(fuelstationID: number, fuelType: FuelTypes): Promise<number> {
    try {
      const subscription = await SubscriptionsOrmEntity.findOne({ where: {fuelstationID, fuelType} });
      return (subscription) ? subscription.numSubscriptions : 0;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getSubscriptions(): Promise<Subscriptions[]>{
    try {
      const queryResult = await SubscriptionsOrmEntity.findAll();
      const serializedResult = this.serializeRepoToEntity(queryResult);
      return serializedResult;
    } catch (error) {
      throw new Error(error);
    }
  }

  private serializeRepoToEntity(queryResult: SubscriptionsOrmEntity[]): Subscriptions[]
  {
    return queryResult.map(subscription =>
    {
      const { fuelstationID, fuelType, numSubscriptions } = subscription;
      const subscriptionInstance = new Subscriptions(fuelstationID, fuelType);
      if (numSubscriptions > 1) subscriptionInstance.setSubscriptions(numSubscriptions);
      return subscriptionInstance;
    });
  }

}
