import { keyBy, mapValues } from 'lodash-es';
export const HIDDEN_PAGES = ['pizza-truck', 'outdoor-parties', 'oaza'];
export const NOT_FOUND_404 = 'NOT_FOUND_404';
// All static paths are canonical
export const staticPathToPageUid = {
    '/': 'landing',
    '/admin': 'admin',
    '/atrakcje-okolicy': 'surroundings',
    '/galeria': 'gallery',
    '/garden-bistro': 'restaurant',
    '/imprezy-plenerowe': 'outdoor-parties',
    '/konferencje': 'conferences',
    '/kontakt': 'contact',
    '/kuchnia': 'cuisine',
    '/lunch': 'lunch',
    '/opinie': 'reviews',
    '/oaza': 'oaza',
    '/pizza-truck': 'pizza-truck',
    '/pokoje': 'rooms',
    '/praca': 'careers',
    '/przyjecia-rodzinne': 'family-parties',
    '/sale-bankietowe': 'banquet-halls',
    '/sale-konferencyjne': 'conference-halls',
    '/summer-bar': 'summer-bar',
    '/villa-garden': 'villa-garden',
    '/wesela': 'weddings',
    '/wydarzenia': 'dynamic-path-pages',
};
export const staticPaths = Object.keys(staticPathToPageUid);
export const nonHiddenStaticPaths = staticPaths.filter((staticPath) => {
    return !HIDDEN_PAGES.includes(staticPathToPageUid[staticPath]);
});
const pagesStaticDataWithoutUid = {
    '404': { name: 'Błąd 404 - strony nie znaleziono', path: NOT_FOUND_404, parentPageUid: '404' },
    'admin': { name: 'Admin', path: '/admin', parentPageUid: 'admin' },
    'banquet-halls': { name: 'Sale bankietowe', path: '/sale-bankietowe', parentPageUid: 'weddings' },
    'careers': { name: 'Praca', path: '/praca', parentPageUid: 'landing' },
    'conference-halls': { name: 'Sale konferencyjne', path: '/sale-konferencyjne', parentPageUid: 'conferences' },
    'conferences': { name: 'Konferencja w Gardenie', path: '/konferencje', parentPageUid: 'conferences' },
    'contact': { name: 'Kontakt', path: '/kontakt', parentPageUid: 'contact' },
    'cuisine': { name: 'O naszej kuchni', path: '/kuchnia', parentPageUid: 'landing' },
    'dynamic-path-pages': { name: 'Wydarzenia i aktualności', path: '/wydarzenia', parentPageUid: 'dynamic-path-pages' },
    'family-parties': { name: 'Przyjęcia rodzinne', path: '/przyjecia-rodzinne', parentPageUid: 'weddings' },
    'gallery': { name: 'Galeria', path: '/galeria', parentPageUid: 'gallery' },
    'landing': { name: 'O hotelu', path: '/', parentPageUid: 'landing' },
    'lunch': { name: 'Oferta lunchowa', path: '/lunch', parentPageUid: 'restaurant' },
    'oaza': { name: 'Oaza', path: '/oaza', parentPageUid: 'restaurant' },
    'outdoor-parties': { name: 'Imprezy plenerowe', path: '/imprezy-plenerowe', parentPageUid: 'weddings' },
    'pizza-truck': { name: 'Pizza Truck', path: '/pizza-truck', parentPageUid: 'restaurant' },
    'restaurant': { name: 'Garden Bistro', path: '/garden-bistro', parentPageUid: 'restaurant' },
    'reviews': { name: 'Opinie ', path: '/opinie', parentPageUid: 'landing' },
    'rooms': { name: 'Pokoje', path: '/pokoje', parentPageUid: 'landing' },
    'summer-bar': { name: 'Summer Bar', path: '/summer-bar', parentPageUid: 'restaurant' },
    'surroundings': { name: 'Atrakcje okolicy', path: '/atrakcje-okolicy', parentPageUid: 'landing' },
    'villa-garden': { name: 'Villa Garden', path: '/villa-garden', parentPageUid: 'landing' },
    'weddings': { name: 'Wesela', path: '/wesela', parentPageUid: 'weddings' },
};
export const pagesStaticData = mapValues(pagesStaticDataWithoutUid, (pageStaticDataWithoutUid, key) => {
    return Object.assign({ uid: key }, pageStaticDataWithoutUid);
});
export const pageUids = Object.keys(pagesStaticData);
export const staticPathPageUids = pageUids.filter((pageUid) => pageUid !== '404');
export const mainNavigation = [
    {
        pageUid: 'landing',
        name: 'Hotel',
        subpages: ['landing', 'rooms', 'villa-garden', 'cuisine', 'surroundings', 'reviews', 'careers'],
    },
    {
        pageUid: 'restaurant',
        name: 'Food & Drink',
        subpages: ['restaurant', 'lunch', 'summer-bar', 'pizza-truck', 'oaza'],
    }, {
        pageUid: 'conferences',
        name: 'Konferencje',
        subpages: ['conferences', 'conference-halls'],
    }, {
        pageUid: 'weddings',
        name: 'Uroczystości',
        subpages: ['weddings', 'family-parties', 'banquet-halls', 'outdoor-parties'],
    },
    {
        pageUid: 'gallery',
        name: pagesStaticData['gallery'].name,
    },
    {
        pageUid: 'dynamic-path-pages',
        name: pagesStaticData['dynamic-path-pages'].name,
    },
    {
        pageUid: 'contact',
        name: pagesStaticData['contact'].name,
    },
];
export const mainNavigationByParentPageUid = keyBy(mainNavigation, 'pageUid');
export const createFullUrl = (path) => {
    return path === '/' ? ROOT_URL : `${ROOT_URL}${path}`;
};
export const getDynamicPathPagePermalink = (path) => {
    return path.replace(DYNAMIC_PATH_PAGES_ROOT_PATH, '');
};
export const createDynamicPath = (permalink) => {
    return `${DYNAMIC_PATH_PAGES_ROOT_PATH}${permalink}`;
};
export const isValidStaticPath = (path) => {
    return staticPaths.includes(path);
};
export const isDynamicPath = (path) => {
    return path.startsWith(DYNAMIC_PATH_PAGES_ROOT_PATH);
};
export const isValidDynamicPath = (path, eventsList) => {
    return isDynamicPath(path) && Object.keys(eventsList).includes(getDynamicPathPagePermalink(path));
};
export const isValidPath = (path, eventsList) => {
    return isValidStaticPath(path) || isValidDynamicPath(path, eventsList);
};
export const ROOT_URL = 'https://www.hotelgarden.pl';
export const DYNAMIC_PATH_PAGES_ROOT_PATH = '/wydarzenia/';
export const SITEMAP_PATH = '/sitemap.xml';
export const SITEMAP_URL = createFullUrl(SITEMAP_PATH);
export const PAGES_SRC_PATH = '/src/pages/';
