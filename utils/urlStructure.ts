import {keyBy} from 'lodash';
import {DynamicPathPagePermalink, EventsList} from './types';

export type PageUid =
  | '404'
  | 'admin'
  | 'banquet-halls'
  | 'conference-halls'
  | 'conferences'
  | 'contact'
  | 'cuisine'
  | 'dynamic-path-pages'
  | 'family-parties'
  | 'gallery'
  | 'landing'
  | 'lunch'
  | 'outdoor-parties'
  | 'pizza-truck'
  | 'restaurant'
  | 'reviews'
  | 'rooms'
  | 'summer-bar'
  | 'surroundings'
  | 'villa-garden'
  | 'weddings';

export type StaticPathPageUid = Exclude<PageUid, '404'>;

export type StaticPath =
  | '/'
  | '/admin'
  | '/atrakcje-okolicy'
  | '/galeria'
  | '/garden-bistro'
  | '/imprezy-plenerowe'
  | '/konferencje'
  | '/kontakt'
  | '/kuchnia'
  | '/lunch'
  | '/opinie'
  | '/pizza-truck'
  | '/pokoje'
  | '/przyjecia-rodzinne'
  | '/sale-bankietowe'
  | '/sale-konferencyjne'
  | '/summer-bar'
  | '/villa-garden'
  | '/wesela'
  | '/wydarzenia';

export const NOT_FOUND_404 = 'NOT_FOUND_404';

// All static paths are canonical
export const staticPathToPageUid: Record<StaticPath, StaticPathPageUid> = {
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
  '/pizza-truck': 'pizza-truck',
  '/pokoje': 'rooms',
  '/przyjecia-rodzinne': 'family-parties',
  '/sale-bankietowe': 'banquet-halls',
  '/sale-konferencyjne': 'conference-halls',
  '/summer-bar': 'summer-bar',
  '/villa-garden': 'villa-garden',
  '/wesela': 'weddings',
  '/wydarzenia': 'dynamic-path-pages',
};

export const staticPaths = Object.keys(staticPathToPageUid) as StaticPath[];

interface PageStaticData {
  name: string,
  path: StaticPath | 'NOT_FOUND_404',
  dir: string
}

// todo dir should be renamed and checked where is used
export const pagesStaticData: Record<PageUid, PageStaticData> = {
  '404': {name: 'Błąd 404 - strony nie znaleziono', path: NOT_FOUND_404, dir: '404'},
  'admin': {name: 'Admin', path: '/admin', dir: 'admin'},
  'banquet-halls': {name: 'Sale bankietowe', path: '/sale-bankietowe', dir: 'celebrations'},
  'conference-halls': {name: 'Sale konferencyjne', path: '/sale-konferencyjne', dir: 'conferences'},
  'conferences': {name: 'Konferencja w Gardenie', path: '/konferencje', dir: 'conferences'},
  'contact': {name: 'Kontakt', path: '/kontakt', dir: 'contact'},
  'cuisine': {name: 'O naszej kuchni', path: '/kuchnia', dir: 'hotel'},
  'dynamic-path-pages': {name: 'Wydarzenia i aktualności', path: '/wydarzenia', dir: 'events'},
  'family-parties': {name: 'Przyjęcia rodzinne', path: '/przyjecia-rodzinne', dir: 'celebrations'},
  'gallery': {name: 'Galeria', path: '/galeria', dir: 'gallery'},
  'outdoor-parties': {name: 'Imprezy plenerowe', path: '/imprezy-plenerowe', dir: 'celebrations'},
  'landing': {name: 'O hotelu', path: '/', dir: 'hotel'},
  'lunch': {name: 'Oferta lunchowa', path: '/lunch', dir: 'restaurant'},
  'pizza-truck': {name: 'Pizza Truck', path: '/pizza-truck', dir: 'restaurant'},
  'restaurant': {name: 'Garden Bistro', path: '/garden-bistro', dir: 'restaurant'},
  'reviews': {name: 'Opinie ', path: '/opinie', dir: 'hotel'},
  'rooms': {name: 'Pokoje', path: '/pokoje', dir: 'rooms'},
  'summer-bar': {name: 'Summer Bar', path: '/summer-bar', dir: 'restaurant'},
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
    name: 'Food & Drink',
    path: '/garden-bistro',
    sublinks: ['restaurant', 'lunch', 'summer-bar', 'pizza-truck'],
  }, {
    name: 'Konferencje',
    path: '/konferencje',
    sublinks: ['conferences', 'conference-halls'],
  }, {
    name: 'Uroczystości',
    path: '/wesela',
    sublinks: ['weddings', 'family-parties', 'banquet-halls', 'outdoor-parties'],
  },
  pagesStaticData['gallery'],
  pagesStaticData['dynamic-path-pages'],
  pagesStaticData['contact'],
];

export const linksMap = keyBy(links, 'path');

export const createFullUrl = (path: string) => {
  return path === '/' ? ROOT_URL : `${ROOT_URL}${path}`;
}

export const getDynamicPathPagePermalink = (path: string): DynamicPathPagePermalink => {
  return path.replace(DYNAMIC_PATH_PAGES_ROOT_PATH, '');
};

export const createDynamicPath = (permalink: DynamicPathPagePermalink) => {
  return `${DYNAMIC_PATH_PAGES_ROOT_PATH}${permalink}`;
}

export const isValidStaticPath = (path: string) => {
  return staticPaths.includes(path as StaticPath)
};

export const isDynamicPath = (path: string) => {
  return path.startsWith(DYNAMIC_PATH_PAGES_ROOT_PATH);
};

export const isValidDynamicPath = (path: string, eventsList: EventsList) => {
  return isDynamicPath(path) && Object.keys(eventsList).includes(getDynamicPathPagePermalink(path));
};

export const isValidPath = (path: string, eventsList: EventsList) => {
  return isValidStaticPath(path) || isValidDynamicPath(path, eventsList);
};

export const ROOT_URL = 'https://www.hotelgarden.pl';
export const DYNAMIC_PATH_PAGES_ROOT_PATH = '/wydarzenia/';
export const SITEMAP_PATH = '/sitemap.xml';
export const SITEMAP_URL = createFullUrl(SITEMAP_PATH);

export const PAGES_SRC_PATH = '/src/pages/';
