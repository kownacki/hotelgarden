export class PromiseTrigger {
  promise: Promise<unknown>;
  // @ts-ignore
  resolve: (value?: unknown) => void;
  constructor() {
    this.promise = new Promise((resolve) => this.resolve = resolve);
  }
}

// In Poland
export const getTodayDate = () => {
  const dateNow = new Date();
  const locale = 'pl-PL';
  const timeZone = 'Europe/Warsaw'
  const year = dateNow.toLocaleString(locale, {year: 'numeric', timeZone});
  const month = dateNow.toLocaleString(locale, {month: '2-digit', timeZone});
  const day = dateNow.toLocaleString(locale, {day: '2-digit', timeZone});

  return `${year}-${month}-${day}`;
}

export const isDateSame = (date1: string, date2: string) => {
  return date1 === date2;
};

export const isDateEarlier = (date1: string, date2: string) => {
  return date1 < date2;
};

export const isDateLater = (date1: string, date2: string) => {
  return !isDateSame(date1, date2) && !isDateEarlier(date1, date2);
};

export const earlierDate = (date1: string, date2: string) => {
  return isDateEarlier(date1, date2) ? date1 : date2;
};

export const laterDate = (date1: string, date2: string) => {
  return isDateLater(date1, date2) ? date1 : date2;
};

export const isDateToday = (date: string) => {
  return isDateSame(date, getTodayDate());
};

export const isDateUpcoming = (date: string) => {
  return isDateLater(date, getTodayDate());
};

export const isDatePast = (date: string) => {
  return !isDateToday(date) && !isDateUpcoming(date);
};

export const isDateTodayOrUpcoming = (date: string) => {
  return isDateToday(date) || isDateUpcoming(date);
};

export const isDateTodayOrPast = (date: string) => {
  return isDateToday(date) || isDatePast(date);
};
