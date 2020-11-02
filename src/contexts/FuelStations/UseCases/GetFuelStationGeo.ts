import { FuelStationCacheRepo } from "@/contexts/FuelStations/Domain/FuelStationCacheRepo";
import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
export class GetFuelStationGeo extends BaseUseCase
{
  constructor(private repository: FuelStationCacheRepo) { super(); }

  async getGeoPoints(longitude: number, latitude: number, radius: number): Promise<[string, string][]>
  {
    let geoPoints: [string, string][] = [];

    try
    {
      geoPoints = await this.repository.getGeoPoints(longitude, latitude, radius) as [string, string][];
    } catch (err)
    {
      this.handleError(`Error on getting geo points. ${err}`);
    }
    return geoPoints;
  }
}
