import { isOpen } from "../utils/isOpen";
import { Serializer } from "@/sharedInfrastructure/Serializer";
import { FuelTypes } from "@/sharedDomain/FuelTypes";
import { FuelPriceEvolution } from "@/contexts/FuelPrices/Domain/FuelPriceEvolution";
import { GetFuelStationGeo } from "@/contexts/FuelStations/UseCases/GetFuelStationGeo";
import { GetFuelStationsFromCache } from "@/contexts/FuelStations/UseCases/GetFuelStationsFromCache";
import { CacheFuelStationRepo } from "@/contexts/FuelStations/Infrastructure/Persistence/CacheFuelStationRepo";
import { InternalServerErrorException } from "@/sharedExceptions/InternalServerErrorException";
import { FuelStation } from "@/contexts/FuelStations/Domain/FuelStation";

export class FuelStationsRepo {
  static cacheRepo = new CacheFuelStationRepo();
  private static async getGeoPoints(longitude: number, latitude: number, radius: number): Promise<geoPoint[]> {
    let geoPointList: geoPoint [] = [];

    try {
      const fuelStationsByGeo = new GetFuelStationGeo(FuelStationsRepo.cacheRepo);
      const geoPoints = await fuelStationsByGeo.getGeoPoints(longitude, latitude, radius);

      geoPointList = geoPoints.map(point => {
        return { fuelstationID: parseInt(point[0]), distance: parseFloat(point[1]) };
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return geoPointList;
  }

  public static async getFuelStationsByGeo(longitude: number, latitude: number, radius: number, isOpen: boolean): Promise<unknown[]> {
    try {
      const fuelStationsFromCache = new GetFuelStationsFromCache(FuelStationsRepo.cacheRepo);
      const geoPoints = await FuelStationsRepo.getGeoPoints(longitude, latitude, radius);
      const fuelStationsIDs = geoPoints.map(geoPoint => geoPoint.fuelstationID);
      const fuelStationsList = await fuelStationsFromCache.getMany(fuelStationsIDs);
      const listData = this.fuelStationsListData(fuelStationsList, geoPoints);
      return Serializer.classToObject(this.filterOpenFuelStations(isOpen, listData));
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private static fuelStationsListData(fuelStations: FuelStation[], geoPoints: geoPoint[]): listData[]{
    const listData: listData[] = [];

    fuelStations.map(fuelStation => {
      const { fuelstationID, name, brandImage, isAlwaysOpen, timetables, prices } = fuelStation;
      const fuelPrices: listDataPrices[] = [];

      prices.map(fuelPrice => {
        const { fuelType, price, evolution } = fuelPrice;
        fuelPrices.push({fuelType, price, evolution});
      });
      const data = { name, brandImage, distance: this.getDistance(fuelstationID, geoPoints), isOpen: isOpen(isAlwaysOpen, timetables), fuelPrices };
      listData.push(data);
    });
    return listData;
  }

  private static getDistance(fuelstationID: number, geoPoints: geoPoint[]): number {
    const geoPoint = geoPoints.find(geoPoint => geoPoint.fuelstationID === fuelstationID);
    return (geoPoint) ? geoPoint.distance : 0;
  }

  private static filterOpenFuelStations(isOpen: boolean, listData: listData[]): listData[] {
    return (isOpen) ? listData.filter(data => data.isOpen === true) : listData;
  }
}

interface geoPoint {
  fuelstationID: number,
  distance: number
}
interface listData {
  name: string,
  brandImage?: string | undefined,
  distance: number,
  isOpen: boolean,
  fuelPrices: listDataPrices[]
}
interface listDataPrices {
  fuelType: FuelTypes,
  price: number,
  evolution: FuelPriceEvolution | undefined
}
