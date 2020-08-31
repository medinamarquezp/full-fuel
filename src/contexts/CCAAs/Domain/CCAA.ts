import { CCAADto } from "./CCAADto";

export class CCAA implements CCAADto
{
  uuid: string;
  externalID: string;
  name: string;

  constructor(
    uuid: string,
    externalID: string,
    name: string
  )
  {
    this.uuid = uuid;
    this.externalID = externalID;
    this.name = name;
  }

  public getUuid(): string
  {
    return this.uuid;
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
