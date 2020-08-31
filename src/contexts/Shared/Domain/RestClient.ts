import { RequestInfo, RequestInit } from "node-fetch";

export interface RestClient
{
  fetch<T>(url: RequestInfo, options?: RequestInit): Promise<T>;
  get<T>(url: RequestInfo, options?: RequestInit): Promise<T>;
}
