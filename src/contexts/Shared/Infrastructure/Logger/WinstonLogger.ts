import { TransformableInfo } from "logform";
import { createLogger, format, Logger } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
const { combine, timestamp, simple, printf } = format;

export class WinstonLogger
{
  private logsFolderPath: string;

  constructor(logsFolderPath: string)
  {
    this.logsFolderPath = logsFolderPath;
  }

  public winstonLogger(logLevels: string[]): Logger
  {
    return createLogger({
      exitOnError: false,
      format: combine(
        simple(),
        timestamp(),
        printf(info => this.logContent(info))
      ),
      transports: this.createTransportList(logLevels)
    });
  }

  private createTransportFile(level: string): DailyRotateFile
  {
    const transport = new DailyRotateFile({
      filename: `${this.logsFolderPath}/${level}-%DATE%.log`,
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "5d"
    });
    return transport;
  }

  private createTransportList(levels: string[]): DailyRotateFile[]
  {
    const transports: DailyRotateFile[] = [];

    for (const level of levels)
    {
      const transportFile = this.createTransportFile(level);
      transports.push(transportFile);
    }
    return transports;
  }

  private logContent(info: TransformableInfo): string
  {
    return `[${info.timestamp}] - ${info.level.toUpperCase()} - ${info.message}`;
  }

}
