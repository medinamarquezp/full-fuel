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
    let allCCAAs: CCAA[] = [];

    try {
      const CCAAsfromMinetur = await this.client.get<CCAARemoteProperties[]>(this.url);
      allCCAAs = CCAARemoteSerializer.remoteToCCAA(CCAAsfromMinetur);
    } catch (err) {
      throw new Error(err);
    }
    return allCCAAs;
  }

}
