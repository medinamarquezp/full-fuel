/* eslint-disable prefer-const */
import { Logger } from "@/sharedDomain/Logger";
import { WinstonLogger } from "./WinstonLogger";

export let FileLogger: Logger;

FileLogger = class
{
  private static logger()
  {
    const logsFolderPath = `${process.cwd()}/logs`;
    const loggerInstance = new WinstonLogger(logsFolderPath);
    return loggerInstance.winstonLogger(["info", "warn", "error"]);
  }

  static info(message: string): void
  {
    this.logger().info(message);
  }

  static warn(message: string): void
  {
    this.logger().warn(message);
  }

  static error(message: string): void
  {
    this.logger().error(message);
  }
};
