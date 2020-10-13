import { Timetables } from "@/contexts/Timetables/Domain/Timetables";
import { TimetablesRepo } from "@/contexts/Timetables/Domain/TimetablesRepo";

export class InMemoryTimetablesRepo implements TimetablesRepo
{
  private TimetablesInMemoryRepo: Timetables[] = [];
  public async save(timetables: Timetables[]): Promise<void>
  {
    this.TimetablesInMemoryRepo = timetables;
  }
  public async getAll(): Promise<Timetables[]>
  {
    return this.TimetablesInMemoryRepo;
  }
  public async getByFuelstationID(fuelstationID: number): Promise<Timetables[]>
  {
    return this.TimetablesInMemoryRepo.filter(timetable => timetable.fuelstationID === fuelstationID);
  }
}
