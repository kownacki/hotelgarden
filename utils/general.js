export class PromiseTrigger {
    constructor() {
        this.promise = new Promise((resolve) => this.resolve = resolve);
    }
}
export const getTodayDate = () => {
    // to do don't use global moment
    // @ts-ignore
    const moment = window.moment;
    return moment().format('YYYY-MM-DD');
};
export const isDateToday = (date) => {
    // to do don't use global moment
    // @ts-ignore
    const moment = window.moment;
    return moment().isSame(date, 'day');
};
export const isDateUpcoming = (date) => {
    // to do don't use global moment
    // @ts-ignore
    const moment = window.moment;
    return moment().isBefore(date, 'day');
};
export const isDatePast = (date) => {
    return !isDateToday(date) && !isDateUpcoming(date);
};
export const isDateTodayOrUpcoming = (date) => {
    return isDateToday(date) || isDateUpcoming(date);
};
export const isDateTodayOrPast = (date) => {
    return isDateToday(date) || isDatePast(date);
};
