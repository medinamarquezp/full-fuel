/* eslint-disable no-undef */
import { fork } from "child_process";
import { GetAllCCAAs } from "@/contexts/CCAAs/UseCases/GetAllCCAAs";
import { MysqlCCAARepo } from "@/contexts/CCAAs/Infrastructure/Persistence/MysqlCCAARepo";

async function getRawCCAAList(): Promise<string[]> {
  try {
    const ccaas = new GetAllCCAAs(new MysqlCCAARepo());
    const ccaaList = await ccaas.get();
    const rawCCAAList = ccaaList.map(ccaa => ccaa.ccaaID);
    return rawCCAAList;
  } catch (error) {
    throw new Error(error);
  }
}

export async function processByCCAA (processUrl:string): Promise<void> {
  try {
    const ccaaList = await getRawCCAAList();
    console.log("Process started");

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
}
