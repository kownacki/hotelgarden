import { omit } from 'lodash-es';
export const createNewEvent = (title, date, permalink) => {
    return {
        title,
        date,
        permalink,
        public: false,
    };
};
export const isEventToday = (event) => {
    // to do don't use global moment
    // @ts-ignore
    const moment = window.moment;
    return moment().isSame(event.date, 'day');
};
export const isEventUpcoming = (event) => {
    // to do don't use global moment
    // @ts-ignore
    const moment = window.moment;
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
