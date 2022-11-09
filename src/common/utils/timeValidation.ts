import { isLeapYear } from 'date-fns';

export function getSemesterHiredates() {
  const doubleMatchDays = [
    ['1', '28'],
    ['3', '30'],
    ['5', '30'],
    ['7', '28'],
    ['8', '30'],
    ['10', '30']
  ];

  const noMatchDays = [
    ['1', '29'],
    ['2', '31'],
    ['4', '31'],
    ['7', '29'],
    ['7', '30'],
    ['7', '31'],
    ['9', '31'],
    ['11', '31']
  ];

  let semesterHireDates = [];
  const currentDate = new Date();
  const timeInSeconds = currentDate.getTime();
  const differenceUTC = getUTCDifference();
  const currentDateTime = new Date(timeInSeconds - (differenceUTC * 60000));
  currentDateTime.setUTCHours(6, 0, 0, 0);

  let year = currentDateTime.getFullYear() - 1;
  const month = currentDateTime.getMonth();
  const day = currentDateTime.getDate();

  const found = noMatchDays.some(noMatchDay => 
    month === parseInt(noMatchDay[0]) &&
    day === parseInt(noMatchDay[1])
  );

  if (found) {
    return semesterHireDates;
  }

  while (year > 2007) {
    const dateUTC = new Date();
    const timeInSeconds = dateUTC.getTime();
    const date = new Date(timeInSeconds - (differenceUTC * 60000));
    date.setUTCHours(6, 0, 0, 0);
    date.setFullYear(year);

    const foundDoubleMatchDay = doubleMatchDays.some(doubleMatchDay => 
      month === parseInt(doubleMatchDay[0]) &&
      day === parseInt(doubleMatchDay[1])
    );

    if (foundDoubleMatchDay) {
      date.setMonth(month - 6);
      const yearDate = date.getFullYear();
      const monthDate = date.getMonth();
      const copyDate = new Date(date);

      const lastDayMonthUTC = new Date(yearDate, monthDate + 1, 0);
      const lastDayTimeInSeconds = lastDayMonthUTC.getTime();
      const lastDayMonth = new Date(lastDayTimeInSeconds - (differenceUTC * 60000));
      lastDayMonth.setUTCHours(6, 0, 0, 0);
      semesterHireDates.push(date);
      
      while (copyDate < lastDayMonth) {
        copyDate.setDate(copyDate.getDate() + 1);
        const nextDay = new Date(copyDate);
        semesterHireDates.push(nextDay);
      }
    } else {
      date.setMonth(month - 6);
      semesterHireDates.push(date);
    }

    year--;
  }  

  return semesterHireDates;
}

export function getYearlyHiredates() {
  let hireDates = [];
  const currentDate = new Date();
  const timeInSeconds = currentDate.getTime();
  const differenceUTC = getUTCDifference();
  const currentDateTime = new Date(timeInSeconds - (differenceUTC * 60000));
  currentDateTime.setUTCHours(6, 0, 0, 0);

  let year = currentDateTime.getFullYear() - 1;
  const month = currentDateTime.getMonth();
  const day = currentDateTime.getDate();

  if (month === 1 && day === 29) {
    return hireDates;
  }

  while (year > 2007) {
    const dateUTC = new Date();
    const timeInSeconds = dateUTC.getTime();
    const date = new Date(timeInSeconds - (differenceUTC * 60000));
    date.setUTCHours(6, 0, 0, 0);
    date.setFullYear(year);

    if (isLeapYear(date) && month === 1 && day === 28) {
      const dateNext = new Date(timeInSeconds - (differenceUTC * 60000));
      dateNext.setUTCHours(6, 0, 0, 0);
      dateNext.setFullYear(year);
      dateNext.setDate(dateNext.getDate() + 1);
      
      hireDates.push(date);
      hireDates.push(dateNext);
    } else {
      hireDates.push(date);
    }

    year--;
  }

  return hireDates;
}

function getUTCDifference(): number {
  const date = new Date();
  const differenceUTC = date.getTimezoneOffset();

  return differenceUTC;
}