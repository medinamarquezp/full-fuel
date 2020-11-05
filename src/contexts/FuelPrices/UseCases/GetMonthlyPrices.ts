import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
import { FuelPriceRepo } from "@/contexts/FuelPrices/Domain/FuelPriceRepo";
import { FuelMonthlyPrices } from "@/contexts/FuelPrices/Domain/FuelMonthlyPrices";

export class GetMonthlyPrices extends BaseUseCase{
  constructor(private repository: FuelPriceRepo) { super(); }

  async getPrices(fuelstationID: number): Promise<FuelMonthlyPrices[]> {
    let monthlyPrices: FuelMonthlyPrices[] = [];

    try {
      monthlyPrices = await this.repository.getMonthlyPrices(fuelstationID);
    } catch (error) {
      this.handleError(`Error on retrieving monthly prices. ${error}`);
    }
    return monthlyPrices;
  }
}
