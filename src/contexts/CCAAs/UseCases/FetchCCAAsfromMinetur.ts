import { CCAA } from "../Domain/CCAA";
import { CCAAMineturDto } from "../Domain/CCAAMineturDto";
import { CCAAMineturRepo } from "../Domain/CCAAMineturRepo";
import { RestClient } from "@/sharedDomain/RestClient";
import { BaseUseCase } from "@/sharedUseCases/BaseUseCase";

export class FetchCCAAsfromMinetur extends BaseUseCase implements CCAAMineturRepo
{
  constructor(
    private url: string,
    private client: RestClient) { super(); }

  async getAll(): Promise<CCAA[]>
  {
    const CCAAsfromMinetur = await this.client.get<CCAAMineturDto[]>(this.url);
    this.logger.info("All CCAA from Minetur has been fetched correctly");
    return this.serializeCCAAList(CCAAsfromMinetur);
  }

  private serializeCCAAList(CCAAsfromMinetur: CCAAMineturDto[]): CCAA[]
  {
    const CCAAList: CCAA[] = [];

    for (const CCAAMinetur of CCAAsfromMinetur)
    {
      const ccaa = new CCAA(CCAAMinetur.IDCCAA, CCAAMinetur.CCAA);
      CCAAList.push(ccaa);
    }
    this.logger.info("All CCAA from Minetur has been serialized correctly");
    return CCAAList;
  }

}
