import { FuelStation } from "./FuelStation";

export interface FuelStationRepo {
  save(fuelstations: FuelStation[]): Promise<void>;
  update(fuelstation: FuelStation): Promise<void>;
  getAll(): Promise<FuelStation[]>;
  findByCriteria(criteria: Criteria): Promise<FuelStation[]>;
  findByID(fuelstationID: number): Promise<FuelStation>;
}

export interface Criteria {
  ccaaID: string,
  name: string,
  address: string,
  postalCode: string,
  province: string,
  city: string,
  town: string,
  latitude: number,
  longitude: number,
  isAlwaysOpen: boolean,
  bestDay: number,
  bestMoment: string
}
