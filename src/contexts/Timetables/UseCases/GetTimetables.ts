import { Timetables } from "../Domain/Timetables";
import { TimetablesRepo } from "../Domain/TimetablesRepo";
import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
export class GetTimetables extends BaseUseCase
{
  constructor(private repository: TimetablesRepo) { super(); }

  async getAll(): Promise<Timetables[]>
  {
    try
    {
      return await this.repository.getAll();
    } catch (err)
    {
      const error = `Error on retrieving timetables list. ${err}`;
      this.logger.error(error);
      throw new Error(error);
    }
  }

  async getByFuelstationID(fuelstationID: number): Promise<Timetables[]>
  {
    try
    {
      return await this.repository.getByFuelstationID(fuelstationID);
    } catch (err)
    {
      const error = `Error on retrieving timetables by fuelstationID ${fuelstationID}. ${err}`;
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
