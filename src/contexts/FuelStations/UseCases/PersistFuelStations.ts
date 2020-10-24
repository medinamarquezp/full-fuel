import { FuelStation } from "@/contexts/FuelStations/Domain/FuelStation";
import { FuelStationRepo } from "@/contexts/FuelStations/Domain/FuelStationRepo";
import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
export class PersistFuelStations extends BaseUseCase
{
  constructor(private repository: FuelStationRepo) { super(); }

  async persist(fuelStations: FuelStation[]): Promise<void>
  {
    try
    {
      await this.repository.save(fuelStations);
      this.logger.info("All fuel stations has been persisted correctly");
    } catch (err)
    {
      this.handleError(`Error on persisting fuel stations. ${err}`);
    }
  }
}
