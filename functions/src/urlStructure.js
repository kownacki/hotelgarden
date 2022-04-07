export const pathToUid = {
  '/index.html': 'landing',
  '/': 'landing',
  '/villa-garden': 'villa-garden',
  '/kuchnia': 'cuisine',
  '/atrakcje-okolicy': 'surroundings',
  '/opinie': 'reviews',
  '/pokoje': 'rooms',
  '/garden-bistro': 'restaurant',
  '/lunch': 'lunch',
  // '/catering': 'catering',
  '/konferencje': 'conferences',
  '/sale-konferencyjne': 'conference-halls',
  '/wesela': 'weddings',
  '/przyjecia-rodzinne': 'family-parties',
  // '/chrzciny': 'chrzciny',
  // '/komunie': 'komunie',
  '/sale-bankietowe': 'banquet-halls',
  '/galeria': 'gallery',
  '/wydarzenia': 'events',
  '/kontakt': 'contact',
  //
  '/test': 'test',
  '/test2': 'tes2',
  '/test3': 'test3',
};

export const pages = {
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
  '404': {name: 'Błąd 404 - strony nie znaleziono', dir: '404'},
  //
  'test': {name: 'Test'},
  'test2': {name: 'Test 2'},
  'test3': {name: 'Test 3'},
};

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
