/* eslint-disable @typescript-eslint/ban-types */
import { classToPlain } from "class-transformer";
export class Serializer
{
  public static classToObject<C>(fromClass: C): object[]
  {
    return JSON.parse(JSON.stringify(classToPlain(fromClass)));
  }
}
