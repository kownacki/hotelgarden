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
export const getEventTitle = (event) => {
    //todo block events without title
    return event.title || 'Wydarzenie bez tytułu';
};
// path to page or event must be valid
const getPageOrEventTitle = (path, seoConfig, eventsList) => {
    let title;
    if (isEventPath(path)) {
        const eventUid = getEventUid(path);
        const event = eventsList[eventUid];
        title = getEventTitle(event);
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
export const createFullEventTitle = (eventUid, seoConfig, eventsList) => {
    const event = eventsList[eventUid];
    const eventTitle = getEventTitle(event);
    return appendSuffixToTitle(eventTitle, seoConfig);
};
export const createFullValidPageOrEventTitle = (path, seoConfig, eventsList) => {
    const pageTitle = getPageOrEventTitle(path, seoConfig, eventsList);
    return appendSuffixToTitle(pageTitle, seoConfig);
};
export const createFull404PageTitle = (seoConfig) => {
    return appendSuffixToTitle(getDefaultTitle('404'), seoConfig);
};
export const createEventJsonLd = (event) => {
    return JSON.stringify({
        '@context': 'http://schema.org/',
        '@type': 'Event',
        location: {
            '@type': 'Place',
            name: 'Hotel Garden',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'ul. Podchorążych 2A',
                addressLocality: 'Oleśnica',
                postalCode: '56-400',
                addressRegion: 'Dolnośląskie',
                addressCountry: 'PL',
            },
        },
        name: event.title,
        startDate: event.date,
    });
};
