import { Router } from "express";
import { FuelStationsController } from "../controllers/FuelStationsController";
import { getListByGeoValidationRules, getListByIdsValidationRules } from "../validators/fuelStationsValidators";

const router = Router();

router.post("/listbygeo", getListByGeoValidationRules(), FuelStationsController.getListByGeo);
router.post("/listbyids", getListByIdsValidationRules(), FuelStationsController.getListByIds);

export default router;
