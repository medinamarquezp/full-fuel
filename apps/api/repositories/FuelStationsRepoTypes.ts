import { FuelTypes } from "@/sharedDomain/FuelTypes";
import { FuelPriceEvolution } from "@/contexts/FuelPrices/Domain/FuelPriceEvolution";

export interface coordinates {
  longitude: number,
  latitude: number
}
export interface geoPoint {
  fuelstationID: number,
  distance: number
}
export interface listData {
  fuelstationID: number,
  name: string,
  brandImage?: string | undefined,
  distance: number,
  coordinates: coordinates,
  isNowOpen: boolean,
  fuelPrices: detailDataPrices[]
}

export interface detailDataPrices {
  fuelType: FuelTypes,
  price: number,
  evolution: FuelPriceEvolution | undefined
  min?: number,
  max?: number,
  avg?: number
}

export interface MonthlyPrice {
  day: number,
  price: number
}

export interface MonthlyPriceEvolution {
  month: number,
  g95: MonthlyPrice[],
  g98: MonthlyPrice[],
  gasoil: MonthlyPrice[]
}

export interface detailData {
  fuelstationID: number,
  name: string,
  brandImage?: string | undefined,
  address: string,
  distance: number,
  coordinates: coordinates,
  isNowOpen: boolean,
  timetable: string,
  fuelPrices: detailDataPrices[],
  monthlyPriceEvolution: MonthlyPriceEvolution,
  bestDay: number | undefined,
  bestMoment: string | undefined
}
