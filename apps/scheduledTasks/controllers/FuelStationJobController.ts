/* eslint-disable @typescript-eslint/no-explicit-any */
import { MineturEndpoints } from "@/config/MineturEndpoints";
import { FecthRestClient } from "@/sharedInfrastructure/FetchRestClient";
import { RestFuelStationRemoteRepo } from "@/contexts/FuelStations/Infrastructure/Remote/RestFuelStationRemoteRepo";
// FuelStations
import { MysqlFuelStationRepo } from "@/contexts/FuelStations/Infrastructure/Persistence/MysqlFuelStationRepo";
import { FuelStation } from "@/contexts/FuelStations/Domain/FuelStation";
import { GetFuelStationsFromRemote } from "@/contexts/FuelStations/UseCases/GetFuelStationsFromRemote";
import { PersistFuelStations } from "@/contexts/FuelStations/UseCases/PersistFuelStations";
import { UpdateFuelStation } from "@/contexts/FuelStations/UseCases/UpdateFuelStation";
import { SetFuelStationGeo } from "@/contexts/FuelStations/UseCases/SetFuelStationGeo";
import { CacheFuelStationRepo } from "@/contexts/FuelStations/Infrastructure/Persistence/CacheFuelStationRepo";
// Timetables
import { MysqlTimetablesRepo } from "@/contexts/Timetables/Infrastructure/Persistence/MysqlTimetablesRepo";
import { Timetables } from "@/contexts/Timetables/Domain/Timetables";
import { PersistTimetables } from "@/contexts/Timetables/UseCases/PersistTimetables";
// Prices
import { MysqlFuelPriceRepo } from "@/contexts/FuelPrices/Infrastructure/Persistence/MysqlFuelPriceRepo";
import { FuelPrice } from "@/contexts/FuelPrices/Domain/FuelPrice";
import { PersistFuelPrice } from "@/contexts/FuelPrices/UseCases/PersistFuelPrice";
import { GetFuelPriceEvolution } from "@/contexts/FuelPrices/UseCases/GetFuelPriceEvolution";
import { GetFuelPriceStatistics } from "@/contexts/FuelPrices/UseCases/GetFuelPriceStatistics";
import { FuelTypes } from "@/sharedDomain/FuelTypes";
import { PricesDump } from "@/contexts/FuelPrices/UseCases/PricesDump";
import { GetBestMoments } from "@/contexts/FuelPrices/UseCases/GetBestMoments";
import { AddFuelStationToCache } from "@/contexts/FuelStations/UseCases/AddFuelStationToCache";

export class FuelStationJobController {
  static fuelStationRemoteRepo = new RestFuelStationRemoteRepo(MineturEndpoints.FuelStatinsByIdCCAA, FecthRestClient);
  static fuelStationDBRepo = new MysqlFuelStationRepo();
  static fuelStationCacheRepo = new CacheFuelStationRepo();
  static timetablesDBRepo = new MysqlTimetablesRepo();
  static pricesDBRepo = new MysqlFuelPriceRepo();

  static async getRemoteFuelStations(ccaaID: string): Promise<FuelStation[]> {
    let retries = 5;
    let fuelStations = [];
    const fromRemote = new GetFuelStationsFromRemote(this.fuelStationRemoteRepo);

    do{
      fuelStations = await fromRemote.getAll(ccaaID);
      if(fuelStations.length) break;
      retries--;
      console.log(`${retries} retries pending for CCAA ${ccaaID}`);
    } while(retries > 0);
    if (!fuelStations.length) throw new Error(`Max retries reached with no results from remote server for CCAA ${ccaaID}`);
    return fuelStations;
  }

  static async persistFuelStations(fuelStations: FuelStation[]): Promise<void> {
    const fuelStationDB = new PersistFuelStations(this.fuelStationDBRepo);
    await fuelStationDB.persist(fuelStations);
  }

  static async setFuelStationBrandImage(fuelStation: FuelStation): Promise<FuelStation> {
    const brandImage = await FuelStation.getBrandimage(fuelStation);
    fuelStation.setBrandImage(brandImage);
    return fuelStation;
  }

