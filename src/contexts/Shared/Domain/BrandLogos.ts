import { readdir } from "fs";
import { promisify } from "util";
import { resolve, join } from "path";

export class BrandLogos{
  private static rootDir = resolve(process.cwd());
  private static brandImagesURL = join(BrandLogos.rootDir, "src", "static", "images");
  private static readdirAsync = promisify(readdir);

  static async getBrandLogos(): Promise<BrandLogo[]> {
    const logos = await this.readdirAsync(this.brandImagesURL);
    const specialBrandNames = this.specialBrandNames();
    const brandLogos: BrandLogo[] = [];

    for (const logo of logos) {
      const logoName = logo.split(".")[0];

      if(specialBrandNames.has(logoName)) {
        brandLogos.push({names: specialBrandNames.get(logoName) as string[], brandImage: logo});
      } else {
        brandLogos.push({names: [logoName], brandImage: logo});
      }
    }
    return brandLogos;
  }

  private static specialBrandNames(): Map<string, string[]> {
    const brandNames = new Map();
    brandNames.set("an-energeticos", ["A.N. ENERGETICOS", "AN ENERGETICOS"]);
    brandNames.set("petrol&go", ["PETROL & GO"]);
    return brandNames;
  }

}

export interface BrandLogo {
  names: string[];
  brandImage: string;
}
