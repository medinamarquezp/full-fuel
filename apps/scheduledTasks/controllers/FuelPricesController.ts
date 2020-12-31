import { MysqlFuelPriceRepo } from "@/contexts/FuelPrices/Infrastructure/Persistence/MysqlFuelPriceRepo";
import { RemoveLastMonthPrices } from "@/contexts/FuelPrices/UseCases/RemoveLastMonthPrices";

export class FuelPricesController {
  static pricesDBRepo = new MysqlFuelPriceRepo();

  static async removeLastMonthPrices(): Promise<void> {
    const removePrices = new RemoveLastMonthPrices(this.pricesDBRepo);
    await removePrices.remove();
  }
}
