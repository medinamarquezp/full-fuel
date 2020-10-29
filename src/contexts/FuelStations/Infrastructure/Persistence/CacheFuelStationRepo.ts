import { Client } from "@/sharedInfrastructure/Persistence/Cache/Client";
import { FuelStation } from "@/contexts/FuelStations/Domain/FuelStation";
import { FuelStationCacheRepo } from "@/contexts/FuelStations/Domain/FuelStationCacheRepo";

export class CacheFuelStationRepo implements FuelStationCacheRepo {
  private geoKey = "fuelStationsGEO";
  private fuelstationsCachedKey = "fuelStationsCached"
  async setGeoPoint(longitude: number, latitude: number, fuelstationID: number): Promise<void> {
    try {
      await Client.geoAdd(this.geoKey, longitude, latitude, fuelstationID);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getGeoPoints(longitude: number, latitude: number, radius: number): Promise<(string | [string, string | [string, string]])[]> {
    let geoPoints: (string | [string, string | [string, string]])[] = [];

    try {
      geoPoints = await Client.geoRadius(this.geoKey, longitude, latitude, radius);
    } catch (error) {
     throw new Error(error);
    }
    return geoPoints;
  }

  async addFuelStationToCache(fuelstationID: number, fuelstation: FuelStation): Promise<void> {
    try {
      const data = JSON.stringify(fuelstation);
      await Client.hSet(this.fuelstationsCachedKey, fuelstationID.toString(), data);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getFuelStationsFromCache(fuelstationIDs: number[]): Promise<FuelStation[]> {
    let fuelStations: FuelStation[] = [];
    const idsToString = fuelstationIDs.map(fuelstationID => fuelstationID.toString());

    try {
      const cachedFuelStations = await Client.hmGet(this.fuelstationsCachedKey, idsToString);

      fuelStations = cachedFuelStations.map(cachedFuelStation => {
        const fuelStationObject = JSON.parse(cachedFuelStation);
        const fuelStation = new FuelStation({...fuelStationObject});
        return fuelStation;
      });
    } catch (error) {
      throw new Error(error);
    }
    return fuelStations;
  }
}
