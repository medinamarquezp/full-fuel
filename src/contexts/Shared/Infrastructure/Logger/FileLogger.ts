/* eslint-disable prefer-const */
import { Logger } from "@/sharedDomain/Logger";
import { WinstonLogger } from "./WinstonLogger";
import { resolve, join } from "path";

export let FileLogger: Logger;

FileLogger = class
{
  private static logger()
  {
    const rootDir = resolve(process.cwd());
    const logsFolderPath = join(rootDir, "logs");
    const loggerInstance = new WinstonLogger(logsFolderPath);
    return loggerInstance.winstonLogger(["info", "error"]);
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
