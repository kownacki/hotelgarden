import moment from "moment";
import diacritics from '../resources/scripts/diacritics.js';

export const headerHeight = 59;

export const hyphenate = _.flow(
  _.replace(/'/g, ''),
  _.toLower,
  diacritics.remove,
  _.words,
  _.join('-'),
);

export const assignKeys = (field) => _.map.convert({cap: false})((item, key) => ({...item, [field]: key}));

export const splitEvents = (events) => [
  _.flow([
    _.filter(_.get('public')),
    _.filter((event) => moment().isSameOrBefore(event.date, 'day')),
    _.sortBy('date'),
  ])(events),
  _.flow([
    _.filter(_.get('public')),
    _.filter((event) => moment().isAfter(event.date, 'day')),
    _.sortBy('date'),
  ])(events)
];

export const generateUid = () => `${Date.now()}${_.padCharsStart('0', 9,  _.random(1, 10**9 - 1))}`;

export const getData = async (doc, path) => {
  const docData = (await db.doc(doc).get()).data() || {};
  return path ? _.get(path, docData) : docData;
};

export const updateData = (doc, path, data) => {
  return path
    ? db.doc(doc).set(_.setWith(Object, path, data, {}), {mergeFields: [path]})
    : db.doc(doc).set(data);
};

export const createImage = async (file) => {
  const name = generateUid();
  const storageRef = storage.ref('images/' + name);
  await storageRef.put(file);
  return {name, url: await storageRef.getDownloadURL()};
};
export const deleteImage = async (imageName) => {
  return storage.ref('images/' + imageName).delete()
};
export const updateImage = async (doc, path, file, oldImageName) => {
  if (oldImageName) deleteImage(oldImageName);
  const image = await createImage(file);
  updateData(doc, path, image);
  return image;
};

export const array = {
  swapItems: (index1, index2, arr) => {
    const temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
    return arr;
  },
  nextIndex: (index, arr) => index === arr.length - 1 ? 0 : index + 1,
  prevIndex: (index, arr) => index === 0 ? arr.length - 1 : index - 1,
  nextItem: (index, arr) => arr[array.nextIndex(index, arr)],
  prevItem: (index, arr) => arr[array.prevIndex(index, arr)],
};

const memoizedParse =_.memoize(JSON.parse);
export const staticProp = (object) => {
  return memoizedParse(JSON.stringify(object));
};

export const sleep = (milliseconds = 0) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export const moveOutFromShadowDom = async (contentsElement) => {
  await sleep();
  const id = _.random(0, 1000000000);

  const getHost = (element) => {
    while (element.parentElement) {
      element = element.parentElement;
    }
    return element.parentNode.host;
  };

  const getHosts = (element) => {
    const hosts = [];
    while (getHost(element)) {
      element = getHost(element);
      hosts.push(element);
    }
    return hosts;
  };

  const hosts = getHosts(contentsElement);

  _.forEach(
    (host) => {
      const slot = document.createElement("slot");
      slot.setAttribute('slot', id);
      slot.setAttribute('name', id);
      host.appendChild(slot)
    }, _.initial(hosts)
  );

  const slot = document.createElement("slot");
  slot.setAttribute('name', id);

  contentsElement.parentNode.replaceChild(slot, contentsElement);

  contentsElement.setAttribute('slot', id);

  _.last(hosts).appendChild(contentsElement);
  await sleep();
};

export const detectMobile = () => navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i);

export const ROOM_ID = {
  doubleClassic: 37985,
  twin: 37987,
  tripleClassic: 37984,
  quadClassic: 37983,
  superior: 37988,
  villaRoom: 55463,
};

export const openProfitroom = (location, roomId, adults = 2) => {
  window.Booking.OpenSite(location, {RoomID: roomId, adults, checkin: moment().format('YYYY-MM-DD'), checkout: moment().add(1, 'day').format('YYYY-MM-DD')});
};

export const setDocumentTitle = (title, seo) => document.title = `${title} ${seo.titleSeparator} ${seo.titleSuffix}`;

export const setMetaDescription = (text) => {
  document.head.querySelector('meta[name="description"]').setAttribute('content',
    !text ? ''
      : text.search('<p') === -1
      ? text
      : (() => {
        const el = document.createElement('div');
        el.innerHTML = _.replace(/<br>/g, ' ', text);
        return el.getElementsByTagName('p')[0].innerText;
      })()
  );
};

