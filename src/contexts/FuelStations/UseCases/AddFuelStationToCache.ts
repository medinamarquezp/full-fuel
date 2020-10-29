import { FuelStationCacheRepo } from "@/contexts/FuelStations/Domain/FuelStationCacheRepo";
import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
import { FuelStation } from "@/contexts/FuelStations/Domain/FuelStation";
export class AddFuelStationToCache extends BaseUseCase
{
  constructor(private repository: FuelStationCacheRepo) { super(); }

  async addToCache(fuelstationID: number, fuelstation: FuelStation): Promise<void>
  {
    try
    {
      await this.repository.addFuelStationToCache(fuelstationID, fuelstation);
      this.logger.info(`Fuel station ${fuelstationID} has been added to cache`);
    } catch (err)
    {
      this.handleError(`Error on adding fuel station ${fuelstationID} to cache. ${err}`);
    }
  }
}
