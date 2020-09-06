import { MineturEndpoints } from "@/config/MineturEndpoints";
import { FecthRestClient } from "@/sharedInfrastructure/FetchRestClient";
import { RestCCAARemoteRepo } from "@/contexts/CCAAs/Infrastructure/Remote/RestCCAARemoteRepo";

const CCAAsEndpoint = MineturEndpoints.CCAAList;
const sut = new RestCCAARemoteRepo(CCAAsEndpoint, FecthRestClient);
describe('Fetch CCAAs from Minetur use case test', () =>
{
  test('it should return 19 CCAAs', async () =>
  {
    const allCCAAsFromMinetur = await sut.getAll();
    expect(allCCAAsFromMinetur.length).toBe(19);
  })
  test('it should return a specific CCAA', async () =>
  {
    const allCCAAsFromMinetur = await sut.getAll();
    const firstCCAA = allCCAAsFromMinetur[0];
    expect(firstCCAA.getExternalID()).toBe("01");
    expect(firstCCAA.getName()).toBe("Andalucia");
  })
})