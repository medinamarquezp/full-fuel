import { Today } from "@/sharedDomain/Today";
import { Timetables } from "@/contexts/Timetables/Domain/Timetables";

export const isOpen = (isAlwaysOpen: boolean, timetables: Timetables[]): boolean => {
  if (isAlwaysOpen) return true;
  const weekDay = Today.weekDay();
  const todayTimetable = timetables.find(timetable => timetable.weekDay === weekDay);
  if(!todayTimetable) return false;
  const { opening, closing } = todayTimetable as Timetables;
  return Today.isBetween(opening, closing);
};
