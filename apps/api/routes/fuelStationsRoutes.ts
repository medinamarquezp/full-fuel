import { Router } from "express";
import { FuelStationsController } from "../controllers/FuelStationsController";
import { rateLimiter } from "../middlewares/rateLimiter";
import { validateToken } from "../middlewares/validateToken";
import { getListByGeoValidationRules, getListByIdsValidationRules, getByIdValidationRules } from "../validators/fuelStationsValidators";

const router = Router();

router.get("/list/geo", validateToken, rateLimiter, getListByGeoValidationRules(), FuelStationsController.getListByGeo);
router.get("/list/ids", validateToken, rateLimiter, getListByIdsValidationRules(), FuelStationsController.getListByIds);
router.get("/detail", validateToken, rateLimiter, getByIdValidationRules(), FuelStationsController.getById);

export default router;
