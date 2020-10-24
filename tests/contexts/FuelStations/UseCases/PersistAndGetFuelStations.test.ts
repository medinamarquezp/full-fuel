import { FuelStationsMock } from "../Mocks/RemoteFuelStations.mock";
import { PersistFuelStations } from "@/contexts/FuelStations/UseCases/PersistFuelStations";
import { GetFuelStations } from "@/contexts/FuelStations/UseCases/GetFuelStations";
import { InMemoryFuelStationRepo } from "@/contexts/FuelStations/Infrastructure/Persistence/InMemoryFuelStationRepo";

describe('Persist and get fuel stations use case test', () => {
  let repo: InMemoryFuelStationRepo;
  let persistFuelStations: PersistFuelStations;
  let getFuelStations: GetFuelStations;
  beforeAll(async () => {
    repo = new InMemoryFuelStationRepo();
    persistFuelStations = new PersistFuelStations(repo);
    getFuelStations = new GetFuelStations(repo);
    await persistFuelStations.persist(FuelStationsMock);
  })
  test('it should persist and get a fuel station list', async () => {
    const fuelStations = await getFuelStations.getAll();
    expect(fuelStations.length).toBe(3);
    expect(fuelStations[2].fuelstationID).toBe(13041);
  })

  test('it should get a fuel station by id', async () => {
    const fuelStation = await getFuelStations.getByID(13088);
    expect(fuelStation.fuelstationID).toBe(13088);
    expect(fuelStation.name).toBe("AUTONET&OIL");
    expect(fuelStation.prices[1].price).toBe(1.209);
  })
})
