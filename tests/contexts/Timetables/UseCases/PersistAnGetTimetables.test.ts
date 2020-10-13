import { Timetables } from "@/contexts/Timetables/Domain/Timetables";
import { PersistTimetables } from "@/contexts/Timetables/UseCases/PersistTimetables";
import { GetTimetables } from "@/contexts/Timetables/UseCases/GetTimetables";
import { InMemoryTimetablesRepo } from "@/contexts/Timetables/Infrastructure/Persistence/InMemoryTimetablesRepo";

describe('Persist and get timetables use case', () =>
{
  let inMemory: InMemoryTimetablesRepo,
      persistTimetables: PersistTimetables,
      getTimetables: GetTimetables,
      cepsaAlaior: Timetables[],
      repsolAlcudia: Timetables[];
  beforeEach(() =>
  {
    inMemory = new InMemoryTimetablesRepo();
    persistTimetables = new PersistTimetables(inMemory);
    getTimetables = new GetTimetables(inMemory);
    cepsaAlaior = Timetables.timetablesInstancesFromString("L: 07:00-21:00", 2590);
    repsolAlcudia = Timetables.timetablesInstancesFromString("L-D: 07:00-19:00", 2733);
  })
  test('Persist and get all timetables', async () =>
  {
    await inMemory.save([...cepsaAlaior, ...repsolAlcudia]);
    const allTimetables = await inMemory.getAll();
    expect(allTimetables.length).toBe(8);
    expect(allTimetables[0].fuelstationID).toBe(2590);
    expect(allTimetables[1].fuelstationID).toBe(2733);
  })
  test('Persist and get timetables by fuel station ID', async () => {
    await inMemory.save([...cepsaAlaior, ...repsolAlcudia]);
    const repsolAlcudiatimetables = await inMemory.getByFuelstationID(2733);
    expect(repsolAlcudiatimetables.length).toBe(7);
    expect(repsolAlcudiatimetables[0].fuelstationID).toBe(2733);
    expect(repsolAlcudiatimetables[0].weekDay).toBe(0);
    expect(repsolAlcudiatimetables[0].alwaysOpen).toBeFalsy();
    expect(repsolAlcudiatimetables[0].opening).toBe("07:00");
    expect(repsolAlcudiatimetables[0].closing).toBe("19:00");
  })
})
