import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
import { FuelPriceRepo, Criteria } from "@/contexts/FuelPrices/Domain/FuelPriceRepo";
import { FuelPrice } from "@/contexts/FuelPrices/Domain/FuelPrice";

export class GetAllFuelPrices extends BaseUseCase{
  constructor(private repository: FuelPriceRepo) { super(); }

  async getAll(): Promise<FuelPrice[]> {
    let fuelPriceList: FuelPrice[] = [];

    try {
      fuelPriceList = await this.repository.getAll();
    } catch (error) {
      this.handleError("Error on retrieving all fuel prices");
    }
    return fuelPriceList;
  }

  async getByCriteria(criteria: Criteria): Promise<FuelPrice[]> {
    let fuelPrices: FuelPrice[] | undefined;

    try {
      fuelPrices = await this.repository.findByCriteria(criteria);
    } catch (err) {
      this.handleError(`Error on retrieving fuel prices by criteria ${criteria}. ${err}`);
    }
    return fuelPrices as FuelPrice[];
  }
}
