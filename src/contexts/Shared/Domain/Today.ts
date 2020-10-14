export class Today extends Date {
  constructor() { super(); }

  static hour(): number {
    return new Date().getHours();
  }

  static month(): number {
    return new Date().getMonth() + 1;
  }

  static day(): number {
    return new Date().getUTCDate();
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
    const monutesFormated = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${time.getHours()}:${monutesFormated}`;
  }

  static getDayMoment(hour: string): string {
    const MORNING = { start: "6:00", end: "12:59" };
    const AFTERNOOM = { start: "13:00", end: "18:59" };
    const NIGHT = { start: "19:00", end: "23:59" };
    if (Today.isBetween(MORNING.start, MORNING.end, hour)) return dayMoments.MORNING;
    if (Today.isBetween(AFTERNOOM.start, AFTERNOOM.end, hour)) return dayMoments.AFTERNOOM;
    if (Today.isBetween(NIGHT.start, NIGHT.end, hour)) return dayMoments.NIGHT;
    return dayMoments.EARLYMORNING;
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
    const timeFormatRegex = /^([1-9]|(1[0-9]|2[0-4])):([0-5][0-9])$/;
    return (time.match(timeFormatRegex)) ? true : false;
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

enum dayMoments {
  MORNING = "morning",
  AFTERNOOM = "afternoon",
  NIGHT = "night",
  EARLYMORNING = "early-morning"
}
