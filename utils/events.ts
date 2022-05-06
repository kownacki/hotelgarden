import {omit} from 'lodash'
import {DynamicPathPageEvent, DynamicPathPageEventWithUid, DynamicPathPageNews, EventsList, EventUid} from './types';
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

export const getPromotedEventData = (promotedEventUid: EventUid | null, eventsList: EventsList) => {
  const promotedEvent = promotedEventUid && Object.values(eventsList).find((eventListItem) => {
    return eventListItem.uid === promotedEventUid;
  });
  return promotedEvent && isEventGoingOrUpcoming(promotedEvent as unknown as DynamicPathPageEvent)
    ? {
      uid: promotedEventUid as EventUid,
      event: promotedEvent,
    }
    : undefined;
};

export const convertDynamicPathPagesToEventsList = (dynamicPathPagesWithUids: DynamicPathPageEventWithUid[]) => {
  const eventsList: EventsList = {};
  dynamicPathPagesWithUids.forEach((dynamicPathPage) => {
    // @ts-ignore
    eventsList[dynamicPathPage.permalink] = omit(dynamicPathPage, 'permalink');
  });
  return eventsList;
};
