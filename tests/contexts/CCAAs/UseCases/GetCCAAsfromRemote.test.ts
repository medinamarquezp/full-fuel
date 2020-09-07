import { CCAAListMock } from "../Mocks/CCAAList.mock"
import { InMemoryCCAARemoteRepo } from "@/contexts/CCAAs/Infrastructure/Remote/InMemoryCCAARemoteRepo";
import { GetCCAAsfromRemote } from "@/contexts/CCAAs/UseCases/GetCCAAsfromRemote";

describe('Get CCAAs from remote use case', () =>
{
  let InMemotyRepo: InMemoryCCAARemoteRepo, sut: GetCCAAsfromRemote;
  beforeAll(() =>
  {
    InMemotyRepo = new InMemoryCCAARemoteRepo(CCAAListMock);
    sut = new GetCCAAsfromRemote(InMemotyRepo);
  })
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
