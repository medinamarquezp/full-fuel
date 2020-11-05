import { Router } from "express";
import { SubscriptionsController } from "../controllers/SubscriptionsController";
import { rateLimiter } from "../middlewares/rateLimiter";

const router = Router();

router.put("/add/:fuelstationID/:fueltype", rateLimiter, SubscriptionsController.subscribe);
router.put("/remove/:fuelstationID/:fueltype", rateLimiter, SubscriptionsController.unsubscribe);

export default router;
