import { FuelStation } from "@/contexts/FuelStations/Domain/FuelStation";
import { FuelStationRepo } from "@/contexts/FuelStations/Domain/FuelStationRepo";
import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
export class GetFuelStations extends BaseUseCase
{
  constructor(private repository: FuelStationRepo) { super(); }

  async getAll(): Promise<FuelStation[]>
  {
    let fuelStations: FuelStation[] = [];

    try
    {
      fuelStations = await this.repository.getAll();
    } catch (err)
    {
      this.handleError(`Error on retrieving fuel station list. ${err}`);
    }
    return fuelStations;
  }

  async getByID(fuelstationID: number): Promise<FuelStation> {
    let fuelStation: FuelStation | undefined;

    try {
      fuelStation = await this.repository.getByID(fuelstationID);
    } catch (err) {
      this.handleError(`Error on retrieving fuel station by ID ${fuelstationID}. ${err}`);
    }
    return fuelStation as FuelStation;
  }
}
