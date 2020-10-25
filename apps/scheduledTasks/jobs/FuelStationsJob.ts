import { processByCCAA } from "../utils/processByCCAA";

const processFile = "build/apps/scheduledTasks/controller/FuelStationJobController.js";

(async () => {
  await processByCCAA(processFile);
  console.log("Fuel stations process finished correctly");
  process.exit();
})();
