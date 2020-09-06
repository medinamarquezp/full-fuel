import { CCAA } from "@/contexts/CCAAs/Domain/CCAA";
import { CCAARepo } from "@/contexts/CCAAs/Domain/CCAARepo";

export class InMemoryCCAARepo implements CCAARepo
{
  private CCAAInMemoryRepo: CCAA[] = [];
  public async save(ccaas: CCAA[]): Promise<void>
  {
    this.CCAAInMemoryRepo = ccaas;
  }
  public async getAll(): Promise<CCAA[]>
  {
    return this.CCAAInMemoryRepo;
  }
}
