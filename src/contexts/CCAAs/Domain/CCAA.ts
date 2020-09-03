import { CCAAProperties } from "./CCAAProperties";

export class CCAA implements CCAAProperties
{
  externalID: string;
  name: string;

  constructor(
    externalID: string,
    name: string
  )
  {
    this.externalID = externalID;
    this.name = name;
  }

  public getExternalID(): string
  {
    return this.externalID;
  }

  public getName(): string
  {
    return this.name;
  }
}
