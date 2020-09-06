import { CCAA } from "./CCAA";

export interface CCAARepo
{
  save: (ccaas: CCAA[]) => Promise<void>;
  getAll: () => Promise<CCAA[]>;
}
