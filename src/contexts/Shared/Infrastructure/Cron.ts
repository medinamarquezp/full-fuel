import cron from "node-cron";
import { execSync } from "child_process";
import { performance } from "perf_hooks";

export class Cron {

  public static task(comand: string, schedule: string): void {
    try {
      cron.schedule(schedule, () => {
        const processName = comand.split(" ")[2];
        console.log(`Init execution of process ${processName}`);
        const init = performance.now();
        this.run(comand);
        const end = performance.now();
        const totalExecutionTimeInSeconds = (end - init) / 1000;
        console.log(`Process "${processName}" executed in ${totalExecutionTimeInSeconds} seconds`);
      }, {
        scheduled: true,
        timezone: "Europe/Madrid"
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  private static run(command:string): void {
    const maxBuffer = 1024 * 1024;

    try {
      const process = execSync(command, {maxBuffer});
      console.log(process.toString());
    } catch (error) {
      console.log(`Error al ejecutar el comando "${command}". ${error}`);
    }
  }
}
