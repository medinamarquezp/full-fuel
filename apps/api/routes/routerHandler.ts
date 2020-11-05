/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Express, Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../handlers/ErrorHandler";
import { DomainError } from "@/sharedDomain/DomainError";
import { NotFoundException } from "@/sharedExceptions/NotFoundException";
import fuelStationsRoutes from "./fuelStationsRoutes";
import subscriptionsRoutes from "./subscriptionsRoutes";

export const routerHandler = (app: Express): Express => {
  app.use("/api/fuelstations", fuelStationsRoutes);
  app.use("/api/subscriptions", subscriptionsRoutes);
  app.use("*", () => { throw new NotFoundException("Resource not found"); });

  app.use((err: DomainError, req: Request, res: Response, next: NextFunction) => {
    ErrorHandler.error(res, err);
  });
  return app;
};
