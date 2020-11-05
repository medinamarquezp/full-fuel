import { Router } from "express";
import { SubscriptionsController } from "../controllers/SubscriptionsController";

const router = Router();

router.put("/add/:fuelstationID/:fueltype", SubscriptionsController.subscribe);
router.put("/remove/:fuelstationID/:fueltype", SubscriptionsController.unsubscribe);

export default router;
