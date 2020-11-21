import { resolve, join } from "path";
import { processByCCAA } from "../utils/processByCCAA";
import { validateJobExecutionTime } from "../utils/validateJobExecutionTime";

const rootDir = resolve(process.cwd());
const processFile = join(rootDir, "build", "apps", "scheduledTasks", "controllers", "FuelStationJobController.js");

(async () => {
  validateJobExecutionTime();
  await processByCCAA(processFile);
})();
