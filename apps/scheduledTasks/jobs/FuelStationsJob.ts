import { processByCCAA } from "../utils/processByCCAA";

const processFile = "./build/apps/scheduledTasks/controllers/FuelStationJobController.js";

(async () => {
  await processByCCAA(processFile);
})();
