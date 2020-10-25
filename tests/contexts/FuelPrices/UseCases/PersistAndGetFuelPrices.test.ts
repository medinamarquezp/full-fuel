import { FuelPricesMock } from "../Mocks/FuelPrices.mock";
import { InMemoryFuelPriceRepo } from "@/contexts/FuelPrices/Infrastructure/Persistence/InMemoryFuelPriceRepo";
import { PersistFuelPrice } from "@/contexts/FuelPrices/UseCases/PersistFuelPrice";
import { GetAllFuelPrices } from "@/contexts/FuelPrices/UseCases/GetAllFuelPrices";

describe('Persist and get fuel prices use case test', () => {
  let repo: InMemoryFuelPriceRepo, persistFuelPrice: PersistFuelPrice, getAllFuelPrices: GetAllFuelPrices;
  beforeEach(() => {
    repo = new InMemoryFuelPriceRepo();
    persistFuelPrice = new PersistFuelPrice(repo);
    getAllFuelPrices = new GetAllFuelPrices(repo);
  })
   test('it should persist and retrieve a fuel prices list', async () => {
     for await (const fuelPrice of FuelPricesMock) {
      await persistFuelPrice.persist(fuelPrice);
     }
     const sut = await getAllFuelPrices.getAll();
     expect(sut.length).toBe(15);
     expect(sut[0].fuelstationID).toBe(2590);
   })
})
