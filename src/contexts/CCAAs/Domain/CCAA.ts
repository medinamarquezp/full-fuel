import { CCAADto } from "./CCAADto";

export class CCAA implements CCAADto
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
