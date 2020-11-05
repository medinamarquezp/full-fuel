import { FuelPricesMock } from "../Mocks/FuelPrices.mock";
import { FuelTypes } from "@/sharedDomain/FuelTypes";
import { PersistFuelPrice } from "@/contexts/FuelPrices/UseCases/PersistFuelPrice";
import { IsPriceAvailable } from "@/contexts/FuelPrices/UseCases/IsPriceAvailable";
import { InMemoryFuelPriceRepo } from "@/contexts/FuelPrices/Infrastructure/Persistence/InMemoryFuelPriceRepo";

describe('Is price available use case test', () => {
  let repo: InMemoryFuelPriceRepo,
      persistFuelPrice: PersistFuelPrice,
      isPriceAvailable: IsPriceAvailable;
  beforeAll(async () => {
    repo = new InMemoryFuelPriceRepo();
    persistFuelPrice = new PersistFuelPrice(repo);
    isPriceAvailable = new IsPriceAvailable(repo);
    for await (const fuelPrice of FuelPricesMock) {
      await persistFuelPrice.persist(fuelPrice);
    }
  })
  test('it should return true is price is available', async () => {
    const sut = await isPriceAvailable.check(13088, FuelTypes.G95);
    expect(sut).toBeTruthy();
  })
  test('it should return false is price is not available', async () => {
    const sut = await isPriceAvailable.check(123456789, FuelTypes.G95);
    expect(sut).toBeFalsy();
  })
})
