import { FuelStation } from "@/contexts/FuelStations/Domain/FuelStation";
import { FuelStationRepo } from "@/contexts/FuelStations/Domain/FuelStationRepo";
import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
export class UpdateFuelStation extends BaseUseCase
{
  constructor(private repository: FuelStationRepo) { super(); }

  async update(fuelStation: FuelStation): Promise<void>
  {
    try
    {
      await this.repository.update(fuelStation);
      this.logger.info(`Fuel station ${fuelStation.fuelstationID} has been updated correctly`);
    } catch (err)
    {
      this.handleError(`Error on updating fuel station ${fuelStation.fuelstationID}. ${err}`);
    }
  }
}
