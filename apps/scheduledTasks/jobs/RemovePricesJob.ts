import { FuelPricesController } from "../controllers/FuelPricesController";
import { validateFirstDayOfMonth } from "../utils/validateFirstDayOfMonth";

(async () => {
  validateFirstDayOfMonth();
  await FuelPricesController.removeLastMonthPrices();
  console.log("Remove last month prices process finished correctly");
  process.exit();
})();
