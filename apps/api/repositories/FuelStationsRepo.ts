/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { headingDistanceTo } from "geolocation-utils";
import { isOpen } from "../utils/isOpen";
import { coordinates, geoPoint, listData, detailDataPrices, detailData } from "./FuelStationsRepoTypes";
import { FuelTypes } from "@/sharedDomain/FuelTypes";
import { Serializer } from "@/sharedInfrastructure/Serializer";
import { NotFoundException } from "@/sharedDomain/Exceptions/NotFoundException";
import { InternalServerErrorException } from "@/sharedExceptions/InternalServerErrorException";
import { FuelStation } from "@/contexts/FuelStations/Domain/FuelStation";
import { GetFuelStationGeo } from "@/contexts/FuelStations/UseCases/GetFuelStationGeo";
import { GetFuelStationsFromCache } from "@/contexts/FuelStations/UseCases/GetFuelStationsFromCache";
import { CacheFuelStationRepo } from "@/contexts/FuelStations/Infrastructure/Persistence/CacheFuelStationRepo";
import { FuelPrice } from "@/contexts/FuelPrices/Domain/FuelPrice";
import { FuelMonthlyPrices } from "@/contexts/FuelPrices/Domain/FuelMonthlyPrices";
import { FuelPriceStatisticsType } from "@/contexts/FuelPrices/Domain/FuelPriceStatistics";
import { GetMonthlyPrices } from "@/contexts/FuelPrices/UseCases/GetMonthlyPrices";
import { GetFuelPriceStatistics } from "@/contexts/FuelPrices/UseCases/GetFuelPriceStatistics";
import { MysqlFuelPriceRepo } from "@/contexts/FuelPrices/Infrastructure/Persistence/MysqlFuelPriceRepo";

export class FuelStationsRepo {
  static dbFuelPriceRepo = new MysqlFuelPriceRepo();
  static cacheFuelStationRepo = new CacheFuelStationRepo();

