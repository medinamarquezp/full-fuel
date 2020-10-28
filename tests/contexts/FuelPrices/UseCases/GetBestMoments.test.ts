import { GetBestMoments } from "@/contexts/FuelPrices/UseCases/GetBestMoments";
import { MysqlFuelPriceRepo } from "@/contexts/FuelPrices/Infrastructure/Persistence/MysqlFuelPriceRepo";

describe('Get fuel price statistics use case test', () => {
  let repo: MysqlFuelPriceRepo,
      moments: GetBestMoments
  beforeAll(async () => {
    repo = new MysqlFuelPriceRepo();
    moments = new GetBestMoments(repo);
  })
  test.skip('it should display price statistics', async () => {
    const sut = await moments.getMoments(7100);
    console.log(sut);
  })
})
