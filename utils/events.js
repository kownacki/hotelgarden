import { omit } from 'lodash-es';
import { isDatePast, isDateTodayOrPast, isDateTodayOrUpcoming, isDateUpcoming } from './general';
export const createNewEvent = (title, startDate, endDate, permalink) => {
    return {
        type: 'event',
        title,
        startDate,
        endDate,
        permalink,
        public: false,
    };
};
export const createNewNews = (title, publishDate, unpublishDate, permalink) => {
    return {
        type: 'news',
        title,
        publishDate,
        unpublishDate,
        permalink,
    };
};
export const isEventSingleDay = (event) => {
    return event.startDate === event.endDate;
};
export const isEventGoing = (event) => {
    return isDateTodayOrPast(event.startDate) && isDateTodayOrUpcoming(event.endDate);
};
export const isEventUpcoming = (event) => {
    return isDateUpcoming(event.startDate);
};
export const isEventPast = (event) => {
    return isDatePast(event.endDate);
};
export const isEventGoingOrUpcoming = (event) => {
    return isEventGoing(event) || isEventUpcoming(event);
};
export const getWhenEventHappens = (event) => {
    return isEventUpcoming(event)
        ? 'Odbędzie się'
        : isEventGoing(event)
            ? 'W trakcie'
            : 'Odbyło się';
};
export const getFormattedSingleDate = (date) => {
    return date.split('-').reverse().join(' / ');
};
export const getEventFormattedDate = (event) => {
    if (isEventSingleDay(event)) {
        return getFormattedSingleDate(event.startDate);
    }
    else {
        return `${getFormattedSingleDate(event.startDate)} — ${getFormattedSingleDate(event.endDate)}`;
    }
};
export const getNewsFormattedDate = (news) => {
    return getFormattedSingleDate(news.publishDate);
};
export const getPromotedEventData = (promotedEventUid, eventsList) => {
    const promotedEvent = promotedEventUid && Object.values(eventsList).find((eventListItem) => {
        return eventListItem.uid === promotedEventUid;
    });
    return promotedEvent && isEventGoingOrUpcoming(promotedEvent)
        ? {
            uid: promotedEventUid,
            event: promotedEvent,
        }
        : undefined;
};
export const convertDynamicPathPagesToEventsList = (dynamicPathPagesWithUids) => {
    const eventsList = {};
    dynamicPathPagesWithUids.forEach((dynamicPathPage) => {
        // @ts-ignore
        eventsList[dynamicPathPage.permalink] = omit(dynamicPathPage, 'permalink');
    });
    return eventsList;
};
