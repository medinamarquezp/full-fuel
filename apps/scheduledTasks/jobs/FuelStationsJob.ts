import { resolve, join } from "path";
import { processByCCAA } from "../utils/processByCCAA";
import { validateJobExecutionTime } from "../utils/validateJobExecutionTime";
import { validateIfJobExecuted } from "../utils/validateIfJobExecuted";

const rootDir = resolve(process.cwd());
const processFile = join(rootDir, "build", "apps", "scheduledTasks", "controllers", "FuelStationJobController.js");

(async () => {
  validateJobExecutionTime();
  await validateIfJobExecuted();
  await processByCCAA(processFile);
})();
