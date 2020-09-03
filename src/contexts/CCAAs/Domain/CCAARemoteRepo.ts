import { CCAA } from "./CCAA";

export interface CCAARemoteRepo
{
  getAll: () => Promise<CCAA[]>
}
