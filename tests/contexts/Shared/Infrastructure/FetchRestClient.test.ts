import { FecthRestClient } from '@/sharedInfrastructure/FetchRestClient';
import { DomainError } from "@/sharedDomain/DomainError";
describe('Fetch Rest Client implementation test', () =>
{
  test('it should perform a correct http get request', async () =>
  {
    const testGetRequest = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ProvinciasPorComunidad/04';
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
  }),
    test('it should display a correct structure of serialized error when http request fails', async () =>
    {
      const incorrectURL = "test";
      const expectedResponse = { "errors": [{ "message": "Error on fetching data: TypeError: Only absolute URLs are supported" }], "status": 500 };
      let error: DomainError | undefined;
      try
      {
        await FecthRestClient.fetch(incorrectURL, { method: "GET" })
      } catch (err)
      {
        error = err;
      }
      const stu = (error) ? error.serializeErrors() : "";
      expect(stu).toEqual(expectedResponse);
    })
})
