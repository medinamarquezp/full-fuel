import { FactoryLogger } from "@/sharedInfrastructure/Logger/FactoryLogger";
export class Today extends Date {
  constructor() { super(); }

  static log = FactoryLogger.getLoggerInstance(process.env.LOGGER);

  static hour(): number {
    return new Date().getHours();
  }

  static month(): number {
    return new Date().getMonth() + 1;
  }

  static year(): number {
    return new Date().getUTCFullYear();
  }

  static day(date?: Date): number {
    return (date) ? date.getDate() : new Date().getDate();
  }

  static weekDay(): number {
    return new Date().getDay();
  }

  static week(): number {
    const now = new Date();
    const oneJanuary = new Date(now.getFullYear(), 0, 1);
    const week = Math.ceil( (((now.getTime() - oneJanuary.getTime()) / 86400000) + oneJanuary.getDay() + 1) / 7 );
    return week;
  }

  static timeToString(time: Date): string {
    const minutes = time.getMinutes();
    const minutesFormated = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${time.getHours()}:${minutesFormated}`;
  }

  static getDayMoment(time: string | Date): dayMoments {
    const parsedInputTime = (typeof time === "object") ? Today.timeToString(time) : time as string;
    if (Today.isOnMorning(parsedInputTime)) return dayMoments.MORNING;
    if (Today.isOnAfternoom(parsedInputTime)) return dayMoments.AFTERNOOM;
    if (Today.isOnNight(parsedInputTime)) return dayMoments.NIGHT;
    return dayMoments.EARLYMORNING;
  }

  private static isOnMorning(parsedInputTime: string): boolean{
    const MORNING = { start: "5:59", end: "12:59" };
    const result = Today.isBetween(MORNING.start, MORNING.end, parsedInputTime);
    return result;
  }

  private static isOnAfternoom(parsedInputTime: string): boolean{
    const AFTERNOOM = { start: "12:59", end: "18:59" };
    const result = Today.isBetween(AFTERNOOM.start, AFTERNOOM.end, parsedInputTime);
    return result;
  }

  private static isOnNight(parsedInputTime: string): boolean{
    const NIGHT = { start: "18:59", end: "23:59" };
    const result = Today.isBetween(NIGHT.start, NIGHT.end, parsedInputTime);
    return result;
  }

  static getMomentNow(): dayMoments {
    const now = new Date();
    return Today.getDayMoment(now);
  }

  static isBetween(startTime: string, endTime: string, time?: string): boolean {
    if (
      !Today.isValidTimeFormat(startTime) ||
      !Today.isValidTimeFormat(endTime) ||
      time && !Today.isValidTimeFormat(time)
      ) throw new Error("Invalid time format");
    const timeToCheck = (time) ? Today.getMinutes(time) : Today.getMinutesNow();
    const start = Today.getMinutes(startTime);
    let end = Today.getMinutes(endTime);
    if (start > end) end += Today.getMinutes("24:00");
    return ((timeToCheck > start) && (timeToCheck < end));
  }

  static isValidTimeFormat(time: string): boolean {
    const timeFormatRegex = /^([0-9]|(1[0-9]|2[0-3])):([0-5][0-9])$/;
    const formattedTime = (time.startsWith("0") && !time.startsWith("0:")) ? time.slice(1, time.length) : time;
    return (formattedTime.match(timeFormatRegex)) ? true : false;
  }

  private static getMinutesNow(): number {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  }

  private static getMinutes(time: string): number {
    const timeSplited = time.split(":");
    const hours = parseInt(timeSplited[0]);
    const minutes = parseInt(timeSplited[1]);
    return hours * 60 + minutes * 1;
  }
}

export enum dayMoments {
  MORNING = "morning",
  AFTERNOOM = "afternoon",
  NIGHT = "night",
  EARLYMORNING = "early-morning"
}
