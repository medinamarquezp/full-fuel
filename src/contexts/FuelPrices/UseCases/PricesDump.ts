import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
import { FuelPriceRepo } from "@/contexts/FuelPrices/Domain/FuelPriceRepo";
import { FuelTypes } from "@/contexts/FuelPrices/Domain/FuelTypes";
import { FuelPriceStatisticsType } from "@/contexts/FuelPrices/Domain/FuelPriceStatistics";

export class PricesDump extends BaseUseCase{
  constructor(private repository: FuelPriceRepo) { super(); }

  async dump(fuelstationID: number, fuelType: FuelTypes, priceStatistics: FuelPriceStatisticsType): Promise<void> {
    try {
      await this.repository.pricesDump(fuelstationID, fuelType, priceStatistics);
      this.logger.info(`Price for ${FuelTypes} of fuelstation ${fuelstationID} has been dumping correctly`);
    } catch (error) {
      this.handleError(`Error when dumping ${FuelTypes} prices of fuel station ${fuelstationID}`);
    }
  }
}
