import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
import { FuelPriceRepo } from "@/contexts/FuelPrices/Domain/FuelPriceRepo";
import { FuelPrice } from "@/contexts/FuelPrices/Domain/FuelPrice";

export class PersistFuelPrice extends BaseUseCase{
  constructor(private repository: FuelPriceRepo) { super(); }

  async persist(fuelPrice: FuelPrice): Promise<void> {
    try {
      if (fuelPrice.price) {
        await this.repository.save(fuelPrice);
        this.logger.info(`Fuel price for ${fuelPrice.fuelType} on ${fuelPrice.fuelstationID} has been persisted correctly`);
      }
    } catch (error) {
      this.handleError(`Error on persisting a fuel price. ${error}`);
    }
  }
}
