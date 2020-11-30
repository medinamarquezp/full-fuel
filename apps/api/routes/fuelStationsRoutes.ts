import { Router } from "express";
import { FuelStationsController } from "../controllers/FuelStationsController";
import { rateLimiter } from "../middlewares/rateLimiter";
import { validateToken } from "../middlewares/validateToken";
import { parseListByGeoParams, parseListByIdParams, parseDetailParams } from "../middlewares/parseFuelstationsGetParams";
import { getListByGeoValidationRules, getListByIdsValidationRules, getByIdValidationRules } from "../validators/fuelStationsValidators";

const router = Router();

router.get("/list/geo/:latitude/:longitude/:radius/:isOpen?",
  validateToken,
  rateLimiter,
  parseListByGeoParams,
  getListByGeoValidationRules(),
  FuelStationsController.getListByGeo
);

router.get("/list/id/:latitude/:longitude/:fuelstationsIDs",
  validateToken,
  rateLimiter,
  parseListByIdParams,
  getListByIdsValidationRules(),
  FuelStationsController.getListByIds
);

router.get("/detail/:latitude/:longitude/:id",
  validateToken,
  rateLimiter,
  parseDetailParams,
  getByIdValidationRules(),
  FuelStationsController.getById
);

export default router;
