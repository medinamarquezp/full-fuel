import { Today } from "@/sharedDomain/Today";
import { Criteria } from "@/contexts/FuelPrices/Domain/FuelPriceRepo";
import { GetAllFuelPrices } from "@/contexts/FuelPrices/UseCases/GetAllFuelPrices";
import { MysqlFuelPriceRepo } from "@/contexts/FuelPrices/Infrastructure/Persistence/MysqlFuelPriceRepo";

export const validateIfJobExecuted = async (): Promise<void> => {
  const repo = new MysqlFuelPriceRepo();
  const getFuelPrices = new GetAllFuelPrices(repo);
  const month = Today.month();
  const day = Today.day();
  const hour = Today.hour();
  const criteria =  { month, day, hour } as Criteria;
  const fuelPrices = await getFuelPrices.getByCriteria(criteria);

  if (fuelPrices.length > 0) {
    console.log("The process has already been executed this same hour.");
    process.exit(0);
  }
};
