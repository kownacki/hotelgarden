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

export const isDateToday = (date: string) => {
  // to do don't use global moment
  // @ts-ignore
  const moment = window.moment;
  return moment().isSame(date, 'day');
};

export const isDateUpcoming = (date: string) => {
  // to do don't use global moment
  // @ts-ignore
  const moment = window.moment;
  return moment().isBefore(date, 'day');
};

export const isDateTodayOrUpcoming = (date: string) => {
  return isDateToday(date) || isDateUpcoming(date);
};

export const isDatePast = (date: string) => {
  return !isDateTodayOrUpcoming(date);
};
