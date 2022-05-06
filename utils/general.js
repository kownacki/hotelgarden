export class PromiseTrigger {
    constructor() {
        this.promise = new Promise((resolve) => this.resolve = resolve);
    }
}
// In Poland
export const getTodayDate = () => {
    const dateNow = new Date();
    const locale = 'pl-PL';
    const timeZone = 'Europe/Warsaw';
    const year = dateNow.toLocaleString(locale, { year: 'numeric', timeZone });
    const month = dateNow.toLocaleString(locale, { month: '2-digit', timeZone });
    const day = dateNow.toLocaleString(locale, { day: '2-digit', timeZone });
    return `${year}-${month}-${day}`;
};
export const isDateSame = (date1, date2) => {
    return date1 === date2;
};
export const isDateEarlier = (date1, date2) => {
    return date1 < date2;
};
export const isDateLater = (date1, date2) => {
    return !isDateSame(date1, date2) && !isDateEarlier(date1, date2);
};
export const earlierDate = (date1, date2) => {
    return isDateEarlier(date1, date2) ? date1 : date2;
};
export const laterDate = (date1, date2) => {
    return isDateLater(date1, date2) ? date1 : date2;
};
export const isDateToday = (date) => {
    return isDateSame(date, getTodayDate());
};
export const isDateUpcoming = (date) => {
    return isDateLater(date, getTodayDate());
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
