import { Timetables } from "../Domain/Timetables";
import { TimetablesRepo } from "../Domain/TimetablesRepo";
import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
export class GetTimetables extends BaseUseCase
{
  constructor(private repository: TimetablesRepo) { super(); }

  async getAll(): Promise<Timetables[]>
  {
    let timetables: Timetables[] = [];

    try
    {
      timetables= await this.repository.getAll();
    } catch (err)
    {
      this.handleError(`Error on retrieving timetables list. ${err}`);
    }
    return timetables;
  }

  async getByFuelstationID(fuelstationID: number): Promise<Timetables[]>
  {
    let timetables: Timetables[] = [];

    try
    {
      timetables = await this.repository.getByFuelstationID(fuelstationID);
    } catch (err)
    {
      this.handleError(`Error on retrieving timetables by fuelstationID ${fuelstationID}. ${err}`);
    }
    return timetables;
  }
}
