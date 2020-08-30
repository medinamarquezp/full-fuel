import { TransformableInfo } from "logform";
import { createLogger, format, transports, Logger } from "winston";
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

  private createTransportFile(level: string): transports.FileTransportInstance
  {
    return new transports.File({ filename: `${this.logsFolderPath}/${level}.log`, level: `${level}` });
  }

  private createTransportList(levels: string[]): transports.FileTransportInstance[]
  {
    const transports: transports.FileTransportInstance[] = [];

    for (const level of levels)
    {
      const transportFile = this.createTransportFile(level);
      transports.push(transportFile);
    }
    return transports;
  }

  private logContent(info: TransformableInfo): string
  {
    return `[${info.timestamp}] (${__filename.split(/[\\/]/).pop()}) - ${info.level.toUpperCase()} - ${info.message}`;
  }

}
