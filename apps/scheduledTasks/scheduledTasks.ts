import { Cron } from "@/sharedInfrastructure/Cron";

// FuelStations Job
const fuelStationsJob = "npm run fuelStationsJob";
const fuelStationsJobExecution = "0 6,13,19 * * *"; // 3 veces al día, a las 6, 13 y las 19 horas
Cron.task(fuelStationsJob, fuelStationsJobExecution);

// Notifications Job
const notificationsJob = "npm run notificationsJob";
const notificationsJobExecution = "30 6,13,19 * * *"; // 3 veces al día, a las 6:30, 13:30 y las 19:30 horas
Cron.task(notificationsJob, notificationsJobExecution);

// CCAAs Job
const CCAAsJob = "npm run ccaaJob";
const CCAAsJobExecution = "0 0 * * 0"; // 1 vez a la semana, los domingos a las 0 horas
Cron.task(CCAAsJob, CCAAsJobExecution);
