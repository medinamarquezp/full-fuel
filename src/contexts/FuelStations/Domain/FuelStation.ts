import { FuelStationProperties } from "./FuelStationProperties";
import { FuelPrice } from "@/contexts/FuelPrices/Domain/FuelPrice";
import { Timetables } from "@/contexts/Timetables/Domain/Timetables";

export class FuelStation implements FuelStationProperties {
  fuelstationID: number;
  ccaa: string;
  name: string;
  address: string;
  postalCode: string;
  province: string;
  city: string;
  town: string;
  latitude: number;
  longitude: number;
  isAlwaysOpen: boolean;
  timetable: string;
  timetables: Timetables[];
  prices: FuelPrice[];
  bestDay: number | undefined;
  bestMoment: string | undefined;
  brandImage: string | undefined;

  constructor (fuelstation: FuelStationProperties){
    this.fuelstationID = fuelstation.fuelstationID;
    this.ccaa = fuelstation.ccaa;
    this.name = fuelstation.name;
    this.address = fuelstation.address;
    this.postalCode = fuelstation.postalCode;
    this.province = fuelstation.province;
    this.city = fuelstation.city;
    this.town = fuelstation.town;
    this.latitude = fuelstation.latitude;
    this.longitude = fuelstation.longitude;
    this.isAlwaysOpen = fuelstation.isAlwaysOpen;
    this.timetable = fuelstation.timetable;
    this.timetables = fuelstation.timetables;
    this.prices = fuelstation.prices;
    this.bestDay = (fuelstation.bestDay) ? fuelstation.bestDay : undefined;
    this.bestMoment = (fuelstation.bestMoment) ? fuelstation.bestMoment : undefined;
    this.brandImage = (fuelstation.brandImage) ? fuelstation.brandImage : undefined;
  }

  setBestDay(bestDay: number): void {
    this.bestDay = bestDay;
  }

  setBestMoment(bestMoment: string): void {
    this.bestMoment = bestMoment;
  }

  setBrandimage(brandImage: string): void {
    this.brandImage = brandImage;
  }

}
