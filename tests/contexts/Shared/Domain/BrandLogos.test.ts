import { BrandLogos, BrandLogo } from "@/sharedDomain/BrandLogos";

describe('Brand logos implementation test', () => {
  let brandLogos: BrandLogo[];
  beforeAll(async () => {
    brandLogos = await BrandLogos.getBrandLogos();
  })
   test('it should return a list of fuel stations brand logos', () => {
     const firstFuelStationNameAlphabetically = "agla";
     expect(brandLogos.length).toBe(23);
     expect(brandLogos[0].names[0]).toBe(firstFuelStationNameAlphabetically);
   });
   test('an-energeticos logo should be associated to two fuel station names', () => {
    const anEnergeticosData = brandLogos.find(brandLogo => brandLogo.brandImage === "an-energeticos.jpg") as BrandLogo;
    expect(anEnergeticosData.names.length).toBe(2);
    expect(anEnergeticosData.names[0]).toBe("A.N. ENERGETICOS");
    expect(anEnergeticosData.names[1]).toBe("AN ENERGETICOS");
  });
})
