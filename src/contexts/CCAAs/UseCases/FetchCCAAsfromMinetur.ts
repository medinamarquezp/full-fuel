import { CCAA } from "../Domain/CCAA";
import { CCAAMineturDto } from "../Domain/CCAAMineturDto";
import { CCAAMineturRepo } from "../Domain/CCAAMineturRepo";
import { Uuid } from "@/sharedDomain/Uuid";
import { Logger } from "@/sharedDomain/Logger";
import { RestClient } from "@/sharedDomain/RestClient";

export class FetchCCAAsfromMinetur implements CCAAMineturRepo
{
  constructor(
    private url: string,
    private uuid: Uuid,
    private client: RestClient,
    private logger: Logger) { }

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
      const uuid = this.uuid.generate();
      const ccaa = new CCAA(uuid, CCAAMinetur.IDCCAA, CCAAMinetur.CCAA);
      CCAAList.push(ccaa);
    }
    this.logger.info("All CCAA from Minetur has been serialized correctly");
    return CCAAList;
  }

}
