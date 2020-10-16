import { CCAA } from "../Domain/CCAA";
import { CCAARepo } from "../Domain/CCAARepo";
import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";
export class GetAllCCAAs extends BaseUseCase
{
  constructor(private repository: CCAARepo) { super(); }

  async get(): Promise<CCAA[]>
  {
    let CCAAList: CCAA[] = [];

    try
    {
      CCAAList = await this.repository.getAll();
    } catch (err)
    {
      this.handleError(`Error on retrieving CCAAs list. ${err}`);
    }
    return CCAAList;
  }
}
