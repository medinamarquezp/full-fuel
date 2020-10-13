import { Timetables } from "@/contexts/Timetables/Domain/Timetables"

describe('Timetables domain test', () => {
   test('L-D: 24H hours it should be identified as always open', () => {
     const timetable = "L-D: 24H";
     const isAlwaysOpen = Timetables.isAlwaysOpen(timetable);
     expect(isAlwaysOpen).toBeTruthy();
   })
   test('It should display "always open" as falsy if timetable is not L-D: 24H', () => {
    const timetable = "L-D: 06:00-23:00";
    const isAlwaysOpen = Timetables.isAlwaysOpen(timetable);
    expect(isAlwaysOpen).toBeFalsy();
  })
  test('It should return an array of week days from a string input', () => {
    const days = "L-D";
    const arrayWeekDays = Timetables.parseDays(days);
    expect(arrayWeekDays).toEqual([0, 1, 2, 3, 4, 5, 6]);
  })
  test('It should display an error when passing an incorrect week day', () => {
    const day = "Z";
    const arrayWeekDays = () => Timetables.parseDays(day);
    expect(arrayWeekDays).toThrow("El formato introducido para el parseo de días no es correcto");
  })
  test('It should parse correctly monday to sunday timetable from string', () => {
    const timetable = "L-D: 06:00-23:00";
    const parsedTimetable = Timetables.timeTableFromString(timetable);
    const expectedResult = [
      { weekDay: 0, alwaysOpen: false, opening: '06:00', closing: '23:00' },
      { weekDay: 1, alwaysOpen: false, opening: '06:00', closing: '23:00' },
      { weekDay: 2, alwaysOpen: false, opening: '06:00', closing: '23:00' },
      { weekDay: 3, alwaysOpen: false, opening: '06:00', closing: '23:00' },
      { weekDay: 4, alwaysOpen: false, opening: '06:00', closing: '23:00' },
      { weekDay: 5, alwaysOpen: false, opening: '06:00', closing: '23:00' },
      { weekDay: 6, alwaysOpen: false, opening: '06:00', closing: '23:00' }
    ];
    expect(parsedTimetable).toEqual(expectedResult);
  })
  test('It should parse correctly timetables with differences between days', () => {
    const timetable = "L-X: 06:00-22:00; J-S: 06:30-21:30; D: 07:00-21:00";
    const parsedTimetable = Timetables.timeTableFromString(timetable);
    const expectedResult = [
      { weekDay: 1, alwaysOpen: false, opening: '06:00', closing: '22:00' },
      { weekDay: 2, alwaysOpen: false, opening: '06:00', closing: '22:00' },
      { weekDay: 3, alwaysOpen: false, opening: '06:00', closing: '22:00' },
      { weekDay: 4, alwaysOpen: false, opening: '06:30', closing: '21:30' },
      { weekDay: 5, alwaysOpen: false, opening: '06:30', closing: '21:30' },
      { weekDay: 6, alwaysOpen: false, opening: '06:30', closing: '21:30' },
      { weekDay: 0, alwaysOpen: false, opening: '07:00', closing: '21:00' }
    ];
    expect(parsedTimetable).toEqual(expectedResult);
  });
  test('It should display correctly opening and closing hours on part time timetables', () => {
    const timetable = "L-X: 07:00-13:00 y 16:00-20:00";
    const parsedTimetable = Timetables.timeTableFromString(timetable);
    const expectedResult = [
      { weekDay: 1, alwaysOpen: false, opening: '07:00', closing: '20:00' },
      { weekDay: 2, alwaysOpen: false, opening: '07:00', closing: '20:00' },
      { weekDay: 3, alwaysOpen: false, opening: '07:00', closing: '20:00' }
    ]
    expect(parsedTimetable).toEqual(expectedResult);
  })
})
