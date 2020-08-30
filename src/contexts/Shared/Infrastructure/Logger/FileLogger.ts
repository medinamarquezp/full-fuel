/* eslint-disable prefer-const */
import { Logger } from "@/sharedDomain/Logger";
import { createLogger, format, transports } from "winston";

const logsFolderPath = `${process.cwd()}/logs`;
const { combine, timestamp, simple, printf } = format;

export let FileLogger: Logger;

FileLogger = class
{
  private static logger = createLogger({
    exitOnError: false,
    format: combine(
      simple(),
      timestamp(),
      printf(info => `[${info.timestamp}] (${__filename.split(/[\\/]/).pop()}) - ${info.level.toUpperCase()} - ${info.message}`)
    ),
    transports: [
      new transports.File({ filename: `${logsFolderPath}/info.log`, level: "info" }),
      new transports.File({ filename: `${logsFolderPath}/warn.log`, level: "warn" }),
      new transports.File({ filename: `${logsFolderPath}/error.log`, level: "error" })
    ]
  })

  static info(message: string): void
  {
    this.logger.info(message);
  }

  static warn(message: string): void
  {
    this.logger.warn(message);
  }

  static error(message: string): void
  {
    this.logger.error(message);
  }
};
