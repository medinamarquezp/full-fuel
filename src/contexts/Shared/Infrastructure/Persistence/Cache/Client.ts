import { promisify } from "util";
import redis, { RedisClient } from "redis";
import { FactoryLogger } from "@/sharedInfrastructure/Logger/FactoryLogger";

export class Client{
  private static instance: RedisClient | null = null;
  private static log = FactoryLogger.getLoggerInstance(process.env.LOGGER);
  public static clientInstance(): RedisClient {
    if (this.instance === null) {
      try {
        const connectionPath = process.env.REDIS_CONNECTION_PATH as string;
        this.instance = redis.createClient(connectionPath);
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
    const instance = this.clientInstance();
    const geoAddAsync = promisify(instance.geoadd).bind(instance);
    return await geoAddAsync(key, longitude, latitude, id);
  }

  public static async geoRadius(key: string, longitude: number, latitude: number, radius: number):
  Promise<(string | [string, string | [string, string]])[]> {
    const instance = this.clientInstance();
    const geoRadiusAsync = promisify(instance.georadius).bind(instance);
    const longitudeUnit = "km";
    return await geoRadiusAsync(key, longitude, latitude, radius, longitudeUnit, "WITHDIST", "ASC");
  }

  public static async hSet(key: string, field: string, value: string): Promise<number>{
    const instance = this.clientInstance();
    const hsetAsync = promisify(instance.hset).bind(instance);
    return await hsetAsync(key, field, value);
  }

  public static async hmGet(key: string, fields: string[]): Promise<string[]>{
    const instance = this.clientInstance();
    const hmgetAsync = promisify(instance.hmget).bind(instance);
    return await hmgetAsync(key, fields);
  }
}
