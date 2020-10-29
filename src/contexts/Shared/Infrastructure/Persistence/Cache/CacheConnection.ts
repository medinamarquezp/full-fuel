import Redis from "ioredis";
import { FactoryLogger } from "@/sharedInfrastructure/Logger/FactoryLogger";

export class CacheConnection{
  private static log = FactoryLogger.getLoggerInstance(process.env.LOGGER);
  public static getInstance(): Redis.Redis {
    try {
      return new Redis();
    } catch (err) {
      const error = `Error on creating a Redis Cache connection: ${err}`;
      this.log.error(error);
      throw new Error(error);
    }
  }
}
