import { validateJobExecutionTime } from "../utils/validateJobExecutionTime";
import { NotificationsJobController } from "../controllers/NotificationsJobController";

(async () => {
  validateJobExecutionTime();
  await NotificationsJobController.run();
  console.log("Notifications process finished correctly");
  process.exit();
})();
