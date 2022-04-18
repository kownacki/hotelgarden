import {keyBy} from 'lodash';
import {EventsList, EventUid} from './types';

export const ROOT_URL = 'https://www.hotelgarden.pl';
export const EVENTS_ROOT_PATH = '/wydarzenia/';
export const SITEMAP_PATH = '/sitemap.xml';

export type PageUid =
  | 'landing'
  | 'villa-garden'
  | 'cuisine'
  | 'surroundings'
  | 'reviews'
  | 'rooms'
  | 'restaurant'
  | 'lunch'
  | 'conferences'
  | 'conference-halls'
  | 'weddings'
  | 'family-parties'
  | 'banquet-halls'
  | 'gallery'
  | 'events'
  | 'contact'
  | '404';

export type StaticPathPageUid = Exclude<PageUid, '404'>;

export type StaticPath =
  | '/index.html'
  | '/'
  | '/villa-garden'
  | '/kuchnia'
  | '/atrakcje-okolicy'
  | '/opinie'
  | '/pokoje'
  | '/garden-bistro'
  | '/lunch'
  | '/konferencje'
  | '/sale-konferencyjne'
  | '/wesela'
  | '/przyjecia-rodzinne'
  | '/sale-bankietowe'
  | '/galeria'
  | '/wydarzenia'
  | '/kontakt'

export const NOT_FOUND_404 = 'NOT_FOUND_404';

export const staticPathToPageUid: Record<StaticPath, StaticPathPageUid> = {
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

export const staticPaths = Object.keys(staticPathToPageUid) as StaticPath[];

export const pagesStaticData: Record<PageUid, {name: string, path: StaticPath | 'NOT_FOUND_404', dir: string}> = {
  'landing': {name: 'O hotelu', path: '/', dir: 'hotel'},
  'villa-garden': {name: 'Villa Garden', path: '/villa-garden', dir: 'hotel'},
  'cuisine': {name: 'O naszej kuchni', path: '/kuchnia', dir: 'hotel'},
  'surroundings': {name: 'Atrakcje okolicy', path: '/atrakcje-okolicy', dir: 'hotel'},
  'reviews': {name: 'Opinie ', path: '/opinie', dir: 'hotel'},
  'rooms': {name: 'Pokoje', path: '/pokoje', dir: 'rooms'},
  'conferences': {name: 'Konferencja w Gardenie', path: '/konferencje', dir: 'conferences'},
  'conference-halls': {name: 'Sale konferencyjne', path: '/sale-konferencyjne', dir: 'conferences'},
  'restaurant': {name: 'O restauracji', path: '/garden-bistro', dir: 'restaurant'},
  'lunch': {name: 'Lunch', path: '/lunch', dir: 'restaurant'},
  'weddings': {name: 'Wesela', path: '/wesela', dir: 'celebrations'},
  'family-parties': {name: 'Przyjęcia rodzinne', path: '/przyjecia-rodzinne', dir: 'celebrations'},
  'banquet-halls': {name: 'Sale bankietowe', path: '/sale-bankietowe', dir: 'celebrations'},
  'gallery': {name: 'Galeria', path: '/galeria', dir: 'gallery'},
  'events': {name: 'Wydarzenia', path: '/wydarzenia', dir: 'events'},
  'contact': {name: 'Kontakt', path: '/kontakt', dir: 'contact'},
  '404': {name: 'Błąd 404 - strony nie znaleziono', path: NOT_FOUND_404, dir: '404'},
};

export const pageUids = Object.keys(pagesStaticData) as PageUid[];
export const staticPathPageUids = pageUids.filter((pageUid) => pageUid !== '404') as StaticPathPageUid[];

// todo remove /index.html - make redirect
//export const canonicalStaticPaths = staticPaths.filter((path) => path !== '/index.html');
export const canonicalStaticPaths = staticPathPageUids.map((pageUid) => {
  return pagesStaticData[pageUid].path;
});

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

export const createFullUrl = (path: string) => {
  return path === '/' ? ROOT_URL : `${ROOT_URL}${path}`;
}

export const getEventUid = (path: string): EventUid => {
  return path.replace(EVENTS_ROOT_PATH, '');
};

export const createEventPath = (eventUid: EventUid) => {
  return `${EVENTS_ROOT_PATH}${eventUid}`;
}

export const isValidStaticPath = (path: string) => {
  return staticPaths.includes(path as StaticPath)
};

export const isEventPath = (path: string) => {
  return path.startsWith(EVENTS_ROOT_PATH);
};

export const isValidEventPath = (path: string, eventsList: EventsList) => {
  return isEventPath(path) && Object.keys(eventsList).includes(getEventUid(path));
};

export const isValidPath = (path: string, eventsList: EventsList) => {
  return isValidStaticPath(path) || isValidEventPath(path, eventsList);
};
