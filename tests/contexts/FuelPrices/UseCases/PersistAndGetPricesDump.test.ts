import { FuelPricesMock } from "../Mocks/FuelPrices.mock";
import { InMemoryFuelPriceRepo } from "@/contexts/FuelPrices/Infrastructure/Persistence/InMemoryFuelPriceRepo";
import { PersistFuelPrice } from "@/contexts/FuelPrices/UseCases/PersistFuelPrice";
import { PricesDump } from "@/contexts/FuelPrices/UseCases/PricesDump";
import { GetPricesDump } from "@/contexts/FuelPrices/UseCases/GetPricesDump";
import { GetFuelPriceStatistics } from "@/contexts/FuelPrices/UseCases/GetFuelPriceStatistics";

describe('Persist and get fuel prices use case test', () => {
  let repo: InMemoryFuelPriceRepo,
      persistFuelPrice: PersistFuelPrice,
      pricesDump: PricesDump,
      getPricesDump: GetPricesDump,
      getPriceStatistics: GetFuelPriceStatistics;
  beforeAll(async () => {
    repo = new InMemoryFuelPriceRepo();
    persistFuelPrice = new PersistFuelPrice(repo);
    pricesDump = new PricesDump(repo);
    getPricesDump = new GetPricesDump(repo);
    getPriceStatistics = new GetFuelPriceStatistics(repo);
    for await (const fuelPrice of FuelPricesMock) {
      await persistFuelPrice.persist(fuelPrice);
    }
  })
   test('it should persist and retrieve a fuel prices list', async () => {
     for await (const fuelPrice of FuelPricesMock) {
       const { fuelstationID, fuelType } = fuelPrice;
       const statistics = await getPriceStatistics.getStatistics(fuelstationID, fuelType);
       pricesDump.dump(fuelstationID, fuelType, statistics);
     }
     const sut = await getPricesDump.getAll()
     expect(sut.length).toBe(5);
     expect(sut[0].fuelstationID).toBe(2590);
     expect(sut[0].min).toBe(1.111);
     expect(sut[0].max).toBe(1.118);
     expect(sut[0].avg).toBe(1.115);
   })
})
