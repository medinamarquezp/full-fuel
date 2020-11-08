import { processByCCAA } from "../utils/processByCCAA";
import { resolve, join } from "path";

const rootDir = resolve(process.cwd());
const processFile = join(rootDir, "build", "apps", "scheduledTasks", "controllers", "FuelStationJobController.js");

(async () => {
  await processByCCAA(processFile);
})();
