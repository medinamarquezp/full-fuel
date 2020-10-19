import { FuelTypes } from "@/sharedDomain/FuelTypes";
import { FuelPriceEvolution } from "./FuelPriceEvolution";
import { FuelPriceProperties } from "./FuelPriceProperties";
import { Today, dayMoments } from "@/sharedDomain/Today";

export class FuelPrice implements FuelPriceProperties {
  readonly month: number;
  readonly week: number;
  readonly day: number;
  readonly weekDay: number;
  readonly hour: number;
  readonly moment: dayMoments;

  constructor(
    readonly fuelstationID: number,
    readonly fuelType: FuelTypes,
    readonly price: number,
    readonly evolution: FuelPriceEvolution
  ) {
    this.month = Today.month();
    this.week = Today.week();
    this.day = Today.day();
    this.weekDay = Today.weekDay();
    this.hour = Today.hour();
    this.moment = Today.getMomentNow();
  }

}
