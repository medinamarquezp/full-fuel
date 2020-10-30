import { Cron } from "@/sharedInfrastructure/Cron";

// FuelStations Job
const fuelStationsJob = "npm run fuelStationsJob";
const fuelStationsJobExecution = "0 0 6,13,19 * * *"; // 3 veces al día, a las 6, 13 y las 19 horas
Cron.task(fuelStationsJob, fuelStationsJobExecution);

// CCAAs Job
const CCAAsJob = "npm run ccaaJob";
const CCAAsJobExecution = "0 0 0 * * 7"; // 1 vez a la semana, los domingos a las 0 horas
Cron.task(CCAAsJob, CCAAsJobExecution);
