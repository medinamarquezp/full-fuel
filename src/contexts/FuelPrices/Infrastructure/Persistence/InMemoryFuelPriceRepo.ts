import { FuelPrice } from "@/contexts/FuelPrices/Domain/FuelPrice";
import { FuelPricesDump } from "@/contexts/FuelPrices/Domain/FuelPricesDump";
import { FuelPriceRepo } from "@/contexts/FuelPrices/Domain/FuelPriceRepo";
import { FuelTypes } from "@/sharedDomain/FuelTypes";
import { FuelPriceEvolution } from "@/contexts/FuelPrices/Domain/FuelPriceEvolution";
import { FuelPriceStatisticsType } from "@/contexts/FuelPrices/Domain/FuelPriceStatistics";

export class InMemoryFuelPriceRepo implements FuelPriceRepo {
  private fuelPricesStore: FuelPrice[] = [];
  private pricesDumpStore: FuelPricesDump[] = [];

  async save(price: FuelPrice): Promise<void>{
    this.fuelPricesStore.push(price);
  }

  async getAll(): Promise<FuelPrice[]>{
    return this.fuelPricesStore;
  }

  async getEvolution(fuelstationID: number, fueltype: FuelTypes, price: number): Promise<FuelPriceEvolution>
  {
    const fuelPrices = this.filterPricesByFFSSIDandFuelType(fuelstationID, fueltype);
    const lastPriceRegistered = fuelPrices[fuelPrices.length - 1];
    let priceEvolution = FuelPriceEvolution.EQUALS;
    if (price > lastPriceRegistered.price) priceEvolution = FuelPriceEvolution.UP;
    if (price < lastPriceRegistered.price) priceEvolution = FuelPriceEvolution.DOWN;
    return priceEvolution;
  }

  async getPriceStatistics(fuelstationID: number, fueltype: FuelTypes): Promise<FuelPriceStatisticsType>
  {
    const fuelPrices = this.filterPricesByFFSSIDandFuelType(fuelstationID, fueltype);
    const prices = fuelPrices.map(fuelPrice => fuelPrice.price);
    const average = (arr: number[]) => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
    const fixDecimals = (value: number) => parseFloat(value.toFixed(3));
    const min = fixDecimals(Math.min(...prices));
    const max = fixDecimals(Math.max(...prices));
    const avg = fixDecimals(average(prices));
    return { min, max, avg };
  }

  async pricesDump(fuelstationID: number, fueltype: FuelTypes, priceStatistics: FuelPriceStatisticsType): Promise<void>
  {
    const fuelPriceToDump = new FuelPricesDump(fuelstationID, fueltype, priceStatistics);
    const priceIndex = this.priceDumpedIndex(fuelstationID, fueltype);
    (priceIndex >= 0) ? this.pricesDumpStore[priceIndex] = fuelPriceToDump : this.pricesDumpStore.push(fuelPriceToDump);
  }

  private priceDumpedIndex(fuelstationID: number, fueltype: FuelTypes): number {
    return this.pricesDumpStore.findIndex(priceDumped => {
      return priceDumped.fuelstationID === fuelstationID && priceDumped.fuelType === fueltype;
    });
  }

  async getPricesDump(): Promise<FuelPricesDump[]>{
    return this.pricesDumpStore;
  }

  private filterPricesByFFSSIDandFuelType(fuelstationID: number, fueltype: FuelTypes): FuelPrice[] {
    return this.fuelPricesStore.filter(fuelPrice => {
      return fuelPrice.fuelstationID === fuelstationID && fuelPrice.fuelType === fueltype;
    });
  }
}
