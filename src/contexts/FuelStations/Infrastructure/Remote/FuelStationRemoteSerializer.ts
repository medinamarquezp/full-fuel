import { FuelStation } from "@/contexts/FuelStations/Domain/FuelStation";
import { FuelTypes } from "@/sharedDomain/FuelTypes";
import { FuelPrice } from "@/contexts/FuelPrices/Domain/FuelPrice";
import { Timetables } from "@/contexts/Timetables/Domain/Timetables";
import { FuelStationRemoteProperties, ListaEESSPrecio } from "@/contexts/FuelStations/Domain/FuelStationRemoteProperties";

export class FuelStationRemoteSerializer
{
  public static remoteToFuelStation(fuelStationsfromMinetur: FuelStationRemoteProperties): FuelStation[]
  {
    const fuelStations = fuelStationsfromMinetur.ListaEESSPrecio.map(fs => {
      const fuelstationID = parseInt(fs.IDEESS);
      const timetables = this.getTimetables(fuelstationID, fs.Horario);
      const prices = this.getFuelPrices(fuelstationID, fs["Precio Gasolina 95 E5"], fs["Precio Gasolina 95 E5"], fs["Precio Gasoleo A"]);
      const fuelStation = this.createFuelStation(fuelstationID, fs, timetables, prices);
      return fuelStation;
    });
    return fuelStations;
  }

  private static getTimetables(fuelstationID: number, timetable: string): Timetables[] {
    const isAlwaisOpen = Timetables.isAlwaysOpen(timetable);
    return (!isAlwaisOpen) ?
                        Timetables.timetablesInstancesFromString(timetable, fuelstationID) :
                        Timetables.alwaysOpenTimetable(fuelstationID);
  }

  private static getFuelPrices(fuelstationID: number, g95: string, g98: string, gasoil: string): FuelPrice[] {
    const g95Price = parseFloat(g95);
    const g98Price = parseFloat(g98);
    const gasoilPrice = parseFloat(gasoil);
    const g95FuelPriceInstance = new FuelPrice(fuelstationID, FuelTypes.G95, g95Price);
    const g98FuelPriceInstance = new FuelPrice(fuelstationID, FuelTypes.G98, g98Price);
    const gasoilFuelPriceInstance = new FuelPrice(fuelstationID, FuelTypes.GASOIL, gasoilPrice);
    return [g95FuelPriceInstance, g98FuelPriceInstance, gasoilFuelPriceInstance];
  }

  private static createFuelStation(fuelstationID: number, fs: ListaEESSPrecio, timetables: Timetables[], prices: FuelPrice[]): FuelStation {
    return new FuelStation({
      fuelstationID,
      ccaa: fs.IDCCAA,
      name: fs["Rótulo"],
      address: fs["Dirección"],
      postalCode: fs["C.P."],
      province: fs.Provincia,
      city: fs.Localidad,
      town: fs.Municipio,
      latitude: parseFloat(fs.Latitud),
      longitude: parseFloat(fs["Longitud (WGS84)"]),
      timetable: fs.Horario,
      timetables,
      prices
    });
  }

}
