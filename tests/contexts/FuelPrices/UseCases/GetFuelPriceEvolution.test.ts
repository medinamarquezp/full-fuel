import { FuelPricesMock } from "../Mocks/FuelPrices.mock";
import { FuelTypes } from "@/contexts/FuelPrices/Domain/FuelTypes";
import { PersistFuelPrice } from "@/contexts/FuelPrices/UseCases/PersistFuelPrice";
import { GetFuelPriceEvolution } from "@/contexts/FuelPrices/UseCases/GetFuelPriceEvolution";
import { InMemoryFuelPriceRepo } from "@/contexts/FuelPrices/Infrastructure/Persistence/InMemoryFuelPriceRepo";

describe('Get fuel price evolution use case test', () => {
  let repo: InMemoryFuelPriceRepo,
      persistFuelPrice: PersistFuelPrice,
      fuelPriceEvolution: GetFuelPriceEvolution,
      lastRegisteredPrice: number;
  beforeAll(async () => {
    repo = new InMemoryFuelPriceRepo();
    persistFuelPrice = new PersistFuelPrice(repo);
    fuelPriceEvolution = new GetFuelPriceEvolution(repo);
    lastRegisteredPrice = 1.110;
    for await (const fuelPrice of FuelPricesMock) {
      persistFuelPrice.persist(fuelPrice);
    }
  })
  test('it should display "E" as price evolution if prices are equals', async () => {
    const sut = await fuelPriceEvolution.getEvolution(2604, FuelTypes.GASOIL, lastRegisteredPrice);
    expect(sut).toBe("E");
  })
  test('it should display "U" as price evolution if new price is greater than last price registered', async () => {
    const newPrice =  lastRegisteredPrice + 1;
    const sut = await fuelPriceEvolution.getEvolution(2604, FuelTypes.GASOIL, newPrice);
    expect(sut).toBe("U");
  })
  test('it should display "D" as price evolution if new price is lower than last price registered', async () => {
    const newPrice =  lastRegisteredPrice - 1;
    const sut = await fuelPriceEvolution.getEvolution(2604, FuelTypes.GASOIL, newPrice);
    expect(sut).toBe("D");
  })
})
