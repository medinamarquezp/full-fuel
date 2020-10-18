import { FuelPricesMock } from "../Mocks/FuelPrices.mock";
import { FuelTypes } from "@/contexts/FuelPrices/Domain/FuelTypes";
import { PersistFuelPrice } from "@/contexts/FuelPrices/UseCases/PersistFuelPrice";
import { GetFuelPriceStatistics } from "@/contexts/FuelPrices/UseCases/GetFuelPriceStatistics";
import { InMemoryFuelPriceRepo } from "@/contexts/FuelPrices/Infrastructure/Persistence/InMemoryFuelPriceRepo";

describe('Get fuel price statistics use case test', () => {
  let repo: InMemoryFuelPriceRepo,
      persistFuelPrice: PersistFuelPrice,
      fuelPriceStatistics: GetFuelPriceStatistics;
  beforeAll(async () => {
    repo = new InMemoryFuelPriceRepo();
    persistFuelPrice = new PersistFuelPrice(repo);
    fuelPriceStatistics = new GetFuelPriceStatistics(repo);
    for await (const fuelPrice of FuelPricesMock) {
      await persistFuelPrice.persist(fuelPrice);
    }
  })
  test('it should display price statistics', async () => {
    const sut = await fuelPriceStatistics.getStatistics(2604, FuelTypes.GASOIL);
    expect(sut.min).toBe(1.111);
    expect(sut.max).toBe(1.118);
    expect(sut.avg).toBe(1.115);
  })
})
