import { Router } from "express";
import { SubscriptionsController } from "../controllers/SubscriptionsController";
import { validateToken } from "../middlewares/validateToken";
import { rateLimiter } from "../middlewares/rateLimiter";

const router = Router();

router.put("/add/:fuelstationID/:fueltype", validateToken, rateLimiter, SubscriptionsController.subscribe);
router.put("/remove/:fuelstationID/:fueltype", validateToken, rateLimiter, SubscriptionsController.unsubscribe);

export default router;
