import {EventsList} from '../../../utils/types';
import {canonicalStaticPaths, createFullUrl, createEventPath} from '../../../utils/urlStructure';

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
  const publicEventsPaths = publicEventsUids.map((eventUid) => createEventPath(eventUid));

  return [...canonicalStaticPaths, ...publicEventsPaths]
    .map((path) => {
      return createFullUrl(path);
    });
};
