import { FuelStationsMock } from "../Mocks/RemoteFuelStations.mock";
import { PersistFuelStations } from "@/contexts/FuelStations/UseCases/PersistFuelStations";
import { GetFuelStations } from "@/contexts/FuelStations/UseCases/GetFuelStations";
import { UpdateFuelStation } from "@/contexts/FuelStations/UseCases/UpdateFuelStation";
import { InMemoryFuelStationRepo } from "@/contexts/FuelStations/Infrastructure/Persistence/InMemoryFuelStationRepo";

describe('Persist, get and update fuel stations use case test', () => {
  let repo: InMemoryFuelStationRepo,
      persistFuelStations: PersistFuelStations,
      getFuelStations: GetFuelStations,
      updateFuelStation: UpdateFuelStation;
  beforeAll(async () => {
    repo = new InMemoryFuelStationRepo();
    persistFuelStations = new PersistFuelStations(repo);
    getFuelStations = new GetFuelStations(repo);
    updateFuelStation = new UpdateFuelStation(repo);
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

  test('it should update a fuel station', async () => {
    const fuelStation = await getFuelStations.getByID(13088);
    fuelStation.setBestDay(5);
    fuelStation.setBestMoment("morning");
    fuelStation.setBrandimage("http://image.com");
    await updateFuelStation.update(fuelStation);
    const sut = await getFuelStations.getByID(13088);
    expect(sut.bestDay).toBe(5);
    expect(sut.bestMoment).toBe("morning");
    expect(sut.brandImage).toBe("http://image.com");
  })
})
