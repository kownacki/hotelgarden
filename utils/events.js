import { isDateEarlier, isDatePast, isDateTodayOrPast, isDateTodayOrUpcoming, isDateUpcoming } from './general';
export const DynamicPathPageType = {
    EVENT: 'event',
    NEWS: 'news',
};
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
export const isEventDateRangeCorrect = (startDate, endDate) => {
    return startDate && endDate
        && !isDateEarlier(endDate, startDate)
        && isDateTodayOrUpcoming(endDate);
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
export const isNewsBeforePublish = (news) => {
    return isDateUpcoming(news.publishDate);
};
export const isNewsAfterUnpublish = (news) => {
    return isDateTodayOrPast(news.unpublishDate);
};
export const isNewsBeingInPublish = (news) => {
    return !isNewsBeforePublish(news) && !isNewsAfterUnpublish(news);
};
export const isDynamicPathPageHidden = (dynamicPathPage) => {
    if (dynamicPathPage.type === DynamicPathPageType.EVENT) {
        return !dynamicPathPage.public;
    }
    else {
        return isNewsBeforePublish(dynamicPathPage);
    }
};
export const isDynamicPathPageArchived = (dynamicPathPage) => {
    if (dynamicPathPage.type === DynamicPathPageType.EVENT) {
        return isEventPast(dynamicPathPage);
    }
    else {
        return isNewsAfterUnpublish(dynamicPathPage);
    }
};
export const isDynamicPathPageCurrent = (dynamicPathPage) => {
    if (dynamicPathPage.type === DynamicPathPageType.EVENT) {
        return isEventGoingOrUpcoming(dynamicPathPage);
    }
    else {
        return isNewsBeingInPublish(dynamicPathPage);
    }
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
export const getPromotedDynamicPathPageData = (promotedDynamicPathPageUid, eventsList) => {
    const promotedDynamicPathPage = promotedDynamicPathPageUid && Object.values(eventsList).find((eventListItem) => {
        return eventListItem.uid === promotedDynamicPathPageUid;
    });
    // @ts-ignore
    return promotedDynamicPathPage && isDynamicPathPageCurrent(promotedDynamicPathPage)
        ? promotedDynamicPathPage
        : undefined;
};
export const convertDynamicPathPagesToEventsList = (dynamicPathPagesWithUids) => {
    const eventsList = {};
    dynamicPathPagesWithUids.forEach((dynamicPathPage) => {
        // @ts-ignore
        eventsList[dynamicPathPage.permalink] = dynamicPathPage;
    });
    return eventsList;
};
