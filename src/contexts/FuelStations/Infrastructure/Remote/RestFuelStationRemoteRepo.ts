import { FuelStation } from "@/contexts/FuelStations/Domain/FuelStation";
import { FuelStationRemoteRepo } from "@/contexts/FuelStations/Domain/FuelStationRemoteRepo";
import { FuelStationRemoteProperties } from "@/contexts/FuelStations/Domain/FuelStationRemoteProperties";
import { RestClient } from "@/sharedDomain/RestClient";
import { FuelStationRemoteSerializer } from "./FuelStationRemoteSerializer";

export class RestFuelStationRemoteRepo implements FuelStationRemoteRepo
{
  constructor(
    private url: string,
    private client: RestClient) { }

  async getFuelStationsByCCAA(ccaaID: string): Promise<FuelStation[]>
  {
    let allFuelStations: FuelStation[] = [];

    try {
      const remoteURL = this.url + ccaaID;
      const fuelStationsfromMinetur = await this.client.get<FuelStationRemoteProperties>(remoteURL);
      allFuelStations = FuelStationRemoteSerializer.remoteToFuelStation(fuelStationsfromMinetur);
    } catch (err) {
      throw new Error(err);
    }
    return allFuelStations;
  }

}
