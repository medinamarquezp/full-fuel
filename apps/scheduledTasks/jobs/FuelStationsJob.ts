import { processByCCAA } from "../utils/processByCCAA";

const processFile = "build/apps/scheduledTasks/controller/FuelStationJobController.js";

(async () => {
  await processByCCAA(processFile);
})();
