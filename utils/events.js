import { omit } from 'lodash-es';
import { isDatePast, isDateToday, isDateTodayOrUpcoming, isDateUpcoming } from './general';
export const createNewEvent = (title, date, permalink) => {
    return {
        title,
        date,
        permalink,
        public: false,
    };
};
export const isEventToday = (event) => {
    return isDateToday(event.date);
};
export const isEventUpcoming = (event) => {
    return isDateUpcoming(event.date);
};
export const isEventTodayOrUpcoming = (event) => {
    return isDateTodayOrUpcoming(event.date);
};
export const isEventPast = (event) => {
    return isDatePast(event.date);
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
    const promotedEvent = promotedEventUid && Object.values(eventsList).find((eventListItem) => {
        return eventListItem.uid === promotedEventUid;
    });
    return promotedEvent && isEventTodayOrUpcoming(promotedEvent)
        ? {
            uid: promotedEventUid,
            event: promotedEvent,
        }
        : undefined;
};
export const convertDynamicPathPagesToEventsList = (dynamicPathPagesWithUids) => {
    const eventsList = {};
    dynamicPathPagesWithUids.forEach((dynamicPathPage) => {
        eventsList[dynamicPathPage.permalink] = omit(dynamicPathPage, 'permalink');
    });
    return eventsList;
};
