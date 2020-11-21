import { validateJobExecutionTime } from "../utils/validateJobExecutionTime";
import { NotificationsJobController } from "../controllers/NotificationsJobController";
import { validateIfJobExecuted } from "../utils/validateIfJobExecuted";

(async () => {
  validateJobExecutionTime();
  await validateIfJobExecuted();
  await NotificationsJobController.run();
  console.log("Notifications process finished correctly");
  process.exit();
})();
