import { Today } from "@/sharedDomain/Today";

export const validateJobExecutionTime = (): void => {
  const executions = [6,13,19];
  const currentHour = Today.hour();

  if (!executions.includes(currentHour)) {
    console.log(`Current hour is ${currentHour} and job should not be running.`);
    process.exit(0);
  }
};
