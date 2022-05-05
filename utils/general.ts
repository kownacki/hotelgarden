export class PromiseTrigger {
  promise: Promise<unknown>;
  // @ts-ignore
  resolve: (value?: unknown) => void;
  constructor() {
    this.promise = new Promise((resolve) => this.resolve = resolve);
  }
}

export const getTodayDate = () => {
  // to do don't use global moment
  // @ts-ignore
  const moment = window.moment;
  return moment().format('YYYY-MM-DD');
}

export const isDateSame = (date1: string, date2: string) => {
  // to do don't use global moment
  // @ts-ignore
  const moment = window.moment;
  return moment(date1).isSame(date2, 'day');
};

export const isDateEarlier = (date1: string, date2: string) => {
  // to do don't use global moment
  // @ts-ignore
  const moment = window.moment;
  return moment(date1).isBefore(date2, 'day');
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
