import { omit } from 'lodash-es';
// to do don't use global moment
// @ts-ignore
const moment = window.moment;
export const createNewEvent = (title, date, path) => {
    return {
        title,
        date,
        path,
        public: false,
    };
};
export const isEventToday = (event) => {
    return moment().isSame(event.date, 'day');
};
export const isEventUpcoming = (event) => {
    return moment().isBefore(event.date, 'day');
};
export const isEventTodayOrUpcoming = (event) => {
    return isEventToday(event) || isEventUpcoming(event);
};
export const isEventPast = (event) => {
    return !isEventTodayOrUpcoming(event);
};
export const getWhenEventHappens = (event) => {
    return isEventUpcoming(event)
        ? 'Odbędzie się'
        : isEventToday(event)
            ? 'Dzisiaj'
            : 'Odbyło się';
};
export const getEventFormattedDate = (event) => {
    return event.date.split('-').reverse().join(' / ');
};
export const getPromotedEventData = (promotedEventUid, eventsList) => {
    const promotedEvent = promotedEventUid && eventsList[promotedEventUid];
    return promotedEvent && isEventTodayOrUpcoming(promotedEvent)
        ? {
            uid: promotedEventUid,
            event: promotedEvent,
        }
        : undefined;
};
export const convertDynamicPathPagesToEventsList = (dynamicPathPages) => {
    const eventsList = {};
    dynamicPathPages.forEach((dynamicPathPage) => {
        eventsList[dynamicPathPage.path] = omit(dynamicPathPage, 'path');
    });
    return eventsList;
};
