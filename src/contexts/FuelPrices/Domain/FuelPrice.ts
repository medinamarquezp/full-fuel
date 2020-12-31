import { FuelTypes } from "@/sharedDomain/FuelTypes";
import { FuelPriceEvolution } from "./FuelPriceEvolution";
import { FuelPriceProperties } from "./FuelPriceProperties";
import { Today, dayMoments } from "@/sharedDomain/Today";

export class FuelPrice implements FuelPriceProperties {
  public month: number;
  readonly week: number;
  readonly day: number;
  readonly weekDay: number;
  readonly hour: number;
  readonly moment: dayMoments;
  public evolution: FuelPriceEvolution | undefined;

  constructor(
    readonly fuelstationID: number,
    readonly fuelType: FuelTypes,
    readonly price: number,
    evolution?: FuelPriceEvolution | undefined
  ) {
    this.month = Today.month();
    this.week = Today.week();
    this.day = Today.day();
    this.weekDay = Today.weekDay();
    this.hour = Today.hour();
    this.moment = Today.getMomentNow();
    this.evolution = evolution;
  }

  setEvolution(evolution: FuelPriceEvolution): void {
    this.evolution = evolution;
  }

  setMonth(month: number): void {
    this.month = month;
  }

}
