import { fork } from "child_process";
import { GetAllCCAAs } from "@/contexts/CCAAs/UseCases/GetAllCCAAs";
import { MysqlCCAARepo } from "@/contexts/CCAAs/Infrastructure/Persistence/MysqlCCAARepo";

async function getRawCCAAList(): Promise<string[]> {
  const ccaas = new GetAllCCAAs(new MysqlCCAARepo());
  const ccaaList = await ccaas.get();
  const rawCCAAList = ccaaList.map(ccaa => ccaa.ccaaID);
  return rawCCAAList;
}

export async function processByCCAA (processUrl:string): Promise<string> {
  const ccaaList = await getRawCCAAList();

  try {
    for (const ccaa of ccaaList) {
      const process = fork(processUrl);
      process.send({ ccaa });

      process.on("message", message => {
        console.log(message);
      });
    }
  } catch (error) {
    throw new Error(error);
  }
  return "All processes has been executed correctly";
}
