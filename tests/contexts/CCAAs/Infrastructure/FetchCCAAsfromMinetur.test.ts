import { MineturEndpoints } from "@/config/MineturEndpoints";
import { UuidV4 } from "@/sharedInfrastructure/UuidV4";
import { FileLogger } from "@/sharedInfrastructure/Logger/FileLogger";
import { FecthRestClient } from "@/sharedInfrastructure/FetchRestClient";
import { FetchCCAAsfromMinetur } from "@/contexts/CCAAs/UseCases/FetchCCAAsfromMinetur";

const CCAAsEndpoint = MineturEndpoints.CCAAList;
const sut = new FetchCCAAsfromMinetur(CCAAsEndpoint, UuidV4, FecthRestClient, FileLogger);
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