  static async setBestMoments(fuelStation: FuelStation): Promise<FuelStation> {
    const moments = new GetBestMoments(this.pricesDBRepo);
    const bestMoments = await moments.getMoments(fuelStation.fuelstationID);
    fuelStation.setBestDay(bestMoments.bestDay);
    fuelStation.setBestMoment(bestMoments.bestMoment);
    return fuelStation;
  }

  static async setBrandAndMoments(fuelStation: FuelStation): Promise<FuelStation>{
    const updateFuelStation = new UpdateFuelStation(this.fuelStationDBRepo);
    let updatedFuelStation = await this.setFuelStationBrandImage(fuelStation);
    updatedFuelStation = await this.setBestMoments(fuelStation);
    await updateFuelStation.update(updatedFuelStation);
    return updatedFuelStation;
  }

  static async persistTimetables(timetables: Timetables[]): Promise<void> {
    const timetablesDB = new PersistTimetables(this.timetablesDBRepo);
    await timetablesDB.persist(timetables);
  }

  static async pricesDump(fuelstationID: number, fuelType: FuelTypes): Promise<void> {
    const statistics = new GetFuelPriceStatistics(this.pricesDBRepo);
    const pricesDump = new PricesDump(this.pricesDBRepo);
    const priceStatistics = await statistics.getStatistics(fuelstationID, fuelType);
    await pricesDump.dump(fuelstationID, fuelType, priceStatistics);
  }

  static async persistPrices(prices: FuelPrice[]): Promise<FuelPrice[]> {
    const pricesDB = new PersistFuelPrice(this.pricesDBRepo);
    const priceEvolution = new GetFuelPriceEvolution(this.pricesDBRepo);
    const updatedPrices: FuelPrice[] = [];

    for await (const fuelPrice of prices) {
      if (fuelPrice.price) {
        const evolution = await priceEvolution.getEvolution(fuelPrice.fuelstationID, fuelPrice.fuelType, fuelPrice.price);
        fuelPrice.setEvolution(evolution);
        await pricesDB.persist(fuelPrice);
        await this.pricesDump(fuelPrice.fuelstationID, fuelPrice.fuelType);
        updatedPrices.push(fuelPrice);
      }
    }
    return updatedPrices;
  }

  static async cacheGeoData(longitude: number, latitude: number, fuelstationID: number): Promise<void> {
    const fuelStationGeo = new SetFuelStationGeo(this.fuelStationCacheRepo);
    await fuelStationGeo.setGeoPoint(longitude, latitude, fuelstationID);
  }

  static async cacheFuelStation(fuelstationID: number, fuelstation: FuelStation): Promise<void> {
    const fuelStationCache = new AddFuelStationToCache(this.fuelStationCacheRepo);
    await fuelStationCache.addToCache(fuelstationID, fuelstation);
  }

  static async run(ccaaID: string): Promise<string> {
    const remoteFuelStations = await this.getRemoteFuelStations(ccaaID);
    await this.persistFuelStations(remoteFuelStations);

    for await (const fuelStation of remoteFuelStations) {
      await this.persistTimetables(fuelStation.timetables);
      const updatedPrices = await this.persistPrices(fuelStation.prices);
      const updatedFuelStation = await this.setBrandAndMoments(fuelStation);
      updatedFuelStation.prices = updatedPrices;
      await this.cacheGeoData(updatedFuelStation.longitude, updatedFuelStation.latitude, updatedFuelStation.fuelstationID);
      await this.cacheFuelStation(updatedFuelStation.fuelstationID, updatedFuelStation);
    }
    return `Fuel stations of CCAA ${ccaaID} has been persisted correctly`;
  }
}

process.on("unhandledRejection", err => {
  console.error(`Error: ${err}`);
  process.exit(1);
});

process.on("message", async message => {
  const response = await FuelStationJobController.run(message.ccaa);
  (<any> process).send(response);
  process.exit();
});
