import { TimetablesProperties } from "./TimetablesProperties";

export class Timetables implements TimetablesProperties {
  fuelstationID: number | undefined;
  weekDay: number;
  alwaysOpen: boolean;
  opening: string;
  closing: string;

  constructor(timetable: TimetablesProperties) {
    this.fuelstationID = timetable.fuelstationID;
    this.weekDay = timetable.weekDay;
    this.alwaysOpen = timetable.alwaysOpen;
    this.opening = timetable.opening;
    this.closing = timetable.closing;
  }

  static isAlwaysOpen(timetable: string): boolean {
    const alwaysOpenString = "L-D: 24H";
    return timetable === alwaysOpenString;
  }

  static alwaysOpenTimetable(fuelstationID: number): Timetables[] {
    const Timetable = new this({fuelstationID, weekDay: -1, alwaysOpen: true, opening: "n/a", closing: "n/a"});
    return [Timetable];
  }

  static timetablesInstancesFromString(timetable: string, fuelstationID: number): Timetables[]
  {
    const timetables = Timetables.timeTableFromString(timetable);

    const timetablesInstances = timetables.map(timetable => {
      const { weekDay, alwaysOpen, opening, closing } = timetable;
      const timetablesIntance = new this({ fuelstationID, weekDay, alwaysOpen, opening, closing });
      return timetablesIntance;
    });
    return timetablesInstances;
  }

  static timeTableFromString(timetable: string): TimetablesProperties[] {
    const timetables: TimetablesProperties[] = [];
    const dayRanges:string[] = timetable.split("; ");

    for(const dayRange of dayRanges) {
      const daysAndHours:string[] = dayRange.split(": ");
      const days = Timetables.parseDays(daysAndHours[0]);
      const hours = Timetables.parseHours(daysAndHours[1]);
      const { opening, closing } = hours;

      if (typeof days === "object" && days.length > 1) {
        for (const day of days) {
          timetables.push({ weekDay: day, alwaysOpen: false, opening, closing });
        }
      } else {
        timetables.push({ weekDay: days as number, alwaysOpen: false, opening, closing});
      }
    }
    return timetables;
  }
  static parseDays(days: string): number|number[] {
    this.validateDaysFormat(days);
    const arrayWeekDays = ["D", "L", "M", "X", "J", "V", "S"];
    const arrayWeekDaysNumbers = [0, 1, 2, 3, 4, 5, 6];
    const splitedDays = days.split("-");
    const firstDay = splitedDays[0];
    const firstDayWeekPosition = arrayWeekDays.indexOf(firstDay);

    if (splitedDays.length > 1) {
      const lastDay = splitedDays[1];
      const lastDayWeekPosition = arrayWeekDays.indexOf(lastDay) + 1;

      if (lastDay === "D") {
        const dayRangeSundayIncluded = arrayWeekDaysNumbers.slice(firstDayWeekPosition);
        dayRangeSundayIncluded.unshift(0);
        return dayRangeSundayIncluded;
      }
      const dayRangeWithoughtSunday = arrayWeekDaysNumbers.slice(firstDayWeekPosition, lastDayWeekPosition);
      return dayRangeWithoughtSunday;
    }
    return firstDayWeekPosition;
  }

  private static validateDaysFormat(days: string)
  {
    const isValidFormat = days.match(/^([DLMXJVS]|([DLMXJVS]-[DLMXJVS]))$/g);
    if (!isValidFormat)
      throw new Error("El formato introducido para el parseo de días no es correcto");
  }

  static parseHours(hours: string): { opening: string, closing: string} {
    let opening:string;
    let closing:string;
    const isPartTime = hours.indexOf("y") > 0;

    if (isPartTime) {
      opening = hours.substr(0,5);
      closing = hours.substr(-5,5);
    }else{
      const openingClosingHours = hours.split("-");
      opening = openingClosingHours[0];
      closing = openingClosingHours[1];
    }

    return { opening, closing };
  }
}
