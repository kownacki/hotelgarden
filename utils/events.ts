import {differenceInCalendarDays} from 'date-fns';
import {
  DynamicPathPageEvent,
  DynamicPathPageEventWithUid,
  DynamicPathPageNews,
  DynamicPathPageUid,
  EventsList,
} from './types';
import {isDateEarlier, isDatePast, isDateTodayOrPast, isDateTodayOrUpcoming, isDateUpcoming} from './general';

export const DynamicPathPageType = {
  EVENT: 'event',
  NEWS: 'news',
};
export const createNewEvent = (title: string, startDate: string, endDate: string, permalink: string): DynamicPathPageEvent => {
  return {
    type: 'event',
    title,
    startDate,
    endDate,
    permalink,
    contentImages: [],
    public: false,
  };
};

export const createNewNews = (title: string, publishDate: string, unpublishDate: string, permalink: string): DynamicPathPageNews => {
  return {
    type: 'news',
    title,
    publishDate,
    unpublishDate,
    permalink,
    contentImages: [],
  };
};
export const isEventDateRangeCorrect = (startDate: string, endDate: string) => {
  return startDate && endDate
    && !isDateEarlier(endDate, startDate)
    && isDateTodayOrUpcoming(endDate);
};

export const isEventSingleDay = (event: DynamicPathPageEvent) => {
  return event.startDate === event.endDate;
};

export const isEventGoing = (event: DynamicPathPageEvent) => {
  return isDateTodayOrPast(event.startDate) && isDateTodayOrUpcoming(event.endDate);
};

export const isEventUpcoming = (event: DynamicPathPageEvent) => {
  return isDateUpcoming(event.startDate);
};

export const isEventPast = (event: DynamicPathPageEvent) => {
  return isDatePast(event.endDate);
};

export const isEventGoingOrUpcoming = (event: DynamicPathPageEvent) => {
  return isEventGoing(event) || isEventUpcoming(event)
};

export const getWhenEventHappens = (event: DynamicPathPageEvent) => {
  return isEventUpcoming(event)
    ? 'Odbędzie się'
    : isEventGoing(event)
      ? 'W trakcie'
      : 'Odbyło się';
};

export const isNewsBeforePublish = (news: DynamicPathPageNews) => {
  return isDateUpcoming(news.publishDate);
};

export const isNewsAfterUnpublish = (news: DynamicPathPageNews) => {
  return isDateTodayOrPast(news.unpublishDate);
};

export const isNewsBeingInPublish = (news: DynamicPathPageNews) => {
  return !isNewsBeforePublish(news) && !isNewsAfterUnpublish(news);
};

export const isDynamicPathPageHidden = (dynamicPathPage: DynamicPathPageEvent | DynamicPathPageNews) => {
  if (dynamicPathPage.type === DynamicPathPageType.EVENT) {
    return !(dynamicPathPage as DynamicPathPageEvent).public;
  } else {
    return isNewsBeforePublish(dynamicPathPage as DynamicPathPageNews);
  }
};

export const isDynamicPathPageArchived = (dynamicPathPage: DynamicPathPageEvent | DynamicPathPageNews) => {
  if (dynamicPathPage.type === DynamicPathPageType.EVENT) {
    return isEventPast(dynamicPathPage as DynamicPathPageEvent);
  } else {
    return isNewsAfterUnpublish(dynamicPathPage as DynamicPathPageNews);
  }
};

export const isDynamicPathPageCurrent = (dynamicPathPage: DynamicPathPageEvent | DynamicPathPageNews) => {
  if (dynamicPathPage.type === DynamicPathPageType.EVENT) {
    return isEventGoingOrUpcoming(dynamicPathPage as DynamicPathPageEvent);
  } else {
    return isNewsBeingInPublish(dynamicPathPage as DynamicPathPageNews);
  }
};

export const getFormattedSingleDate = (date: string) => {
  return date.split('-').reverse().join(' / ');
};

export const getEventFormattedDate = (event: DynamicPathPageEvent) => {
  if (isEventSingleDay(event)) {
    return getFormattedSingleDate(event.startDate);
  } else {
    return `${getFormattedSingleDate(event.startDate)} — ${getFormattedSingleDate(event.endDate)}`;
  }
};

export const getNewsFormattedDate = (news: DynamicPathPageNews) => {
  return getFormattedSingleDate(news.publishDate);
};

export const getDynamicPathPageObsolityScore = (dynamicPathPage: DynamicPathPageEvent | DynamicPathPageNews) => {
  return Math.abs(differenceInCalendarDays(
    Date.now(),
    new Date(dynamicPathPage.type === DynamicPathPageType.EVENT
      ? (dynamicPathPage as DynamicPathPageEvent).startDate
      : (dynamicPathPage as DynamicPathPageNews).publishDate
    ),
  ));
}

export const getPromotedDynamicPathPageData = (promotedDynamicPathPageUid: DynamicPathPageUid | null, eventsList: EventsList) => {
  const promotedDynamicPathPage = promotedDynamicPathPageUid && Object.values(eventsList).find((eventListItem) => {
    return eventListItem.uid === promotedDynamicPathPageUid;
  });
  // @ts-ignore
  return promotedDynamicPathPage && isDynamicPathPageCurrent(promotedDynamicPathPage)
    ? promotedDynamicPathPage
    : undefined;
};

export const convertDynamicPathPagesToEventsList = (dynamicPathPagesWithUids: DynamicPathPageEventWithUid[]) => {
  const eventsList: EventsList = {};
  dynamicPathPagesWithUids.forEach((dynamicPathPage) => {
    // @ts-ignore
    eventsList[dynamicPathPage.permalink] = dynamicPathPage;
  });
  return eventsList;
};
