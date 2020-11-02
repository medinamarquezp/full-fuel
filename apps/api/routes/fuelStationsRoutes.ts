import { Router } from "express";
import { FuelStationsController } from "../controllers/FuelStationsController";
import { getAllByGeoValidationRules } from "../validators/fuelStationsValidators";

const router = Router();

router.post("/geolist", getAllByGeoValidationRules(), FuelStationsController.getAllByGeo);

export default router;
