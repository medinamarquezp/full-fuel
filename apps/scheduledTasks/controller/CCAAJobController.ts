import { MineturEndpoints } from "@/config/MineturEndpoints";
import { FecthRestClient } from "@/sharedInfrastructure/FetchRestClient";
import { RestCCAARemoteRepo } from "@/contexts/CCAAs/Infrastructure/Remote/RestCCAARemoteRepo";
import { MysqlCCAARepo } from "@/contexts/CCAAs/Infrastructure/Persistence/MysqlCCAARepo";
import { GetCCAAsfromRemote } from "@/contexts/CCAAs/UseCases/GetCCAAsfromRemote";
import { PersistCCAAs } from "@/contexts/CCAAs/UseCases/PersistCCAAs";

export class CCAAJobController {
  static ccaaRemoteRepo = new RestCCAARemoteRepo(MineturEndpoints.CCAAList, FecthRestClient);
  static ccaaDBRepo = new MysqlCCAARepo();

  static async run(): Promise<void> {
    const fromRemote = new GetCCAAsfromRemote(this.ccaaRemoteRepo);
    const ccaaDB = new PersistCCAAs(this.ccaaDBRepo);
    const ccaas = await fromRemote.getCCAAs();
    await ccaaDB.persist(ccaas);
  }
}
