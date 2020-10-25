import { CCAAJobController } from "../controller/CCAAJobController";

(async () => {
  await CCAAJobController.run();
  console.log("CCAA process finished correctly");
  process.exit();
})();
