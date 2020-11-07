import { FuelPricesMock } from "../Mocks/FuelPrices.mock";
import { FuelTypes } from "@/sharedDomain/FuelTypes";
import { PersistFuelPrice } from "@/contexts/FuelPrices/UseCases/PersistFuelPrice";
import { GetLastPriceUpdate } from "@/contexts/FuelPrices/UseCases/GetLastPriceUpdate";
import { InMemoryFuelPriceRepo } from "@/contexts/FuelPrices/Infrastructure/Persistence/InMemoryFuelPriceRepo";

describe('Get last price update use case test', () => {
  let repo: InMemoryFuelPriceRepo,
      persistFuelPrice: PersistFuelPrice,
      lastPriceUpdate: GetLastPriceUpdate;
  beforeAll(async () => {
    repo = new InMemoryFuelPriceRepo();
    persistFuelPrice = new PersistFuelPrice(repo);
    lastPriceUpdate = new GetLastPriceUpdate(repo);
    for await (const fuelPrice of FuelPricesMock) {
      await persistFuelPrice.persist(fuelPrice);
    }
  })
  test('it should display price statistics', async () => {
    const sut = await lastPriceUpdate.getLastPriceUpdate(2590, FuelTypes.GASOIL);
    expect(sut.length).toBe(2);
    expect(sut[0].evolution).toBe("D");
    expect(sut[1].price).toBe(1.118);
  })
})
