import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
import { FuelPriceRepo } from "@/contexts/FuelPrices/Domain/FuelPriceRepo";

export class RemoveLastMonthPrices extends BaseUseCase{
  constructor(private repository: FuelPriceRepo) { super(); }

  async remove(): Promise<void> {
    try {
      await this.repository.removeLastMonthPrices();
    } catch (error) {
      this.handleError(`Error on deleting last month prices. ${error.message}`);
    }
  }
}
