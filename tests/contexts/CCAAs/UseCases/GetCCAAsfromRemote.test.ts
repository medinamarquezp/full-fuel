import { CCAAListMock } from "../Domain/CCAAList.mock"
import { InMemoryCCAARemoteRepo } from "@/contexts/CCAAs/Infrastructure/Remote/InMemoryCCAARemoteRepo";
import { GetCCAAsfromRemote } from "@/contexts/CCAAs/UseCases/GetCCAAsfromRemote";

const InMemotyRepo = new InMemoryCCAARemoteRepo(CCAAListMock);
const sut = new GetCCAAsfromRemote(InMemotyRepo);

describe('Get CCAAs from remote use case', () =>
{
  test('it should return 19 CCAAs', async () =>
  {
    const allCCAAsFromMinetur = await sut.getCCAAs();
    expect(allCCAAsFromMinetur.length).toBe(19);
  })
  test('it should return a specific CCAA', async () =>
  {
    const allCCAAsFromMinetur = await sut.getCCAAs();
    const firstCCAA = allCCAAsFromMinetur[0];
    expect(firstCCAA.getExternalID()).toBe("01");
    expect(firstCCAA.getName()).toBe("Andalucia");
  })
})
