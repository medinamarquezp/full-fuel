import client, { RequestInfo, RequestInit, Response } from "node-fetch";
import { FetchRestClientException } from "@/sharedExceptions/FetchRestClientException";
export class RestClient
{
  static async fetch(url: RequestInfo, options: RequestInit): Promise<Response | void>
  {
    try
    {
      const response = await client(url, options);
      const json = await response.json();
      return json;
    } catch (error)
    {
      throw new FetchRestClientException(`Error on fetching data: ${error}`);
    }
  }
}
