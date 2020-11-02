import { Today } from "@/sharedDomain/Today";

describe('Today implementation test', () => {
  let dateTime: Date;
  beforeEach(() => {
    dateTime = new Date(2020,10,14,22,0,0);
  })
  test("it should display correct day is hour is equal or greater than 0 AM", () => {
    const date = new Date("2020-10-29 0:00");
    const sut = Today.day(date);
    expect(sut).toBe(29);
  });
  test('it should display the time in text format', () => {
    const sut = Today.timeToString(dateTime);
    expect(sut).toBe("22:00");
  });
   test('it should return "night" as day moment on sending a text parameter', () => {
     const time = Today.timeToString(dateTime);
     const sut = Today.getDayMoment(time);
     expect(sut).toBe("night");
   })
   test('it should return "night" as day moment on sending a date parameter', () => {
    const sut = Today.getDayMoment(dateTime);
    expect(sut).toBe("night");
  })
   test('it should display an error when sending invalid params to isBetween method', () => {
     const sut = () => Today.isBetween("24:11","2:23");
     expect(sut).toThrow("Invalid time format");
   })
   test('it should validate if time is between a range', () => {
     const time = Today.timeToString(dateTime);
     const sut = Today.isBetween("14:00", "0:59", time);
     expect(sut).toBeTruthy();
   })
})
