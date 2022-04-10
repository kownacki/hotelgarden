import {keyBy} from 'lodash';

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
  | 'test'
  | 'test2'
  | 'test3'
  | '404';

export type Path =
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
  | '/test'
  | '/test2'
  | '/test3';

export const NOT_FOUND_404 = 'NOT_FOUND_404';

export const pathToUid: Record<Path, PageUid> = {
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
  '/test': 'test',
  '/test2': 'test2',
  '/test3': 'test3',
};

export const paths = Object.keys(pathToUid);

export const pages: Record<PageUid, {name: string, path: Path | 'NOT_FOUND_404', dir: string}> = {
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
  // 'catering': {name: 'Catering', path: '/catering', dir: 'restaurant'},
  'weddings': {name: 'Wesela', path: '/wesela', dir: 'celebrations'},
  'family-parties': {name: 'Przyjęcia rodzinne', path: '/przyjecia-rodzinne', dir: 'celebrations'},
  // 'chrzciny': {name: 'Chrzciny', path: '/chrzciny', dir: 'celebrations'},
  // 'komunie': {name: 'Komunie', path: '/komunie', dir: 'celebrations'},
  'banquet-halls': {name: 'Sale bankietowe', path: '/sale-bankietowe', dir: 'celebrations'},
  'gallery': {name: 'Galeria', path: '/galeria', dir: 'gallery'},
  'events': {name: 'Wydarzenia', path: '/wydarzenia', dir: 'events'},
  'contact': {name: 'Kontakt', path: '/kontakt', dir: 'contact'},
  '404': {name: 'Błąd 404 - strony nie znaleziono', path: NOT_FOUND_404, dir: '404'},
  //
  'test': {name: 'Test', path: '/test', dir: ''},
  'test2': {name: 'Test 2', path: '/test2', dir: ''},
  'test3': {name: 'Test 3', path: '/test3', dir: ''},
};

export const pageUids = Object.keys(pages);

export const links = [
  {
    name: 'Hotel',
    path: '/',
    sublinks: ['landing', 'villa-garden', 'cuisine', 'surroundings', 'reviews'],
  },
  pages['rooms'],
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
  pages['gallery'],
  pages['events'],
  pages['contact'],
];

export const linksMap = keyBy(links, 'path');
