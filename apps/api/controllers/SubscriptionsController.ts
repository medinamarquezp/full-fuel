import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { FuelTypes } from "@/sharedDomain/FuelTypes";
import { SubscriptionsRepo } from "../repositories/SubscriptionsRepo";
import { InternalServerErrorException } from "@/sharedDomain/Exceptions/InternalServerErrorException";

export class SubscriptionsController extends BaseController {

  public static async subscribe(req: Request, res: Response): Promise<Response>{
    let response: Response | undefined;

    try {
      const { fuelstationID, fueltype } = SubscriptionsController.getQueryParams(req);
      const message = await SubscriptionsRepo.newSubscription(fuelstationID, fueltype);
      response = SubscriptionsController.responseHandler.response(res, message);
    } catch (error) {
      SubscriptionsController.errorHandler.error(res, error);
    }
    return response as Response;
  }

  public static async unsubscribe(req: Request, res: Response): Promise<Response>{
    let response: Response | undefined;

    try {
      const { fuelstationID, fueltype } = SubscriptionsController.getQueryParams(req);
      const message = await SubscriptionsRepo.removeSubscription(fuelstationID, fueltype);
      response = SubscriptionsController.responseHandler.response(res, message);
    } catch (error) {
      SubscriptionsController.errorHandler.error(res, error);
    }
    return response as Response;
  }

  private static getQueryParams(req: Request): reqParams {
    try {
      const { fuelstationID, fueltype } = req.params;
      return { fuelstationID: parseInt(fuelstationID), fueltype: fueltype as FuelTypes };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

interface reqParams {
  fuelstationID: number,
  fueltype: FuelTypes
}
