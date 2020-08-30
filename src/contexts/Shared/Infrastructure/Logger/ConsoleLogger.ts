/* eslint-disable prefer-const */
import { Logger } from "@/sharedDomain/Logger";

export let ConsoleLogger: Logger;

ConsoleLogger = class
{
  private static content(level: string, message: string): string
  {
    const moment = new Date().toISOString();
    const filename = __filename.split(/[\\/]/).pop();
    return `[${moment}] (${filename}) - ${level.toUpperCase()} - ${message}`;
  }

  static info(message: string): void
  {
    console.log(this.content("info", message));
  }

  static warn(message: string): void
  {
    console.log(this.content("warning", message));
  }

  static error(message: string): void
  {
    console.log(this.content("error", message));
  }
};
