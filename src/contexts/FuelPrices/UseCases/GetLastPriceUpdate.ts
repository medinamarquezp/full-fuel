import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
import { FuelTypes } from "@/sharedDomain/FuelTypes";
import { FuelPriceUpdate } from "@/contexts/FuelPrices/Domain/FuelPriceUpdate";
import { FuelPriceRepo } from "@/contexts/FuelPrices/Domain/FuelPriceRepo";

export class GetLastPriceUpdate extends BaseUseCase{
  constructor(private repository: FuelPriceRepo) { super(); }

  async getLastPriceUpdate(fuelstationID: number, fuelType: FuelTypes): Promise<FuelPriceUpdate[]> {
    let pricesUpdate: FuelPriceUpdate[] = [];

    try {
      pricesUpdate = await this.repository.getLastPriceUpdate(fuelstationID, fuelType);
    } catch (error) {
      this.handleError(`Error on retrieving last price update for ${fuelType} on ${fuelstationID}`);
    }
    return pricesUpdate;
  }
}
