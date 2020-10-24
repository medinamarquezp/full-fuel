import { FuelStation } from "./FuelStation";

export interface FuelStationRepo {
  save(fuelstations: FuelStation[]): Promise<void>;
  update(fuelstation: FuelStation): Promise<void>;
  getAll(): Promise<FuelStation[]>;
  getByID(fuelstationID: number): Promise<FuelStation>;
}
