import { FuelPricesMock } from "../Mocks/FuelPrices.mock";
import { Criteria } from "@/contexts/FuelPrices/Domain/FuelPriceRepo";
import { InMemoryFuelPriceRepo } from "@/contexts/FuelPrices/Infrastructure/Persistence/InMemoryFuelPriceRepo";
import { PersistFuelPrice } from "@/contexts/FuelPrices/UseCases/PersistFuelPrice";
import { GetAllFuelPrices } from "@/contexts/FuelPrices/UseCases/GetAllFuelPrices";

describe('Persist and get fuel prices use case test', () => {
  let repo: InMemoryFuelPriceRepo, persistFuelPrice: PersistFuelPrice, getAllFuelPrices: GetAllFuelPrices;
  beforeAll(async () => {
    repo = new InMemoryFuelPriceRepo();
    persistFuelPrice = new PersistFuelPrice(repo);
    getAllFuelPrices = new GetAllFuelPrices(repo);
    for await (const fuelPrice of FuelPricesMock) {
      await persistFuelPrice.persist(fuelPrice);
    }
  })
   test('it should persist and retrieve a fuel prices list', async () => {
     const sut = await getAllFuelPrices.getAll();
     expect(sut.length).toBe(15);
     expect(sut[0].fuelstationID).toBe(2590);
   })
   test('it should get fuel prices by criteria', async () => {
    const fuelStations = await getAllFuelPrices.getByCriteria({fuelstationID: 2590} as Criteria);
    expect(fuelStations.length).toBe(6);
    expect(fuelStations[0].fuelstationID).toBe(2590);
  })
})
