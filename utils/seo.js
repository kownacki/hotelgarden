import { isEventPath, getEventUid, pagesStaticData, staticPathToPageUid } from './urlStructure';
export const getDefaultTitle = (uid) => {
    return pagesStaticData[uid].name;
};
export const appendSuffixToTitle = (title, seoConfig) => {
    return `${title} ${seoConfig.titleSeparator} ${seoConfig.titleSuffix}`;
};
export const getPageTitle = (pageUid, seoConfig) => {
    var _a, _b;
    const defaultTitle = getDefaultTitle(pageUid);
    const seoTitle = pageUid === '404' ? null : (_b = (_a = seoConfig.urls) === null || _a === void 0 ? void 0 : _a[pagesStaticData[pageUid].path]) === null || _b === void 0 ? void 0 : _b.title;
    return seoTitle || defaultTitle;
};
export const getEventTitle = (eventUid, events) => {
    //todo block events without title
    return events[eventUid].title || 'Wydarzenie bez tytułu';
};
// path to page or event must be valid
const getPageOrEventTitle = (path, seoConfig, events) => {
    let title;
    //todo co z 'Nie znaleziono wydarzenia'?
    if (isEventPath(path)) {
        const eventUid = getEventUid(path);
        title = getEventTitle(eventUid, events);
    }
    else {
        const pageUid = staticPathToPageUid[path];
        title = getPageTitle(pageUid, seoConfig);
    }
    return title;
};
export const createFullPageTitle = (pageUid, seoConfig) => {
    const pageTitle = getPageTitle(pageUid, seoConfig);
    return appendSuffixToTitle(pageTitle, seoConfig);
};
export const createFullEventTitle = (eventUid, seoConfig, events) => {
    const eventTitle = getEventTitle(eventUid, events);
    return appendSuffixToTitle(eventTitle, seoConfig);
};
export const createFullValidPageOrEventTitle = (path, seoConfig, events) => {
    const pageTitle = getPageOrEventTitle(path, seoConfig, events);
    return appendSuffixToTitle(pageTitle, seoConfig);
};
export const createFull404PageTitle = (seoConfig) => {
    return appendSuffixToTitle(getDefaultTitle('404'), seoConfig);
};
