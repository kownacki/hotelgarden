import {keyBy, mapValues} from 'lodash';
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

export interface PageStaticData {
  uid: PageUid,
  name: string,
  path: StaticPath | 'NOT_FOUND_404',
  parentPageUid: PageUid,
}

type PageStaticDataWithoutUid = Omit<PageStaticData, 'uid'>;

const pagesStaticDataWithoutUid: Record<PageUid, PageStaticDataWithoutUid> = {
  '404': {name: 'Błąd 404 - strony nie znaleziono', path: NOT_FOUND_404, parentPageUid: '404'},
  'admin': {name: 'Admin', path: '/admin', parentPageUid: 'admin'},
  'banquet-halls': {name: 'Sale bankietowe', path: '/sale-bankietowe', parentPageUid: 'weddings'},
  'conference-halls': {name: 'Sale konferencyjne', path: '/sale-konferencyjne', parentPageUid: 'conferences'},
  'conferences': {name: 'Konferencja w Gardenie', path: '/konferencje', parentPageUid: 'conferences'},
  'contact': {name: 'Kontakt', path: '/kontakt', parentPageUid: 'contact'},
  'cuisine': {name: 'O naszej kuchni', path: '/kuchnia', parentPageUid: 'landing'},
  'dynamic-path-pages': {name: 'Wydarzenia i aktualności', path: '/wydarzenia', parentPageUid: 'dynamic-path-pages'},
  'family-parties': {name: 'Przyjęcia rodzinne', path: '/przyjecia-rodzinne', parentPageUid: 'weddings'},
  'gallery': {name: 'Galeria', path: '/galeria', parentPageUid: 'gallery'},
  'outdoor-parties': {name: 'Imprezy plenerowe', path: '/imprezy-plenerowe', parentPageUid: 'weddings'},
  'landing': {name: 'O hotelu', path: '/', parentPageUid: 'landing'},
  'lunch': {name: 'Oferta lunchowa', path: '/lunch', parentPageUid: 'restaurant'},
  'pizza-truck': {name: 'Pizza Truck', path: '/pizza-truck', parentPageUid: 'restaurant'},
  'restaurant': {name: 'Garden Bistro', path: '/garden-bistro', parentPageUid: 'restaurant'},
  'reviews': {name: 'Opinie ', path: '/opinie', parentPageUid: 'landing'},
  'rooms': {name: 'Pokoje', path: '/pokoje', parentPageUid: 'landing'},
  'summer-bar': {name: 'Summer Bar', path: '/summer-bar', parentPageUid: 'restaurant'},
  'surroundings': {name: 'Atrakcje okolicy', path: '/atrakcje-okolicy', parentPageUid: 'landing'},
  'villa-garden': {name: 'Villa Garden', path: '/villa-garden', parentPageUid: 'landing'},
  'weddings': {name: 'Wesela', path: '/wesela', parentPageUid: 'weddings'},
};

export const pagesStaticData: Record<PageUid, PageStaticData> = mapValues(
  pagesStaticDataWithoutUid,
  (pageStaticDataWithoutUid, key) => {
    return {uid: key as PageUid, ...pageStaticDataWithoutUid};
  },
);

export const pageUids = Object.keys(pagesStaticData) as PageUid[];
export const staticPathPageUids = pageUids.filter((pageUid) => pageUid !== '404') as StaticPathPageUid[];

export type SingleNavigationItem = PageStaticData;

export interface MultipleNavigationItem {
  name: string,
  path: StaticPath,
  sublinks: PageUid[],
}

export type NavigationItem = SingleNavigationItem | MultipleNavigationItem;

export const links: NavigationItem[] = [
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
