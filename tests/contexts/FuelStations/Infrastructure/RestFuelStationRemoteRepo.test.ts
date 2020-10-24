import { MineturEndpoints } from "@/config/MineturEndpoints";
import { FecthRestClient } from "@/sharedInfrastructure/FetchRestClient";
import { FuelStation } from "@/contexts/FuelStations/Domain/FuelStation";
import { RestFuelStationRemoteRepo } from "@/contexts/FuelStations/Infrastructure/Remote/RestFuelStationRemoteRepo";

describe('Fetch fuel stations from Minetur test', () =>
{
  let restFromRemote: RestFuelStationRemoteRepo, sut: FuelStation[];
  beforeAll(async () =>
  {
    restFromRemote = new RestFuelStationRemoteRepo(MineturEndpoints.FuelStatinsByIdCCAA, FecthRestClient);
    sut = await restFromRemote.getFuelStationsByCCAA("04");
  })
  test('it should return fuel stations from baleares', async () =>
  {
    const firstFuelStation = sut[0];
    expect(firstFuelStation.ccaaID).toBe("04");
    expect(firstFuelStation.province).toBe("BALEARS (ILLES)");
  })
})
