import { NotificationsJobController } from "../controllers/NotificationsJobController";

(async () => {
  await NotificationsJobController.run();
  console.log("Notifications process finished correctly");
  process.exit();
})();