// todo use moment js
export const getDayOfWeek = (index) => ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek'][index - 1];

export const urlTo64Base = async (url) => {
  const reader = new FileReader();
  reader.readAsDataURL(await (await fetch(url)).blob());
  return new Promise((resolve) => (reader.onloadend = () => resolve(reader.result)));
};

export const loadScript = (src) => new Promise((resolve) => {
  const script = document.createElement('script');
  script.onload = resolve;
  script.src = src;
  document.body.append(script);
});

export const pathToUid = {
  '/index.html': 'landing',
  '/': 'landing',
  '/villa-garden': 'villa-garden',
  '/atrakcje-okolicy': 'surroundings',
  '/opinie': 'reviews',
  '/pokoje': 'rooms',
  '/konferencje': 'conferences',
  '/sale-konferencyjne': 'conference-halls',
  '/kuchnia': 'cuisine',
  '/lunch': 'lunch',
  '/restauracja': 'restaurant',
  '/grill-garden': 'grill-garden',
  // '/catering': 'catering',
  '/wesela': 'weddings',
  '/przyjecia-rodzinne': 'family-parties',
  // '/chrzciny': 'chrzciny',
  // '/komunie': 'komunie',
  '/sale-bankietowe': 'banquet-halls',
  '/galeria': 'gallery',
  '/wydarzenia': 'events',
  '/kontakt': 'contact',
};

export const pages = {
  'landing': {name: 'O hotelu', path: '/', dir: 'hotel'},
  'villa-garden': {name: 'Villa Garden', path: '/villa-garden', dir: 'hotel'},
  'surroundings': {name: 'Atrakcje okolicy', path: '/atrakcje-okolicy', dir: 'hotel'},
  'reviews': {name: 'Opinie ', path: '/opinie', dir: 'hotel'},
  'rooms': {name: 'Pokoje', path: '/pokoje', dir: 'rooms'},
  'conferences': {name: 'Konferencja w Gardenie', path: '/konferencje', dir: 'conferences'},
  'conference-halls': {name: 'Sale konferencyjne', path: '/sale-konferencyjne', dir: 'conferences'},
  'cuisine': {name: 'O naszej kuchni', path: '/kuchnia', dir: 'cuisine'},
  'lunch': {name: 'Lunch', path: '/lunch', dir: 'cuisine'},
  'restaurant': {name: 'Restauracja Magnolia', path: '/restauracja', dir: 'cuisine'},
  'grill-garden': {name: 'Grill Garden', path: '/grill-garden', dir: 'cuisine'},
  // 'catering': {name: 'Catering', path: '/catering', dir: 'cuisine'},
  'weddings': {name: 'Wesela', path: '/wesela', dir: 'celebrations'},
  'family-parties': {name: 'Przyjęcia rodzinne', path: '/przyjecia-rodzinne', dir: 'celebrations'},
  // 'chrzciny': {name: 'Chrzciny', path: '/chrzciny', dir: 'celebrations'},
  // 'komunie': {name: 'Komunie', path: '/komunie', dir: 'celebrations'},
  'banquet-halls': {name: 'Sale bankietowe', path: '/sale-bankietowe', dir: 'celebrations'},
  'gallery': {name: 'Galeria', path: '/galeria', dir: 'gallery'},
  'events': {name: 'Wydarzenia', path: '/wydarzenia', dir: 'events'},
  'contact': {name: 'Kontakt', path: '/kontakt', dir: 'contact'},
  '404': {name: 'Błąd 404 - strony nie znaleziono', dir: '404'},
};

export const links = [
  {
    name: 'Hotel',
    path: '/',
    sublinks: ['landing', 'villa-garden', 'surroundings', 'reviews'],
  },
  pages['rooms'],
  {
    name: 'Konferencje',
    path: '/konferencje',
    sublinks: ['conferences', 'conference-halls'],
  }, {
    name: 'Kuchnia',
    path: '/kuchnia',
    sublinks: ['cuisine', 'restaurant', 'grill-garden'],
  }, {
    name: 'Uroczystości',
    path: '/wesela',
    sublinks: ['weddings', 'family-parties', 'banquet-halls'],
  },
  pages['gallery'],
  pages['events'],
  pages['contact'],
];

export const linksMap = _.keyBy('path', links);
