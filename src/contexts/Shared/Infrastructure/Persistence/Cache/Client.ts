import { promisify } from "util";
import redis, { RedisClient, ClientOpts } from "redis";
import { FactoryLogger } from "@/sharedInfrastructure/Logger/FactoryLogger";

export class Client{
  private static instance: RedisClient | null = null;
  private static log = FactoryLogger.getLoggerInstance(process.env.LOGGER);
  private static ops = {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: parseInt(process.env.REDIS_PORT as string) || 6379
  }
  public static clientInstance(ops?: ClientOpts): RedisClient {
    if (this.instance === null) {
      try {
        this.instance = redis.createClient(ops);
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
    const instance = this.clientInstance(this.ops);
    const geoAddAsync = promisify(instance.geoadd).bind(instance);
    return await geoAddAsync(key, longitude, latitude, id);
  }

  public static async geoRadius(key: string, longitude: number, latitude: number, radius: number):
  Promise<(string | [string, string | [string, string]])[]> {
    const instance = this.clientInstance(this.ops);
    const geoRadiusAsync = promisify(instance.georadius).bind(instance);
    const longitudeUnit = "km";
    return await geoRadiusAsync(key, longitude, latitude, radius, longitudeUnit, "WITHDIST", "ASC");
  }

  public static async hSet(key: string, field: string, value: string): Promise<number>{
    const instance = this.clientInstance(this.ops);
    const hsetAsync = promisify(instance.hset).bind(instance);
    return await hsetAsync(key, field, value);
  }

  public static async hmGet(key: string, fields: string[]): Promise<string[]>{
    const instance = this.clientInstance(this.ops);
    const hmgetAsync = promisify(instance.hmget).bind(instance);
    return await hmgetAsync(key, fields);
  }
}
