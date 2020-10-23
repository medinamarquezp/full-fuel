import { FuelPrice } from "@/contexts/FuelPrices/Domain/FuelPrice";
import { Timetables } from "@/contexts/Timetables/Domain/Timetables";

export interface FuelStationsProperties {
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
  timetable: string,
  timetables: Timetables[],
  prices: FuelPrice[],
  bestDay: number,
  bestMoment: string,
  brandImage: string
}
