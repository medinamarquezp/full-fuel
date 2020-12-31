import { Today } from "@/sharedDomain/Today";

export const validateFirstDayOfMonth = (): void => {
  const day = Today.day();
  const hour = Today.hour();

  if (day !== 1) {
    console.log("Today is not first day of month.");
    process.exit(0);
  } else {
    if (hour > 8) {
      console.log("Current hour is greater than 8 o'clock, process should have been executed.");
      process.exit(0);
    }
  }
};
