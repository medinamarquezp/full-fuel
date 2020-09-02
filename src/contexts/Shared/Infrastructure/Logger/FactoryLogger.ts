import { Logger } from "@/sharedDomain/Logger";
import { FileLogger } from "./FileLogger";
import { ConsoleLogger } from "./ConsoleLogger";

export class FactoryLogger
{
  public static getLoggerInstance(type?: string): Logger
  {
    switch (type)
    {
      case "console":
        return ConsoleLogger;
      case "file":
        return FileLogger;
      default:
        return FileLogger;
    }
  }
}
