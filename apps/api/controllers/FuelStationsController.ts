import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { FuelStationsRepo } from "../repositories/FuelStationsRepo";

export class FuelStationsController extends BaseController {

  public static async getAllByGeo(req: Request, res: Response): Promise<Response>{
    let response: Response | undefined;

    try {
      FuelStationsController.validationErrorHandler(req);
      const { longitude, latitude, radius, isOpen } = req.body;
      const fuelStationsList = await FuelStationsRepo.getFuelStationsByGeo(longitude, latitude, radius, isOpen);
      FuelStationsController.responseHandler.response(res, fuelStationsList);
    } catch (error) {
      FuelStationsController.errorHandler.error(res, error);
    }
    return response as Response;
  }
}
