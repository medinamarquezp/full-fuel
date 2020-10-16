import { Timetables } from "../Domain/Timetables";
import { TimetablesRepo } from "../Domain/TimetablesRepo";
import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
export class PersistTimetables extends BaseUseCase
{
  constructor(private repository: TimetablesRepo) { super(); }

  async persist(timetables: Timetables[]): Promise<void>
  {
    try
    {
      await this.repository.save(timetables);
      this.logger.info("All timetables has been persisted correctly");
    } catch (err)
    {
      this.handleError(`Error on persisting timetables. ${err}`);
    }
  }
}
