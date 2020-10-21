import { CCAAProperties } from "./CCAAProperties";

export class CCAA implements CCAAProperties
{
  ccaaID: string;
  name: string;

  constructor(
    externalID: string,
    name: string
  )
  {
    this.ccaaID = externalID;
    this.name = name;
  }

  public getExternalID(): string
  {
    return this.ccaaID;
  }

  public getName(): string
  {
    return this.name;
  }
}
