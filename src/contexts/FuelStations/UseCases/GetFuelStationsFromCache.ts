import { FuelStationCacheRepo } from "@/contexts/FuelStations/Domain/FuelStationCacheRepo";
import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
import { FuelStation } from "@/contexts/FuelStations/Domain/FuelStation";
export class GetFuelStationsFromCache extends BaseUseCase
{
  constructor(private repository: FuelStationCacheRepo) { super(); }

  async getFuelStations(fuelstationIDs: number | number[]): Promise<FuelStation[]>
  {
    let fuelStations: FuelStation [] = [];

    try
    {
      fuelStations = await this.repository.getFuelStationsFromCache(fuelstationIDs);
    } catch (err)
    {
      this.handleError(`Error on getting fuel station list from cache. ${err}`);
    }
    return fuelStations;
  }
}
