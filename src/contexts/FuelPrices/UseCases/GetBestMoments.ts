import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
import { FuelPriceRepo } from "@/contexts/FuelPrices/Domain/FuelPriceRepo";
import { FuelPricesBestMoments } from "@/contexts/FuelPrices/Domain/FuelPricesBestMoments";

export class GetBestMoments extends BaseUseCase{
  constructor(private repository: FuelPriceRepo) { super(); }

  async getMoments(fuelstationID: number): Promise<FuelPricesBestMoments> {
    let bestMoments: FuelPricesBestMoments | undefined;

    try {
      bestMoments = await this.repository.getBestMoments(fuelstationID);
    } catch (error) {
      this.handleError(`Error on retrieving best price moments. ${error}`);
    }
    return bestMoments as FuelPricesBestMoments;
  }
}
