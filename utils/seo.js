import { isEventPath, getEventUid, pages, pathToUid } from './urlStructure';
export const getDefaultTitle = (uid) => {
    return pages[uid].name;
};
export const appendSuffixToTitle = (title, seoConfig) => {
    return `${title} ${seoConfig.titleSeparator} ${seoConfig.titleSuffix}`;
};
// path must be valid
const getPageTitle = (path, seoConfig, events) => {
    var _a, _b;
    let title;
    //todo co z 'Nie znaleziono wydarzenia'?
    if (isEventPath(path)) {
        const eventUid = getEventUid(path);
        //todo block events without title
        title = events[eventUid].title || 'Wydarzenie bez tytułu';
    }
    else {
        const pageUid = pathToUid[path];
        const defaultTitle = getDefaultTitle(pageUid);
        const seoTitle = (_b = (_a = seoConfig.urls) === null || _a === void 0 ? void 0 : _a[path]) === null || _b === void 0 ? void 0 : _b.title;
        title = seoTitle || defaultTitle;
    }
    return title;
};
export const createFullPageTitle = (path, seoConfig, events) => {
    const pageTitle = getPageTitle(path, seoConfig, events);
    return appendSuffixToTitle(pageTitle, seoConfig);
};
export const createFull404PageTitle = (seoConfig) => {
    return appendSuffixToTitle(getDefaultTitle('404'), seoConfig);
};
