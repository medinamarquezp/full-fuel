/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Express, Request, Response, NextFunction } from "express";
import { resolve, join } from "path";
import { ErrorHandler } from "../handlers/ErrorHandler";
import { ResponseHandler } from "../handlers/ResponseHandler";
import { DomainError } from "@/sharedDomain/DomainError";
import { NotFoundException } from "@/sharedExceptions/NotFoundException";
import fuelStationsRoutes from "./fuelStationsRoutes";
import subscriptionsRoutes from "./subscriptionsRoutes";

const brandImagesURL = join(resolve(process.cwd()), "src", "static", "images");

export const routerHandler = (app: Express): Express => {
  const apiVersion = "v1";
  app.get("/", (req: Request, res: Response) => ResponseHandler.response(res, "Fullfuel app UP and running!"));
  app.use(`/${apiVersion}/fuelstations`, fuelStationsRoutes);
  app.use(`/${apiVersion}/subscriptions`, subscriptionsRoutes);
  app.use("/static", express.static(brandImagesURL));
  app.use("*", () => { throw new NotFoundException("Resource not found"); });

  app.use((err: DomainError, req: Request, res: Response, next: NextFunction) => {
    ErrorHandler.error(res, err);
  });
  return app;
};
