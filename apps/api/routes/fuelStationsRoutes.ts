import { Router } from "express";
import { FuelStationsController } from "../controllers/FuelStationsController";
import { getListByGeoValidationRules, getListByIdsValidationRules, getByIdValidationRules } from "../validators/fuelStationsValidators";

const router = Router();

router.get("/listbygeo", getListByGeoValidationRules(), FuelStationsController.getListByGeo);
router.get("/listbyids", getListByIdsValidationRules(), FuelStationsController.getListByIds);
router.get("/", getByIdValidationRules(), FuelStationsController.getById);

export default router;
