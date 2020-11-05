import { FuelStation } from "./FuelStation";
export interface FuelStationCacheRepo {
  setGeoPoint(longitude: number, latitude: number, fuelstationID: number): Promise<void>;
  getGeoPoints(longitude: number, latitude: number, radius: number): Promise<(string | [string, string | [string, string]])[]>;
  addFuelStationToCache(fuelstationID: number, fuelstation: FuelStation): Promise<void>;
  getFuelStationsFromCache(fuelstationIDs: number | number[]): Promise<FuelStation[]>;
}
