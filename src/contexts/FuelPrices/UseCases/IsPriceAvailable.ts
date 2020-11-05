import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
import { FuelTypes } from "@/sharedDomain/FuelTypes";
import { FuelPriceRepo } from "@/contexts/FuelPrices/Domain/FuelPriceRepo";

export class IsPriceAvailable extends BaseUseCase{
  constructor(private repository: FuelPriceRepo) { super(); }

  async check(fuelstationID: number, fueltype: FuelTypes): Promise<boolean> {
    let isPriceavailable = false;

    try {
      isPriceavailable = await this.repository.isPriceAvailable(fuelstationID, fueltype);
    } catch (error) {
      this.handleError(`Error checking if price of fuel ${fueltype} is available on fuelstation ${fuelstationID}. ${error.message}`);
    }
    return isPriceavailable;
  }
}
