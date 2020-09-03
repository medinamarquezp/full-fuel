import { CCAA } from "@/contexts/CCAAs/Domain/CCAA";
import { CCAARemoteRepo } from "@/contexts/CCAAs/Domain/CCAARemoteRepo";

export class InMemoryCCAARemoteRepo implements CCAARemoteRepo
{
  constructor(private data: CCAA[]) { }

  async getAll(): Promise<CCAA[]>
  {
    return this.data;
  }
}
