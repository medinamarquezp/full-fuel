import { FuelStation } from "@/contexts/FuelStations/Domain/FuelStation";
import { FuelStationRepo } from "@/contexts/FuelStations/Domain/FuelStationRepo";

export class InMemoryFuelStationRepo implements FuelStationRepo {

  private fuelStationsStore:FuelStation[];

  constructor(fuelStations?: FuelStation[]) {
    this.fuelStationsStore = (fuelStations) ? fuelStations : [];
  }

  async save(fuelStations: FuelStation[]): Promise<void> {
    this.fuelStationsStore = fuelStations;
  }

  async update(fuelstation: FuelStation): Promise<void> {
    const { fuelstationID } = fuelstation;
    const fuelStationIndex = this.findFuelStationIndex(fuelstationID);
    this.fuelStationsStore[fuelStationIndex] = fuelstation;
  }

  async getAll(): Promise<FuelStation[]> {
    return this.fuelStationsStore;
  }

  async getByID(fuelstationID: number): Promise<FuelStation> {
    const fuelStationIndex = this.findFuelStationIndex(fuelstationID);
    return this.fuelStationsStore[fuelStationIndex];
  }

  private findFuelStationIndex(fuelstationID: number): number {
    return this.fuelStationsStore.findIndex(fuelStation => fuelStation.fuelstationID === fuelstationID);
  }
}
