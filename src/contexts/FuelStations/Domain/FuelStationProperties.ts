import { FuelPrice } from "@/contexts/FuelPrices/Domain/FuelPrice";
import { Timetables } from "@/contexts/Timetables/Domain/Timetables";

export interface FuelStationProperties {
  fuelstationID: number,
  ccaa: string,
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
  timetables: Timetables[],
  prices: FuelPrice[],
  bestDay?: number,
  bestMoment?: string,
  brandImage?: string
}
