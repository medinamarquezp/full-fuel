import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
import { FuelPriceRepo } from "@/contexts/FuelPrices/Domain/FuelPriceRepo";
import { FuelTypes } from "@/sharedDomain/FuelTypes";
import { FuelPriceEvolution } from "@/contexts/FuelPrices/Domain/FuelPriceEvolution";

export class GetFuelPriceEvolution extends BaseUseCase{
  constructor(private repository: FuelPriceRepo) { super(); }

  async getEvolution(fuelstationID: number, fuelType: FuelTypes, price: number): Promise<FuelPriceEvolution> {
    let priceEvolution = FuelPriceEvolution.EQUALS;

    try {
      priceEvolution = await this.repository.getEvolution(fuelstationID, fuelType, price);
    } catch (error) {
      this.handleError(`Error on retrieving price evolution for ${fuelType} on ${fuelstationID}`);
    }
    return priceEvolution;
  }
}
