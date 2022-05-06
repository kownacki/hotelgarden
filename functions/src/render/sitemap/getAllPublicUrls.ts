import {EventsList} from '../../../../utils/types';
import {staticPaths, createFullUrl, createDynamicPath} from '../../../../utils/urlStructure';

const getPublicEventsUids = (eventsList: EventsList) => {
  return Object.entries(eventsList)
    .filter(([eventUid, event]) => {
      return event.public;
    })
    .map(([eventUid]) => {
      return eventUid;
    });
}

export const getAllPublicUrls = (eventsList: EventsList) => {
  const publicEventsUids = getPublicEventsUids(eventsList);
  const publicEventsPaths = publicEventsUids.map((eventUid) => createDynamicPath(eventUid));

  return [...staticPaths, ...publicEventsPaths]
    .map((path) => {
      return createFullUrl(path);
    });
};
