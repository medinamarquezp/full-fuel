import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
import { FuelPriceRepo } from "@/contexts/FuelPrices/Domain/FuelPriceRepo";
import { FuelPricesDump } from "@/contexts/FuelPrices/Domain/FuelPricesDump";

export class GetPricesDump extends BaseUseCase{
  constructor(private repository: FuelPriceRepo) { super(); }

  async getAll(): Promise<FuelPricesDump[]> {
    let pricesDumpList: FuelPricesDump[] = [];

    try {
      pricesDumpList = await this.repository.getPricesDump();
    } catch (error) {
      this.handleError("Error on retrieving all prices dump");
    }
    return pricesDumpList;
  }
}
