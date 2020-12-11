/* eslint-disable @typescript-eslint/no-explicit-any */
import { FuelStationJobController } from "./FuelStationJobController";
// FuelStations
import { FuelStation } from "@/contexts/FuelStations/Domain/FuelStation";
import { SetFuelStationGeo } from "@/contexts/FuelStations/UseCases/SetFuelStationGeo";
import { CacheFuelStationRepo } from "@/contexts/FuelStations/Infrastructure/Persistence/CacheFuelStationRepo";
// Prices
import { FuelPrice } from "@/contexts/FuelPrices/Domain/FuelPrice";
import { GetFuelPriceEvolution } from "@/contexts/FuelPrices/UseCases/GetFuelPriceEvolution";
import { AddFuelStationToCache } from "@/contexts/FuelStations/UseCases/AddFuelStationToCache";
import { MysqlFuelPriceRepo } from "@/contexts/FuelPrices/Infrastructure/Persistence/MysqlFuelPriceRepo";

export class CacheJobController {
  static fuelStationCacheRepo = new CacheFuelStationRepo();
  static pricesDBRepo = new MysqlFuelPriceRepo();

  static async setBrandAndMoments(fuelStation: FuelStation): Promise<FuelStation>{
    let updatedFuelStation = await FuelStationJobController.setFuelStationBrandImage(fuelStation);
    updatedFuelStation = await FuelStationJobController.setBestMoments(fuelStation);
    return updatedFuelStation;
  }

  static async setEvolution(prices: FuelPrice[]): Promise<FuelPrice[]> {
    const priceEvolution = new GetFuelPriceEvolution(this.pricesDBRepo);
    const updatedPrices: FuelPrice[] = [];

    for await (const fuelPrice of prices) {
      if (fuelPrice.price) {
        const evolution = await priceEvolution.getEvolution(fuelPrice.fuelstationID, fuelPrice.fuelType, fuelPrice.price);
        fuelPrice.setEvolution(evolution);
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
    const remoteFuelStations = await FuelStationJobController.getRemoteFuelStations(ccaaID);

    for await (const fuelStation of remoteFuelStations) {
      const updatedPrices = await this.setEvolution(fuelStation.prices);
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
  const response = await CacheJobController.run(message.ccaa);
  (<any> process).send(response);
  process.exit();
});
