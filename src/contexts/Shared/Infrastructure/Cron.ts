import cron from "node-cron";
import { promisify } from "util";
import { exec } from "child_process";
import { performance } from "perf_hooks";
import { FactoryLogger } from "@/sharedInfrastructure/Logger/FactoryLogger";

export class Cron {
  private static execAsync = promisify(exec);
  private static log = FactoryLogger.getLoggerInstance();

  public static task(comand: string, schedule: string): void {

    try {
      cron.schedule(schedule, async () => {
        const processName = comand.split(" ")[2];
        this.log.info(`Init execution of process ${processName}`);
        const init = performance.now();
        await this.run(comand);
        const end = performance.now();
        const totalExecutionTimeInSeconds = (end - init) / 1000;
        this.log.info(`Process "${processName}" executed in ${totalExecutionTimeInSeconds} seconds`);
      }, {
        scheduled: true,
        timezone: "Europe/Madrid"
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  private static async run(command:string): Promise<void> {
    const maxBuffer = 1024 * 1024;

    try {
      const {stdout} = await this.execAsync(command, {maxBuffer});
      console.log(stdout);
    } catch (error) {
      this.log.error(`Error al ejecutar el comando "${command}". ${error}`);
    }
  }
}
