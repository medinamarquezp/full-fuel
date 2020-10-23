import { FuelStation } from "@/contexts/FuelStations/Domain/FuelStation";
import { FuelStationRemoteSerializer } from "./FuelStationRemoteSerializer";
import { FuelStationRemoteRepo } from "@/contexts/FuelStations/Domain/FuelStationRemoteRepo";
import { FuelStationRemoteProperties } from "@/contexts/FuelStations/Domain/FuelStationRemoteProperties";

export class InMemoryFuelStationRemoteRepo implements FuelStationRemoteRepo
{
  constructor(private data: FuelStationRemoteProperties) { }

  async getFuelStationsByCCAA(ccaaID: string): Promise<FuelStation[]>
  {
    console.log(ccaaID);
    const fuelStations = FuelStationRemoteSerializer.remoteToFuelStation(this.data);
    return fuelStations;
  }
}
