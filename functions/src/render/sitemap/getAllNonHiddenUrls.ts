import {isDynamicPathPageHidden} from '../../../utils/events';
import {EventsList} from '../../../utils/types';
import {createFullUrl, createDynamicPath, nonHiddenStaticPaths} from '../../../utils/urlStructure';

const getPublicEventsUids = (eventsList: EventsList) => {
  return Object.entries(eventsList)
    .filter(([eventUid, event]) => {
      // @ts-ignore
      return !isDynamicPathPageHidden(event);
    })
    .map(([eventUid]) => {
      return eventUid;
    });
};

export const getAllNonHiddenUrls = (eventsList: EventsList) => {
  const nonHiddenEventsUids = getPublicEventsUids(eventsList);
  const nonHiddenEventsPaths = nonHiddenEventsUids.map((eventUid) => createDynamicPath(eventUid));

  return [...nonHiddenStaticPaths, ...nonHiddenEventsPaths]
    .map((path) => {
      return createFullUrl(path);
    });
};
