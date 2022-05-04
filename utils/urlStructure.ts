import {keyBy} from 'lodash';
import {EventsList, EventUid} from './types';

export type PageUid =
  | '404'
  | 'banquet-halls'
  | 'conference-halls'
  | 'conferences'
  | 'contact'
  | 'cuisine'
  | 'events'
  | 'family-parties'
  | 'gallery'
  | 'landing'
  | 'lunch'
  | 'restaurant'
  | 'reviews'
  | 'rooms'
  | 'surroundings'
  | 'villa-garden'
  | 'weddings';

export type StaticPathPageUid = Exclude<PageUid, '404'>;

export type StaticPath =
  | '/'
  | '/atrakcje-okolicy'
  | '/galeria'
  | '/garden-bistro'
  | '/konferencje'
  | '/kontakt'
  | '/kuchnia'
  | '/lunch'
  | '/opinie'
  | '/pokoje'
  | '/przyjecia-rodzinne'
  | '/sale-bankietowe'
  | '/sale-konferencyjne'
  | '/villa-garden'
  | '/wesela'
  | '/wydarzenia';

export const NOT_FOUND_404 = 'NOT_FOUND_404';

// All static paths are canonical
export const staticPathToPageUid: Record<StaticPath, StaticPathPageUid> = {
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

interface PageStaticData {
  name: string,
  path: StaticPath | 'NOT_FOUND_404',
  dir: string
}

export const pagesStaticData: Record<PageUid, PageStaticData> = {
  '404': {name: 'Błąd 404 - strony nie znaleziono', path: NOT_FOUND_404, dir: '404'},
  'banquet-halls': {name: 'Sale bankietowe', path: '/sale-bankietowe', dir: 'celebrations'},
  'conference-halls': {name: 'Sale konferencyjne', path: '/sale-konferencyjne', dir: 'conferences'},
  'conferences': {name: 'Konferencja w Gardenie', path: '/konferencje', dir: 'conferences'},
  'contact': {name: 'Kontakt', path: '/kontakt', dir: 'contact'},
  'cuisine': {name: 'O naszej kuchni', path: '/kuchnia', dir: 'hotel'},
  'events': {name: 'Wydarzenia', path: '/wydarzenia', dir: 'events'},
  'family-parties': {name: 'Przyjęcia rodzinne', path: '/przyjecia-rodzinne', dir: 'celebrations'},
  'gallery': {name: 'Galeria', path: '/galeria', dir: 'gallery'},
  'landing': {name: 'O hotelu', path: '/', dir: 'hotel'},
  'lunch': {name: 'Lunch', path: '/lunch', dir: 'restaurant'},
  'restaurant': {name: 'O restauracji', path: '/garden-bistro', dir: 'restaurant'},
  'reviews': {name: 'Opinie ', path: '/opinie', dir: 'hotel'},
  'rooms': {name: 'Pokoje', path: '/pokoje', dir: 'rooms'},
  'surroundings': {name: 'Atrakcje okolicy', path: '/atrakcje-okolicy', dir: 'hotel'},
  'villa-garden': {name: 'Villa Garden', path: '/villa-garden', dir: 'hotel'},
  'weddings': {name: 'Wesela', path: '/wesela', dir: 'celebrations'},
};

export const pageUids = Object.keys(pagesStaticData) as PageUid[];
export const staticPathPageUids = pageUids.filter((pageUid) => pageUid !== '404') as StaticPathPageUid[];

export const links = [
  {
    name: 'Hotel',
    path: '/',
    sublinks: ['landing', 'rooms', 'villa-garden', 'cuisine', 'surroundings', 'reviews'],
  },
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

export const getEventPermalink = (path: string): EventUid => {
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
  return isEventPath(path) && Object.keys(eventsList).includes(getEventPermalink(path));
};

export const isValidPath = (path: string, eventsList: EventsList) => {
  return isValidStaticPath(path) || isValidEventPath(path, eventsList);
};

export const ROOT_URL = 'https://www.hotelgarden.pl';
export const EVENTS_ROOT_PATH = '/wydarzenia/';
export const SITEMAP_PATH = '/sitemap.xml';
export const SITEMAP_URL = createFullUrl(SITEMAP_PATH);

export const PAGES_SRC_PATH = '/src/pages/';
