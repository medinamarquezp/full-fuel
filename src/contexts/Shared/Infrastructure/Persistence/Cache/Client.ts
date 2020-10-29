import { promisify } from "util";
import redis, { RedisClient } from "redis";
import { FactoryLogger } from "@/sharedInfrastructure/Logger/FactoryLogger";

export class Client{
  private static client: RedisClient;
  private static log = FactoryLogger.getLoggerInstance(process.env.LOGGER);
  public static clientInstance(): RedisClient {
    if (this.client === null) {
      try {
        this.client = redis.createClient();
        this.client.on("connect", () => console.log("Redis connected"));
        return this.client;
      } catch (err) {
        const error = `Error on creating a Redis Cache connection: ${err}`;
        this.log.error(error);
        throw new Error(error);
      }
    } else {
      return this.client;
    }
  }

  public static async geoAdd(key: string, longitude: number, latitude: number, id: number): Promise<number>{
    const geoAddAsync = promisify(this.client.geoadd).bind(this.client);
    return await geoAddAsync(key, longitude, latitude, id);
  }

  public static async geoRadius(key: string, longitude: number, latitude: number, radius: number):
  Promise<(string | [string, string | [string, string]])[]> {
    const geoRadiusAsync = promisify(this.client.georadius).bind(this.client);
    const longitudeUnit = "km";
    return await geoRadiusAsync(key, longitude, latitude, radius, longitudeUnit);
  }

  public static async hSet(key: string, field: string, value: string): Promise<number>{
    const hsetAsync = promisify(this.client.hset).bind(this.client);
    return await hsetAsync(key, field, value);
  }

  public static async hmGet(key: string, fields: string[]): Promise<string[]>{
    const hmgetAsync = promisify(this.client.hmget).bind(this.client);
    return await hmgetAsync(key, fields);
  }
}
