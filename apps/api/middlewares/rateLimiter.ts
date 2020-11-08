import { RateLimiterRedis } from "rate-limiter-flexible";
import { NextFunction, Request, Response } from "express";
import { Client } from "@/sharedInfrastructure/Persistence/Cache/Client";
import { TooManyRequestsException } from "@/sharedExceptions/TooManyRequestsException";
import { ErrorHandler } from "../handlers/ErrorHandler";

export const rateLimiter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const redisClient = Client.clientInstance({
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: parseInt(process.env.REDIS_PORT as string) || 6379,
    password: process.env.REDIS_PASSWORD
  });

  const opts = {
    storeClient: redisClient,
    points: parseInt(process.env.RATE_LIMITER_POINTS as string) || 100,
    duration: parseInt(process.env.RATE_LIMITER_DURATION as string) || 30,
    keyPrefix: process.env.RATE_LIMITER_KEY_PREFIX || "rateLimiter"
  };
  const rateLimiterRedis = new RateLimiterRedis(opts);

  try {
    const { remoteAddress } = req.connection;
    if(remoteAddress) { await rateLimiterRedis.consume(remoteAddress); next();}
  } catch (error) {
    ErrorHandler.error(res, new TooManyRequestsException("Too many requests in a given amount of time", error));
  }
};