  public static async getFuelStationsByGeo(longitude: number, latitude: number, radius: number, isOpen: boolean): Promise<unknown[]> {
    try {
      const geoPoints = await FuelStationsRepo.getGeoPoints(longitude, latitude, radius);
      const fuelStationsIDs = geoPoints.map(geoPoint => geoPoint.fuelstationID);
      const listData = await this.fuelStationsListDataByIDs(fuelStationsIDs, {longitude, latitude});
      const response = (isOpen) ? listData.filter(data => data.isNowOpen === true) : listData;
      return Serializer.classToObject(response);
    } catch (error) {
      if (error instanceof NotFoundException) throw new NotFoundException(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  public static async getFuelStationsByIDs(longitude: number, latitude: number, fuelStationsIDs: number[]): Promise<unknown[]> {
    try {
      const response = await this.fuelStationsListDataByIDs(fuelStationsIDs, {longitude, latitude});
      return Serializer.classToObject(response);
    } catch (error) {
      if (error instanceof NotFoundException) throw new NotFoundException(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  public static async getFuelStationByID(longitude: number, latitude: number, fuelStationID: number): Promise<unknown> {
    try {
      let fuelStation = await this.fuelStationsByIDs(fuelStationID);
      fuelStation = (Array.isArray(fuelStation)) ? fuelStation[0] : fuelStation;
      const response = await this.fuelStationDetailData(fuelStation, {longitude, latitude});
      return Serializer.classToObject(response);
    } catch (error) {
      if (error instanceof NotFoundException) throw new NotFoundException(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  private static async fuelStationsListDataByIDs(fuelStationsIDs: number[], coordinates: coordinates): Promise<listData[]> {
    const fuelStationsList = await this.fuelStationsByIDs(fuelStationsIDs);
    const { longitude, latitude } = coordinates;
    const listData = await this.fuelStationsListData(fuelStationsList as FuelStation[], {longitude, latitude});
    return listData;
  }

  private static async fuelStationsByIDs(fuelStationsIDs: number | number[]): Promise<FuelStation | FuelStation[]>{
    const fuelStationsFromCache = new GetFuelStationsFromCache(FuelStationsRepo.cacheFuelStationRepo);
    const fuelStationsList = await fuelStationsFromCache.getFuelStations(fuelStationsIDs);
    if(fuelStationsList.length === 0) throw new NotFoundException("No fuel stations found with these IDs");
    return fuelStationsList;
  }

  private static async fuelStationsListData(fuelStations: FuelStation[], appCoordinates: coordinates): Promise<listData[]>{
    const listData: listData[] = [];
    const fuelStationsWithPrices = fuelStations.filter(fuelStation => fuelStation.prices.length !== 0);

    for await (const fuelStation of fuelStationsWithPrices) {
      const { fuelstationID, name, brandImage, isAlwaysOpen, timetables, prices } = fuelStation;
      const fullName = `${name} (${fuelstationID})`;
      const fuelPrices = await this.getFuelPrices(prices);
      const distance = this.getDistance(fuelStation, appCoordinates);
      const isNowOpen = isOpen(isAlwaysOpen, timetables);
      const data: listData = { fuelstationID, name: fullName, brandImage, distance, isNowOpen, fuelPrices };
      listData.push(data);
    }
    if(listData.length === 0) throw new NotFoundException("No fuel stations found");
    return listData;
  }

  private static async fuelStationDetailData(fuelStation: FuelStation, appCoordinates: coordinates): Promise<detailData>{
    const { fuelstationID, name, brandImage, address, city, province, latitude,
            longitude, isAlwaysOpen, timetable, timetables, prices, bestDay, bestMoment } = fuelStation;
    const fullName = `${name} (${fuelstationID})`;
    const fullAddress = `${address}, ${city}, ${province}`;
    const distance = this.getDistance(fuelStation, appCoordinates);
    const coordinates = {latitude, longitude};
    const isNowOpen = isOpen(isAlwaysOpen, timetables);
    const fuelPrices = await this.getFuelPrices(prices, true);
    const monthlyPriceEvolution = await this.getMonthlyPrices(fuelstationID);
    return { fuelstationID, name: fullName, brandImage, address: fullAddress, distance, coordinates, timetable,
             isNowOpen, fuelPrices, monthlyPriceEvolution, bestDay, bestMoment };
  }

  private static async getMonthlyPrices(fuelstationID: number): Promise<FuelMonthlyPrices[]>{
    const monthlyPrices = new GetMonthlyPrices(this.dbFuelPriceRepo);
    const prices = await monthlyPrices.getPrices(fuelstationID);
    return prices;
  }

  private static async getFuelPrices(prices: FuelPrice[], withStatistics = false): Promise<detailDataPrices[]> {
    const fuelPrices: detailDataPrices[] = [];

    for await (const fuelPrice of prices) {
      const { fuelstationID, fuelType, price, evolution } = fuelPrice;
      let priceData: detailDataPrices;

      if (withStatistics) {
        const statistics = await this.getPriceStatistics(fuelstationID, fuelType);
        const { min, max, avg } = statistics;
        priceData = { fuelType, price, evolution, min, max, avg };
      } else {
        priceData = { fuelType, price, evolution };
      }
      fuelPrices.push(priceData);
    }
    return fuelPrices;
  }

  private static async getPriceStatistics(fuelstationID: number, fuelType: FuelTypes): Promise<FuelPriceStatisticsType> {
    const priceStatistics = new GetFuelPriceStatistics(this.dbFuelPriceRepo);
    const statistics = await priceStatistics.getStatistics(fuelstationID, fuelType);
    return statistics;
  }

  private static getDistance(fuelStation: FuelStation, app: coordinates): number {
    const fuelStationCoordinates = { lat: fuelStation.latitude, lon: fuelStation.longitude };
    const appCoordinates = { lat: app.latitude, lon: app.longitude };
    const headingDistance = headingDistanceTo(appCoordinates, fuelStationCoordinates);
    const distanceKM = parseFloat((headingDistance.distance / 1000).toFixed(2));
    return distanceKM;

  }

  private static async getGeoPoints(longitude: number, latitude: number, radius: number): Promise<geoPoint[]> {
    const fuelStationsByGeo = new GetFuelStationGeo(FuelStationsRepo.cacheFuelStationRepo);
    const geoPoints = await fuelStationsByGeo.getGeoPoints(longitude, latitude, radius);
    if(geoPoints.length === 0) throw new NotFoundException("No fuel stations found with these params");
    return geoPoints.map(point => {
      return { fuelstationID: parseInt(point[0]), distance: parseFloat(point[1]) };
    });
  }
}
