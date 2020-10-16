import { CCAA } from "../Domain/CCAA";
import { CCAARepo } from "../Domain/CCAARepo";
import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
export class PersistCCAAs extends BaseUseCase
{
  constructor(private repository: CCAARepo) { super(); }

  async persist(ccaas: CCAA[]): Promise<void>
  {
    try
    {
      await this.repository.save(ccaas);
      this.logger.info("All CCAAs has been persisted correctly");
    } catch (err)
    {
      this.handleError(`Error on persisting CCAAs. ${err}`);
    }
  }
}
