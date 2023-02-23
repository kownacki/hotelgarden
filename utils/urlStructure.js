import { keyBy } from 'lodash-es';
export const NOT_FOUND_404 = 'NOT_FOUND_404';
// All static paths are canonical
export const staticPathToPageUid = {
    '/': 'landing',
    '/admin': 'admin',
    '/atrakcje-okolicy': 'surroundings',
    '/food-truck': 'food-truck',
    '/galeria': 'gallery',
    '/garden-bistro': 'restaurant',
    '/konferencje': 'conferences',
    '/kontakt': 'contact',
    '/kuchnia': 'cuisine',
    '/lunch': 'lunch',
    '/opinie': 'reviews',
    '/pokoje': 'rooms',
    '/przyjecia-rodzinne': 'family-parties',
    '/sale-bankietowe': 'banquet-halls',
    '/sale-konferencyjne': 'conference-halls',
    '/summer-bar': 'summer-bar',
    '/villa-garden': 'villa-garden',
    '/wesela': 'weddings',
    '/wydarzenia': 'dynamic-path-pages',
};
export const staticPaths = Object.keys(staticPathToPageUid);
// todo dir should be renamed and checked where is used
export const pagesStaticData = {
    '404': { name: 'Błąd 404 - strony nie znaleziono', path: NOT_FOUND_404, dir: '404' },
    'admin': { name: 'Admin', path: '/admin', dir: 'admin' },
    'banquet-halls': { name: 'Sale bankietowe', path: '/sale-bankietowe', dir: 'celebrations' },
    'conference-halls': { name: 'Sale konferencyjne', path: '/sale-konferencyjne', dir: 'conferences' },
    'conferences': { name: 'Konferencja w Gardenie', path: '/konferencje', dir: 'conferences' },
    'contact': { name: 'Kontakt', path: '/kontakt', dir: 'contact' },
    'cuisine': { name: 'O naszej kuchni', path: '/kuchnia', dir: 'hotel' },
    'dynamic-path-pages': { name: 'Wydarzenia i aktualności', path: '/wydarzenia', dir: 'events' },
    'family-parties': { name: 'Przyjęcia rodzinne', path: '/przyjecia-rodzinne', dir: 'celebrations' },
    'food-truck': { name: 'Food Truck', path: '/food-truck', dir: 'restaurant' },
    'gallery': { name: 'Galeria', path: '/galeria', dir: 'gallery' },
    'landing': { name: 'O hotelu', path: '/', dir: 'hotel' },
    'lunch': { name: 'Lunch', path: '/lunch', dir: 'restaurant' },
    'restaurant': { name: 'O restauracji', path: '/garden-bistro', dir: 'restaurant' },
    'reviews': { name: 'Opinie ', path: '/opinie', dir: 'hotel' },
    'rooms': { name: 'Pokoje', path: '/pokoje', dir: 'rooms' },
    'summer-bar': { name: 'Summer Bar', path: '/summer-bar', dir: 'restaurant' },
    'surroundings': { name: 'Atrakcje okolicy', path: '/atrakcje-okolicy', dir: 'hotel' },
    'villa-garden': { name: 'Villa Garden', path: '/villa-garden', dir: 'hotel' },
    'weddings': { name: 'Wesela', path: '/wesela', dir: 'celebrations' },
};
export const pageUids = Object.keys(pagesStaticData);
export const staticPathPageUids = pageUids.filter((pageUid) => pageUid !== '404');
export const links = [
    {
        name: 'Hotel',
        path: '/',
        sublinks: ['landing', 'rooms', 'villa-garden', 'cuisine', 'surroundings', 'reviews'],
    },
    {
        name: 'Garden Bistro',
        path: '/garden-bistro',
        sublinks: ['restaurant', 'lunch', 'summer-bar', 'food-truck'],
    }, {
        name: 'Konferencje',
        path: '/konferencje',
        sublinks: ['conferences', 'conference-halls'],
    }, {
        name: 'Uroczystości',
        path: '/wesela',
        sublinks: ['weddings', 'family-parties', 'banquet-halls'],
    },
    pagesStaticData['gallery'],
    pagesStaticData['dynamic-path-pages'],
    pagesStaticData['contact'],
];
export const linksMap = keyBy(links, 'path');
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
