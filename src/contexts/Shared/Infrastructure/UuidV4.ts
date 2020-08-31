/* eslint-disable prefer-const */
import { uuid, isUuid } from "uuidv4";
import { Uuid } from "@/sharedDomain/Uuid";

export let UuidV4: Uuid;

UuidV4 = class
{
  static generate(): string
  {
    return uuid();
  }
  static isValid(uuid: string): boolean
  {
    return isUuid(uuid);
  }
};
