import { promisify } from "util";
import redis, { RedisClient } from "redis";
import { FactoryLogger } from "@/sharedInfrastructure/Logger/FactoryLogger";

export class Client{
  private static instance: RedisClient | null = null;
  private static log = FactoryLogger.getLoggerInstance(process.env.LOGGER);
  public static clientInstance(): RedisClient {
    if (this.instance === null) {
      try {
        this.instance = redis.createClient();
        this.instance.on("connect", () => console.log("Redis connected! "));
        return this.instance;
      } catch (err) {
        const error = `Error on creating a Redis Cache connection: ${err}`;
        this.log.error(error);
        throw new Error(error);
      }
    }
    return this.instance as RedisClient;
  }

  public static async geoAdd(key: string, longitude: number, latitude: number, id: number): Promise<number>{
    const geoAddAsync = promisify(this.clientInstance().geoadd).bind(this.clientInstance());
    return await geoAddAsync(key, longitude, latitude, id);
  }

  public static async geoRadius(key: string, longitude: number, latitude: number, radius: number):
  Promise<(string | [string, string | [string, string]])[]> {
    const geoRadiusAsync = promisify(this.clientInstance().georadius).bind(this.clientInstance());
    const longitudeUnit = "km";
    return await geoRadiusAsync(key, longitude, latitude, radius, longitudeUnit, "WITHDIST", "ASC");
  }

  public static async hSet(key: string, field: string, value: string): Promise<number>{
    const hsetAsync = promisify(this.clientInstance().hset).bind(this.clientInstance());
    return await hsetAsync(key, field, value);
  }

  public static async hmGet(key: string, fields: string[]): Promise<string[]>{
    const hmgetAsync = promisify(this.clientInstance().hmget).bind(this.clientInstance());
    return await hmgetAsync(key, fields);
  }
}
