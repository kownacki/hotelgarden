import { keyBy } from 'lodash-es';
export const NOT_FOUND_404 = 'NOT_FOUND_404';
export const staticPathToPageUid = {
    '/index.html': 'landing',
    '/': 'landing',
    '/villa-garden': 'villa-garden',
    '/kuchnia': 'cuisine',
    '/atrakcje-okolicy': 'surroundings',
    '/opinie': 'reviews',
    '/pokoje': 'rooms',
    '/garden-bistro': 'restaurant',
    '/lunch': 'lunch',
    '/konferencje': 'conferences',
    '/sale-konferencyjne': 'conference-halls',
    '/wesela': 'weddings',
    '/przyjecia-rodzinne': 'family-parties',
    '/sale-bankietowe': 'banquet-halls',
    '/galeria': 'gallery',
    '/wydarzenia': 'events',
    '/kontakt': 'contact',
};
export const staticPaths = Object.keys(staticPathToPageUid);
export const pagesStaticData = {
    'landing': { name: 'O hotelu', path: '/', dir: 'hotel' },
    'villa-garden': { name: 'Villa Garden', path: '/villa-garden', dir: 'hotel' },
    'cuisine': { name: 'O naszej kuchni', path: '/kuchnia', dir: 'hotel' },
    'surroundings': { name: 'Atrakcje okolicy', path: '/atrakcje-okolicy', dir: 'hotel' },
    'reviews': { name: 'Opinie ', path: '/opinie', dir: 'hotel' },
    'rooms': { name: 'Pokoje', path: '/pokoje', dir: 'rooms' },
    'conferences': { name: 'Konferencja w Gardenie', path: '/konferencje', dir: 'conferences' },
    'conference-halls': { name: 'Sale konferencyjne', path: '/sale-konferencyjne', dir: 'conferences' },
    'restaurant': { name: 'O restauracji', path: '/garden-bistro', dir: 'restaurant' },
    'lunch': { name: 'Lunch', path: '/lunch', dir: 'restaurant' },
    'weddings': { name: 'Wesela', path: '/wesela', dir: 'celebrations' },
    'family-parties': { name: 'Przyjęcia rodzinne', path: '/przyjecia-rodzinne', dir: 'celebrations' },
    'banquet-halls': { name: 'Sale bankietowe', path: '/sale-bankietowe', dir: 'celebrations' },
    'gallery': { name: 'Galeria', path: '/galeria', dir: 'gallery' },
    'events': { name: 'Wydarzenia', path: '/wydarzenia', dir: 'events' },
    'contact': { name: 'Kontakt', path: '/kontakt', dir: 'contact' },
    '404': { name: 'Błąd 404 - strony nie znaleziono', path: NOT_FOUND_404, dir: '404' },
};
export const pageUids = Object.keys(pagesStaticData);
export const staticPathPageUids = pageUids.filter((pageUid) => pageUid !== '404');
export const links = [
    {
        name: 'Hotel',
        path: '/',
        sublinks: ['landing', 'villa-garden', 'cuisine', 'surroundings', 'reviews'],
    },
    pagesStaticData['rooms'],
    {
        name: 'Garden Bistro',
        path: '/garden-bistro',
        sublinks: ['restaurant', 'lunch'],
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
    pagesStaticData['events'],
    pagesStaticData['contact'],
];
export const linksMap = keyBy(links, 'path');
export const getEventUid = (path) => {
    return path.replace('/wydarzenia/', '');
};
export const isValidStaticPath = (path) => {
    return staticPaths.includes(path);
};
export const isEventPath = (path) => {
    return path.startsWith('/wydarzenia/');
};
export const isValidEventPath = (path, events) => {
    return isEventPath(path) && Object.keys(events).includes(getEventUid(path));
};
export const isValidPath = (path, events) => {
    return isValidStaticPath(path) || isValidEventPath(path, events);
};
