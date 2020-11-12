import { Router } from "express";
import { FuelStationsController } from "../controllers/FuelStationsController";
import { rateLimiter } from "../middlewares/rateLimiter";
import { getListByGeoValidationRules, getListByIdsValidationRules, getByIdValidationRules } from "../validators/fuelStationsValidators";

const router = Router();

router.get("/list/geo", rateLimiter, getListByGeoValidationRules(), FuelStationsController.getListByGeo);
router.get("/list/ids", rateLimiter, getListByIdsValidationRules(), FuelStationsController.getListByIds);
router.get("/detail", rateLimiter, getByIdValidationRules(), FuelStationsController.getById);

export default router;
