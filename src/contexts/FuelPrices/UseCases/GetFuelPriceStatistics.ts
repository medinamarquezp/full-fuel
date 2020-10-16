import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
import { FuelPriceRepo } from "@/contexts/FuelPrices/Domain/FuelPriceRepo";
import { FuelTypes } from "@/contexts/FuelPrices/Domain/FuelTypes";
import { FuelPriceStatisticsType } from "@/contexts/FuelPrices/Domain/FuelPriceStatistics";

export class GetFuelPriceStatistics extends BaseUseCase{
  constructor(private repository: FuelPriceRepo) { super(); }

  async getStatistics(fuelstationID: number, fuelType: FuelTypes): Promise<FuelPriceStatisticsType> {
    let priceStatistics = { min: 0, max: 0, avg: 0 };

    try {
      priceStatistics = await this.repository.getPriceStatistics(fuelstationID, fuelType);
    } catch (error) {
      this.handleError(`Error on retrieving price statistics for ${fuelType} on ${fuelstationID}`);
    }
    return priceStatistics;
  }
}
