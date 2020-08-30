import { RequestInfo, RequestInit, Response } from "node-fetch";

export interface RestClient
{
  fetch: (url: RequestInfo, options?: RequestInit) => Promise<Response | void>;
  get: (url: RequestInfo, options?: RequestInit) => Promise<Response | void>;
}
