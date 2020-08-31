import { CCAA } from "./CCAA";

export interface CCAAMineturRepo
{
  getAll: () => Promise<CCAA[]>
}
