import { Router } from "express";
import { FuelStationsController } from "../controllers/FuelStationsController";
import { rateLimiter } from "../middlewares/rateLimiter";
import { getListByGeoValidationRules, getListByIdsValidationRules, getByIdValidationRules } from "../validators/fuelStationsValidators";

const router = Router();

router.get("/listbygeo", rateLimiter, getListByGeoValidationRules(), FuelStationsController.getListByGeo);
router.get("/listbyids", rateLimiter, getListByIdsValidationRules(), FuelStationsController.getListByIds);
router.get("/", rateLimiter, getByIdValidationRules(), FuelStationsController.getById);

export default router;
