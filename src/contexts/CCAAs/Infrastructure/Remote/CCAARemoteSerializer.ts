import { CCAA } from "@/contexts/CCAAs/Domain/CCAA";
import { CCAARemoteProperties } from "@/contexts/CCAAs/Domain/CCAARemoteProperties";

export class CCAARemoteSerializer
{
  public static remoteToCCAA(CCAAsfromMinetur: CCAARemoteProperties[]): CCAA[]
  {
    const CCAAList = CCAAsfromMinetur.map(CCAAMinetur => new CCAA(CCAAMinetur.IDCCAA, CCAAMinetur.CCAA));
    return CCAAList;
  }
}
