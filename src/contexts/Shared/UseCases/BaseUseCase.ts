import { Logger } from "@/sharedDomain/Logger";
import { FactoryLogger } from "@/sharedInfrastructure/Logger/FactoryLogger";

export class BaseUseCase
{
  protected logger: Logger;
  private loggerType = process.env.LOGGER || "file";
  constructor()
  {
    this.logger = FactoryLogger.getLoggerInstance(this.loggerType);
  }

}
