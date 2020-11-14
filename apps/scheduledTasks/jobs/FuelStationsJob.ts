import { resolve, join } from "path";
import { processByCCAA } from "../utils/processByCCAA";

const rootDir = resolve(process.cwd());
const processFile = join(rootDir, "build", "apps", "scheduledTasks", "controllers", "FuelStationJobController.js");

(async () => {
  await processByCCAA(processFile);
})();
