import { Router } from "express";
import { FuelStationsController } from "../controllers/FuelStationsController";
import { getListByGeoValidationRules, getListByIdsValidationRules } from "../validators/fuelStationsValidators";

const router = Router();

router.post("/listbygeo", getListByGeoValidationRules(), FuelStationsController.getAllByGeo);
router.post("/listbyids", getListByIdsValidationRules(), FuelStationsController.getFuelStationsByIDs);

export default router;
