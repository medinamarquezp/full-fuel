import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { FuelStationsRepo } from "../repositories/FuelStationsRepo";

export class FuelStationsController extends BaseController {

  public static async getListByGeo(req: Request, res: Response): Promise<Response>{
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

  public static async getListByIds(req: Request, res: Response): Promise<Response>{
    let response: Response | undefined;

    try {
      FuelStationsController.validationErrorHandler(req);
      const { longitude, latitude, fuelstationsIDs } = req.body;
      const fuelStationsList = await FuelStationsRepo.getFuelStationsByIDs(longitude, latitude, fuelstationsIDs);
      FuelStationsController.responseHandler.response(res, fuelStationsList);
    } catch (error) {
      FuelStationsController.errorHandler.error(res, error);
    }
    return response as Response;
  }

  public static async getById(req: Request, res: Response): Promise<Response>{
    let response: Response | undefined;

    try {
      FuelStationsController.validationErrorHandler(req);
      const { longitude, latitude, fuelstationID } = req.body;
      const fuelStationsList = await FuelStationsRepo.getFuelStationByID(longitude, latitude, fuelstationID);
      FuelStationsController.responseHandler.response(res, fuelStationsList);
    } catch (error) {
      FuelStationsController.errorHandler.error(res, error);
    }
    return response as Response;
  }
}
