import { NextFunction, Request, Response } from "express";
import { InternalServerErrorException } from "@/sharedExceptions/InternalServerErrorException";
import { ErrorHandler } from "../handlers/ErrorHandler";

export const parseListByGeoParams = (req: Request, res: Response, next: NextFunction): void => {

  try {
    const { longitude, latitude, radius, isOpen } = req.params;

    req.body = {
      longitude: (longitude) ? parseFloat(longitude) : null,
      latitude: (latitude) ? parseFloat(latitude) : null,
      radius: (radius) ? parseInt(radius) : null,
      isOpen: (isOpen) ? Boolean(isOpen) : false,
    };
    next();
  } catch (error) {
    ErrorHandler.error(res, new InternalServerErrorException("Error on parsing request parameters", error));
  }
};

export const parseListByIdParams = (req: Request, res: Response, next: NextFunction): void => {

  try {
    const { longitude, latitude, fuelstationsIDs } = req.params;
    const parsedIDs = fuelstationsIDs.split(",").map(id => parseInt(id));

    req.body = {
      longitude: (longitude) ? parseFloat(longitude) : null,
      latitude: (latitude) ? parseFloat(latitude) : null,
      fuelstationsIDs: (fuelstationsIDs) ? parsedIDs : null
    };
    next();
  } catch (error) {
    ErrorHandler.error(res, new InternalServerErrorException("Error on parsing request parameters", error));
  }
};

export const parseDetailParams = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { longitude, latitude, id } = req.params;

    console.log(longitude, latitude, id);

    req.body = {
      longitude: (longitude) ? parseFloat(longitude) : null,
      latitude: (latitude) ? parseFloat(latitude) : null,
      fuelstationID: (id) ? parseInt(id) : null
    };
    next();
  } catch (error) {
    ErrorHandler.error(res, new InternalServerErrorException("Error on parsing request parameters", error));
  }
};
