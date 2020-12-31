import { Today } from "@/sharedDomain/Today";
import { FuelPricesMock } from "../Mocks/FuelPrices.mock";
import { InMemoryFuelPriceRepo } from "@/contexts/FuelPrices/Infrastructure/Persistence/InMemoryFuelPriceRepo";
import { PersistFuelPrice } from "@/contexts/FuelPrices/UseCases/PersistFuelPrice";
import { GetAllFuelPrices } from "@/contexts/FuelPrices/UseCases/GetAllFuelPrices";
import { RemoveLastMonthPrices } from "@/contexts/FuelPrices/UseCases/RemoveLastMonthPrices";

describe('Persist and get fuel prices use case test', () =>
{
  let repo: InMemoryFuelPriceRepo,
      persistFuelPrice: PersistFuelPrice,
      getAllFuelPrices: GetAllFuelPrices,
      removeLastMonthPrices: RemoveLastMonthPrices;
  beforeAll(async () =>
  {
    repo = new InMemoryFuelPriceRepo();
    persistFuelPrice = new PersistFuelPrice(repo);
    getAllFuelPrices = new GetAllFuelPrices(repo);
    removeLastMonthPrices = new RemoveLastMonthPrices(repo);
    for (const [index, fuelPrice] of FuelPricesMock.entries())
    {
      if (index === 0)
      {
        const lastMonth = Today.month() - 1;
        fuelPrice.setMonth(lastMonth);
      }
      await persistFuelPrice.persist(fuelPrice);
    }
  })
  test('it should remove last month prices', async () =>
  {
    const beforeDeleteLastMonthPrices = await getAllFuelPrices.getAll();
    await removeLastMonthPrices.remove();
    const afterDeleteLastMonthPrices = await getAllFuelPrices.getAll();
    expect(afterDeleteLastMonthPrices.length).toBe(beforeDeleteLastMonthPrices.length - 1);
  })
})
