import { FuelStation } from "@/contexts/FuelStations/Domain/FuelStation";
import { FuelStationRemoteRepo } from "@/contexts/FuelStations/Domain/FuelStationRemoteRepo";

export class InMemoryFuelStationRemoteRepo implements FuelStationRemoteRepo
{
  constructor(private data: FuelStation[]) { }

  async getFuelStationsByCCAA(ccaaID: string): Promise<FuelStation[]>
  {
    console.log(ccaaID);
    return this.data;
  }
}
