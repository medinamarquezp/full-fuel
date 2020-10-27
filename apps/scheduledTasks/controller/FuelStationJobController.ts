/* eslint-disable @typescript-eslint/no-explicit-any */
import { MineturEndpoints } from "@/config/MineturEndpoints";
import { FecthRestClient } from "@/sharedInfrastructure/FetchRestClient";
import { RestFuelStationRemoteRepo } from "@/contexts/FuelStations/Infrastructure/Remote/RestFuelStationRemoteRepo";
// FuelStations
import { MysqlFuelStationRepo } from "@/contexts/FuelStations/Infrastructure/Persistence/MysqlFuelStationRepo";
import { FuelStation } from "@/contexts/FuelStations/Domain/FuelStation";
import { GetFuelStationsFromRemote } from "@/contexts/FuelStations/UseCases/GetFuelStationsFromRemote";
import { PersistFuelStations } from "@/contexts/FuelStations/UseCases/PersistFuelStations";
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

export class FuelStationJobController {
  static fuelStationRemoteRepo = new RestFuelStationRemoteRepo(MineturEndpoints.FuelStatinsByIdCCAA, FecthRestClient);
  static fuelStationDBRepo = new MysqlFuelStationRepo();
  static timetablesDBRepo = new MysqlTimetablesRepo();
  static pricesDBRepo = new MysqlFuelPriceRepo();

  static async getRemoteFuelStations(ccaaID: string): Promise<FuelStation[]> {
    const fromRemote = new GetFuelStationsFromRemote(this.fuelStationRemoteRepo);
    const fuelStations = await fromRemote.getAll(ccaaID);
    return fuelStations;
  }

  static async persistFuelStations(fuelStations: FuelStation[]): Promise<void> {
    for await (const [index, fuelStation] of fuelStations.entries()) {
      const fuelStationWithBrandImage = await this.setFuelStationBrandImage(fuelStation);
      fuelStations[index] = fuelStationWithBrandImage;
    }
    const fuelStationDB = new PersistFuelStations(this.fuelStationDBRepo);
    await fuelStationDB.persist(fuelStations);
  }

  static async setFuelStationBrandImage(fuelStation: FuelStation): Promise<FuelStation> {
    const brandImage = await FuelStation.getBrandimage(fuelStation);
    fuelStation.setBrandImage(brandImage);
    return fuelStation;
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

  static async persistPrices(prices: FuelPrice[]): Promise<void> {
    const pricesDB = new PersistFuelPrice(this.pricesDBRepo);
    const priceEvolution = new GetFuelPriceEvolution(this.pricesDBRepo);

    for await (const fuelPrice of prices) {
      if (fuelPrice.price) {
        const evolution = await priceEvolution.getEvolution(fuelPrice.fuelstationID, fuelPrice.fuelType, fuelPrice.price);
        fuelPrice.setEvolution(evolution);
        await pricesDB.persist(fuelPrice);
        await this.pricesDump(fuelPrice.fuelstationID, fuelPrice.fuelType);
      }
    }
  }

  static async run(ccaaID: string): Promise<string> {
    const remoteFuelStations = await this.getRemoteFuelStations(ccaaID);
    await this.persistFuelStations(remoteFuelStations);

    for await (const fuelStation of remoteFuelStations) {
      await this.persistTimetables(fuelStation.timetables);
      await this.persistPrices(fuelStation.prices);
    }
    return `Fuel stations of CCAA ${ccaaID} has been persisted correctly`;
  }
}

process.on("message", async message => {
  const response = await FuelStationJobController.run(message.ccaa);
  (<any> process).send(response);
  process.exit();
});
