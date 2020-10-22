import { FuelStation } from "../Domain/FuelStation";
import { FuelStationRemoteRepo } from "../Domain/FuelStationRemoteRepo";
import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";

export class GetFuelStationsFromRemote extends BaseUseCase
{
  constructor(private remote: FuelStationRemoteRepo) { super(); }

  async getAll(ccaaID: string): Promise<FuelStation[]>
  {
    let fuelStationsfromMinetur: FuelStation[] = [];

    try {
      fuelStationsfromMinetur = await this.remote.getFuelStationsByCCAA(ccaaID);
      this.logger.info("All FuelStations from remote has been fetched correctly");
    } catch (err) {
      this.handleError(`Error on retrieving FuelStation list from remote. ${err}`);
    }
    return fuelStationsfromMinetur;
  }
}
