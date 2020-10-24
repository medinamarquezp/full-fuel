import { FuelStation } from "@/contexts/FuelStations/Domain/FuelStation";
import { FuelStationRepo, Criteria } from "@/contexts/FuelStations/Domain/FuelStationRepo";

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

  async findByID(fuelstationID: number): Promise<FuelStation> {
    const fuelStationIndex = this.findFuelStationIndex(fuelstationID);
    return this.fuelStationsStore[fuelStationIndex];
  }

  async findByCriteria(criteria: Criteria): Promise<FuelStation[]> {
    const paramName = Object.keys(criteria)[0];
    const paramValue = Object.values(criteria)[0];
    return this.fuelStationsStore.filter(fuelStation => {
      const fs = fuelStation as unknown as { [key: string]: string };
      return fs[paramName] === paramValue;
    });
  }

  private findFuelStationIndex(fuelstationID: number): number {
    return this.fuelStationsStore.findIndex(fuelStation => fuelStation.fuelstationID === fuelstationID);
  }
}
