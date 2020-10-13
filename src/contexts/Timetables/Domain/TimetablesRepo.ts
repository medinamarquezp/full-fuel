import { Timetables } from "./Timetables";

export interface TimetablesRepo {
  save(timetable: Timetables[]): Promise<void>;
  getAll(): Promise<Timetables[]>;
  getByFuelstationID(fuelstationID: number): Promise<Timetables[]>;
}
