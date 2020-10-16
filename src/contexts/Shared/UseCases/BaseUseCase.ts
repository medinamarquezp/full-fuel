import { Logger } from "@/sharedDomain/Logger";
import { FactoryLogger } from "@/sharedInfrastructure/Logger/FactoryLogger";

export class BaseUseCase
{
  protected logger: Logger;
  private loggerType = process.env.LOGGER;
  constructor()
  {
    this.logger = FactoryLogger.getLoggerInstance(this.loggerType);
  }

  handleError(errorMessage: string): void {
    this.logger.error(errorMessage);
    throw new Error(errorMessage);
  }

}
