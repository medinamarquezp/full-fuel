import { FuelStationCacheRepo } from "@/contexts/FuelStations/Domain/FuelStationCacheRepo";
import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
export class SetFuelStationGeo extends BaseUseCase
{
  constructor(private repository: FuelStationCacheRepo) { super(); }

  async setGeoPoint(longitude: number, latitude: number, fuelstationID: number): Promise<void>
  {
    try
    {
      await this.repository.setGeoPoint(longitude, latitude, fuelstationID);
      this.logger.info(`Geo point for fuel station ${fuelstationID} setted correctly`);
    } catch (err)
    {
      this.handleError(`Error on setting geo point for fuel station ${fuelstationID}. ${err}`);
    }
  }
}
