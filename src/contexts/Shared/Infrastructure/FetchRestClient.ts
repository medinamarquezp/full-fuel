/* eslint-disable prefer-const */
import client, { RequestInfo, RequestInit } from "node-fetch";
import { RestClient } from "@/sharedDomain/RestClient";
import { FetchRestClientException } from "@/sharedExceptions/FetchRestClientException";

export let FecthRestClient: RestClient;

FecthRestClient = class
{
  static async fetch<T>(url: RequestInfo, options?: RequestInit): Promise<T>
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
  static async get<T>(url: RequestInfo, options?: RequestInit): Promise<T>
  {
    (options) ? options.method = "GET" : { method: "GET" };
    const json = await FecthRestClient.fetch<T>(url, options);
    return json;
  }
};
