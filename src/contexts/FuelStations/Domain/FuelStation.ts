import { FuelStationsProperties } from "./FuelStationProperties";
import { FuelPrice } from "@/contexts/FuelPrices/Domain/FuelPrice";
import { Timetables } from "@/contexts/Timetables/Domain/Timetables";

export class FuelStation implements FuelStationsProperties {
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
  timetable: string;
  timetables: Timetables[];
  prices: FuelPrice[];
  bestDay: number;
  bestMoment: string;
  brandImage: string;

  constructor (fuelstation: FuelStationsProperties){
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
    this.timetable = fuelstation.timetable;
    this.timetables = fuelstation.timetables;
    this.prices = fuelstation.prices;
    this.bestDay = fuelstation.bestDay;
    this.bestMoment = fuelstation.bestMoment;
    this.brandImage = fuelstation.brandImage;
  }

}
