import { FuelStationCacheRepo } from "@/contexts/FuelStations/Domain/FuelStationCacheRepo";
import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
import { FuelStation } from "@/contexts/FuelStations/Domain/FuelStation";
export class GetFuelStationsFromCache extends BaseUseCase
{
  constructor(private repository: FuelStationCacheRepo) { super(); }

  async getOne(fuelstationID: number): Promise<FuelStation>
  {
    let fuelStation: FuelStation | undefined;

    try
    {
      fuelStation = await this.repository.getFuelStationFromCache(fuelstationID);
    } catch (err)
    {
      this.handleError(`Error on getting fuel station ${fuelstationID} from cache. ${err}`);
    }
    return fuelStation as FuelStation;
  }

  async getMany(fuelstationIDs: number[]): Promise<FuelStation[]>
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
