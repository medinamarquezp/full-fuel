import { RemoteFuelStationsMock } from "../Mocks/RemoteFuelStations.mock";
import { FuelStation } from "@/contexts/FuelStations/Domain/FuelStation";
import { GetFuelStationsFromRemote } from "@/contexts/FuelStations/UseCases/GetFuelStationsFromRemote";
import { InMemoryFuelStationRemoteRepo } from "@/contexts/FuelStations/Infrastructure/Remote/InMemoryFuelStationRemoteRepo";

describe('Get fuel stations from remote use case test', () => {
  let repo: InMemoryFuelStationRemoteRepo,
      getFromRemote: GetFuelStationsFromRemote,
      sut: FuelStation[];
  beforeAll(async () => {
    repo = new InMemoryFuelStationRemoteRepo(RemoteFuelStationsMock);
    getFromRemote = new GetFuelStationsFromRemote(repo);
    sut = await getFromRemote.getAll("1234");
  })
  test('remote repository should return three elements', async () => {
    expect(sut.length).toBe(3);
  })
  test('first fuel station id should be 2590', async () => {
    expect(sut[0].fuelstationID).toBe(2590);
  })
  test('the fuel type 95 from the second fuel station should have a price of 1,209 euros', async () => {
    expect(sut[1].prices[0].price).toBe(1.209);
  })
  test('third fuel station should be always open', async () => {
    expect(sut[2].isAlwaysOpen).toBeTruthy();
  })
})
