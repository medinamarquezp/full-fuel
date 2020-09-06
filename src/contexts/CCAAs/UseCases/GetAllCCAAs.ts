import { CCAA } from "../Domain/CCAA";
import { CCAARepo } from "../Domain/CCAARepo";
import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
export class GetAllCCAAs extends BaseUseCase
{
  constructor(private repository: CCAARepo) { super(); }

  async get(): Promise<CCAA[]>
  {
    try
    {
      return await this.repository.getAll();
    } catch (err)
    {
      const error = `Error on retrieving CCAAs list. ${err}`;
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
