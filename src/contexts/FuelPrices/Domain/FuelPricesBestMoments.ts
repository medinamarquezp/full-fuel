import { dayMoments } from "@/sharedDomain/Today";

export interface FuelPricesBestMoments {
  fuelstationID: number,
  bestDay: number,
  bestMoment: dayMoments
}
