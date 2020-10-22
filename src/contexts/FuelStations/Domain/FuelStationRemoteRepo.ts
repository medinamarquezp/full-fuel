import { FuelStation } from "./FuelStation";

export interface FuelStationRemoteRepo {
  getFuelStationsByCCAA(ccaaID: string): Promise<FuelStation[]>
}
