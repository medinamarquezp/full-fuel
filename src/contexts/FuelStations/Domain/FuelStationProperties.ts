import { FuelPrice } from "@/contexts/FuelPrices/Domain/FuelPrice";
import { Timetables } from "@/contexts/Timetables/Domain/Timetables";
import { FuelPriceOrmEntity } from "@/contexts/FuelPrices/Infrastructure/Persistence/FuelPriceOrmEntity";
import { TimetablesOrmEntity } from "@/contexts/Timetables/Infrastructure/Persistence/TimetablesOrmEntity";

export interface FuelStationProperties {
  fuelstationID: number,
  ccaaID: string,
  name: string,
  address: string,
  postalCode: string,
  province: string,
  city: string,
  town: string,
  latitude: number,
  longitude: number,
  isAlwaysOpen: boolean,
  timetable: string,
  timetables: Timetables[] | TimetablesOrmEntity[],
  prices: FuelPrice[] | FuelPriceOrmEntity[],
  bestDay?: number,
  bestMoment?: string,
  brandImage?: string
}
