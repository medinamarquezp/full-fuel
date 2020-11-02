import { MineturEndpoints } from "@/config/MineturEndpoints";
import { FecthRestClient } from '@/sharedInfrastructure/FetchRestClient';
describe('Fetch Rest Client implementation test', () =>
{
  test('it should perform a correct http get request', async () =>
  {
    const idCCAABaleares = "04";
    const testGetRequest = MineturEndpoints.ProvinceByIdCCAA + idCCAABaleares;
    const expectedResponse = [
      {
        "IDPovincia": "07",
        "IDCCAA": "04",
        "Provincia": "BALEARS (ILLES)",
        "CCAA": "Baleares"
      }
    ];
    const stu = await FecthRestClient.get(testGetRequest)
    expect(stu).toEqual(expectedResponse)
  })
})
