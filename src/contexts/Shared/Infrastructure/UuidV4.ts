/* eslint-disable prefer-const */
import { v4, validate } from "uuid";
import { Uuid } from "@/sharedDomain/Uuid";

export let UuidV4: Uuid;

UuidV4 = class
{
  static generate(): string
  {
    return v4();
  }
  static isValid(uuid: string): boolean
  {
    return validate(uuid);
  }
};
