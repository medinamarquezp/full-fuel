import { headingDistanceTo } from "geolocation-utils";
import { isOpen } from "../utils/isOpen";
import { Serializer } from "@/sharedInfrastructure/Serializer";
import { FuelTypes } from "@/sharedDomain/FuelTypes";
import { FuelPriceEvolution } from "@/contexts/FuelPrices/Domain/FuelPriceEvolution";
import { GetFuelStationGeo } from "@/contexts/FuelStations/UseCases/GetFuelStationGeo";
import { GetFuelStationsFromCache } from "@/contexts/FuelStations/UseCases/GetFuelStationsFromCache";
import { CacheFuelStationRepo } from "@/contexts/FuelStations/Infrastructure/Persistence/CacheFuelStationRepo";
import { InternalServerErrorException } from "@/sharedExceptions/InternalServerErrorException";
import { FuelStation } from "@/contexts/FuelStations/Domain/FuelStation";
import { NotFoundException } from "@/sharedDomain/Exceptions/NotFoundException";

export class FuelStationsRepo {
  static cacheRepo = new CacheFuelStationRepo();

  public static async getFuelStationsByGeo(longitude: number, latitude: number, radius: number, isOpen: boolean): Promise<unknown[]> {
    try {
      const geoPoints = await FuelStationsRepo.getGeoPoints(longitude, latitude, radius);
      const fuelStationsIDs = geoPoints.map(geoPoint => geoPoint.fuelstationID);
      const listData = await this.fuelStationsListDataByIDs(fuelStationsIDs, {longitude, latitude});
      return Serializer.classToObject(this.filterOpenFuelStations(isOpen, listData));
    } catch (error) {
      if (error instanceof NotFoundException) throw new NotFoundException(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  public static async getFuelStationsByIDs(longitude: number, latitude: number, fuelStationsIDs: number[]): Promise<unknown[]> {
    try {
      const listData = await this.fuelStationsListDataByIDs(fuelStationsIDs, {longitude, latitude});
      return Serializer.classToObject(listData);
    } catch (error) {
      if (error instanceof NotFoundException) throw new NotFoundException(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  private static async fuelStationsListDataByIDs(fuelStationsIDs: number[], coordinates: coordinates): Promise<listData[]> {
    const fuelStationsFromCache = new GetFuelStationsFromCache(FuelStationsRepo.cacheRepo);
    const fuelStationsList = await fuelStationsFromCache.getMany(fuelStationsIDs);
    if(fuelStationsList.length === 0) throw new NotFoundException("No fuel stations found with these IDs");
    const { longitude, latitude } = coordinates;
    const listData = this.fuelStationsListData(fuelStationsList, {longitude, latitude});
    return listData;
  }

  private static fuelStationsListData(fuelStations: FuelStation[], coordinates: coordinates): listData[]{
    const listData: listData[] = [];

    fuelStations
      .filter(fuelStation => fuelStation.prices.length !== 0)
      .map(fuelStation => {
        const { fuelstationID, name, brandImage, isAlwaysOpen, timetables, prices } = fuelStation;
        const fuelPrices: listDataPrices[] = [];

        prices.map(fuelPrice => {
          const { fuelType, price, evolution } = fuelPrice;
          fuelPrices.push({fuelType, price, evolution});
        });

        const data = { fuelstationID, name, brandImage,
          distance: this.getDistance(fuelStation, coordinates),
          isOpen: isOpen(isAlwaysOpen, timetables),
          fuelPrices
      };
      listData.push(data);
    });
    if(listData.length === 0) throw new NotFoundException("No fuel stations found");
    return listData;
  }

  private static getDistance(fuelStation: FuelStation, coords: coordinates): number {
    const fuelStationCoordinates = { lat: fuelStation.latitude, lon: fuelStation.longitude };
    const appCoordinates = { lat: coords.latitude, lon: coords.longitude };
    const headingDistance = headingDistanceTo(appCoordinates, fuelStationCoordinates);
    const distanceKM = parseFloat((headingDistance.distance / 1000).toFixed(2));
    return distanceKM;

  }

  private static async getGeoPoints(longitude: number, latitude: number, radius: number): Promise<geoPoint[]> {
    const fuelStationsByGeo = new GetFuelStationGeo(FuelStationsRepo.cacheRepo);
    const geoPoints = await fuelStationsByGeo.getGeoPoints(longitude, latitude, radius);
    if(geoPoints.length === 0) throw new NotFoundException("No fuel stations found with these params");
    return geoPoints.map(point => {
      return { fuelstationID: parseInt(point[0]), distance: parseFloat(point[1]) };
    });
  }

  private static filterOpenFuelStations(isOpen: boolean, listData: listData[]): listData[] {
    return (isOpen) ? listData.filter(data => data.isOpen === true) : listData;
  }
}

interface coordinates {
  longitude: number,
  latitude: number
}
interface geoPoint {
  fuelstationID: number,
  distance: number
}
interface listData {
  fuelstationID: number,
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
