import { CCAAListMock } from "../Mocks/CCAAList.mock"
import { PersistCCAAs } from "@/contexts/CCAAs/UseCases/PersistCCAAs";
import { GetAllCCAAs } from "@/contexts/CCAAs/UseCases/GetAllCCAAs";
import { InMemoryCCAARepo } from "@/contexts/CCAAs/Infrastructure/Persistence/InMemoryCCAARepo";

describe('Persist and get all CCAA use case', () =>
{
  let inMemory: InMemoryCCAARepo, persistCCAAs: PersistCCAAs, CCAAs: GetAllCCAAs;
  beforeEach(() =>
  {
    inMemory = new InMemoryCCAARepo();
    persistCCAAs = new PersistCCAAs(inMemory);
    CCAAs = new GetAllCCAAs(inMemory);
  })
  test('Persist and get CCAAs', async () =>
  {
    const totalCCAAs = 19;
    await persistCCAAs.persist(CCAAListMock);
    const persistedData = await CCAAs.get();
    const firstCCAA = persistedData[0];
    expect(persistedData.length).toBe(totalCCAAs);
    expect(firstCCAA.getExternalID()).toBe("01");
    expect(firstCCAA.getName()).toBe("Andalucia");
  })
})
