import { FuelPrice } from "@/contexts/FuelPrices/Domain/FuelPrice";
import { FuelTypes } from "@/sharedDomain/FuelTypes";
import { FuelPriceEvolution } from "@/contexts/FuelPrices/Domain/FuelPriceEvolution";

export const FuelPricesMock = [
  new FuelPrice(2590, FuelTypes.GASOIL, 1.115, FuelPriceEvolution.EQUALS),
  new FuelPrice(2590, FuelTypes.G95, 1.234, FuelPriceEvolution.EQUALS),
  new FuelPrice(13088, FuelTypes.GASOIL, 1.119, FuelPriceEvolution.EQUALS),
  new FuelPrice(13088, FuelTypes.G95, 1.239, FuelPriceEvolution.EQUALS),
  new FuelPrice(13088, FuelTypes.G98, 1.379, FuelPriceEvolution.EQUALS),

  new FuelPrice(2590, FuelTypes.GASOIL, 1.118, FuelPriceEvolution.UP),
  new FuelPrice(2590, FuelTypes.G95, 1.238, FuelPriceEvolution.UP),
  new FuelPrice(13088, FuelTypes.GASOIL, 1.128, FuelPriceEvolution.UP),
  new FuelPrice(13088, FuelTypes.G95, 1.245, FuelPriceEvolution.UP),
  new FuelPrice(13088, FuelTypes.G98, 1.385, FuelPriceEvolution.UP),

  new FuelPrice(2590, FuelTypes.GASOIL, 1.111, FuelPriceEvolution.DOWN),
  new FuelPrice(2590, FuelTypes.G95, 1.230, FuelPriceEvolution.DOWN),
  new FuelPrice(13088, FuelTypes.GASOIL, 1.120, FuelPriceEvolution.DOWN),
  new FuelPrice(13088, FuelTypes.G95, 1.230, FuelPriceEvolution.DOWN),
  new FuelPrice(13088, FuelTypes.G98, 1.375, FuelPriceEvolution.DOWN)
];
