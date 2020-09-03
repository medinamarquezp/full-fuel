import { CCAA } from "@/contexts/CCAAs/Domain/CCAA";
import { CCAARemoteRepo } from "@/contexts/CCAAs/Domain/CCAARemoteRepo";
import { CCAARemoteProperties } from "@/contexts/CCAAs/Domain/CCAARemoteProperties";
import { RestClient } from "@/sharedDomain/RestClient";
import { CCAARemoteSerializer } from "./CCAARemoteSerializer";

export class RestCCAARemoteRepo implements CCAARemoteRepo
{
  constructor(
    private url: string,
    private client: RestClient) { }

  async getAll(): Promise<CCAA[]>
  {
    const CCAAsfromMinetur = await this.client.get<CCAARemoteProperties[]>(this.url);
    return CCAARemoteSerializer.remoteToCCAA(CCAAsfromMinetur);
  }

}
