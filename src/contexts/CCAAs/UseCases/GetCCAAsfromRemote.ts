import { CCAA } from "../Domain/CCAA";
import { CCAARemoteRepo } from "../Domain/CCAARemoteRepo";
import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";

export class GetCCAAsfromRemote extends BaseUseCase
{
  constructor(private remote: CCAARemoteRepo) { super(); }

  async getCCAAs(): Promise<CCAA[]>
  {
    const CCAAsfromMinetur = await this.remote.getAll();
    this.logger.info("All CCAA from remote has been fetched correctly");
    return CCAAsfromMinetur;
  }
}
