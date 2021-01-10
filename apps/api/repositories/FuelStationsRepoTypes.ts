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
  fuelPrices: fuelPrices[]
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
  fuelPrices: fuelPrices[],
  bestDay: number | undefined,
  bestMoment: string | undefined
}

export interface fuelPrices {
  fuelType: FuelTypes,
  price: number,
  evolution: FuelPriceEvolution | undefined,
  min?: number | undefined,
  max?: number | undefined,
  avg?: number | undefined,
  monthlyPriceEvolution?: MonthlyPriceEvolution | undefined
}

export interface MonthlyPriceEvolution {
  month: number,
  year: number,
  prices: MonthlyPrice[]
}
export interface MonthlyPrice {
  day: number,
  price: number
}

export interface MonthlyPriceFuelTypes {
  g95: MonthlyPrice[],
  g98: MonthlyPrice[],
  gasoil: MonthlyPrice[]
}
