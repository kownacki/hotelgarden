import moment from "moment";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

// for testing in console
window.firebase = firebase;

firebase.initializeApp({
  apiKey: "AIzaSyDvamIugzBC3k3WA52KpHeINrfDHfkvnSs",
  authDomain: "pl-hotelgarden.firebaseapp.com",
  databaseURL: "https://pl-hotelgarden.firebaseio.com",
  projectId: "pl-hotelgarden",
  storageBucket: "pl-hotelgarden.appspot.com",
  messagingSenderId: "439170507609",
  appId: "1:439170507609:web:d50495f3bf9c9613702248",
  measurementId: "G-T7DQCNYLP2"
});

export const headerHeight = 59;

export const db = firebase.firestore();
export const storage = firebase.storage();

export const hyphenate = _.flow(
  _.replace(/'/g, ''),
  _.toLower,
  _.words,
  _.join('-'),
);

export const splitEvents = (events) => [
  _.flow([
    _.filter((event) => moment().isSameOrBefore(event.date, 'day')),
    _.sortBy('date'),
  ])(events),
  _.flow([
    _.filter((event) => moment().isAfter(event.date, 'day')),
    _.sortBy('date'),
  ])(events)
];

export const deleteImageFromStorage = (name) => {
  if (name) {
    storage.ref('images/' + name).delete();
  }
};
export const updateData = (doc, path, data) => {
  return db.doc(doc).set(path === null ? data : _.set(path, data, {}), {merge: true});
};
export const updateImage = async (doc, path, file, oldImageName) => {
  const name = `${Date.now()}${_.padCharsStart('0', 9,  _.random(1, 10**9 - 1))}`;
  deleteImageFromStorage(oldImageName);
  const storageRef = storage.ref('images/' + name);
  await storageRef.put(file);
  const image = {name, url: await storageRef.getDownloadURL()};
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

export const pathToUid = {
  '/': 'landing',
  '/villa-garden': 'villa-garden',
  '/olesnica-i-okolice': 'surroundings',
  '/opinie': 'reviews',
  '/pokoje': 'rooms',
  '/konferencje': 'conferences',
  '/sale': 'halls',
  '/kuchnia': 'cuisine',
  '/restauracja': 'restaurant',
  '/grill-garden': 'grill-garden',
  '/catering': 'catering',
  '/wesela': 'weddings',
  '/chrzciny': 'chrzciny',
  '/komunie': 'komunie',
  '/galeria': 'gallery',
  '/wydarzenia': 'events',
};

//todo flat vs hierarchical url structure
export const links = [
  {
    name: 'Hotel',
    path: '/',
    sublinks: [
      {name: 'O hotelu', path: '/'},
      {name: 'Villa Garden', path: '/villa-garden'},
      {name: 'Oleśnica i okolice', path: '/olesnica-i-okolice'},
      {name: 'Opinie ', path: '/opinie'},
    ],
  }, {
    name: 'Pokoje',
    path: '/pokoje',
  }, {
    name: 'Konferencje',
    path: '/konferencje',
    sublinks: [
      {name: 'Konferencja w Gardenie', path: '/konferencje'},
      {name: 'Nasze sale', path: '/sale'},
    ],
  }, {
    name: 'Kuchnia',
    path: '/kuchnia',
    sublinks: [
      {name: 'O naszej kuchni', path: '/kuchnia'},
      {name: 'Restauracja Magnolia', path: '/restauracja'},
      {name: 'Grill Garden', path: '/grill-garden'},
      {name: 'Catering', path: '/catering'},
    ],
  }, {
    name: 'Uroczystości',
    path: '/wesela',
    sublinks: [
      {name: 'Wesela', path: '/wesela'},
      {name: 'Chrzciny', path: '/chrzciny'},
      {name: 'Komunie', path: '/komunie'},
    ],
  },
  {
    name: 'Galeria',
    path: '/galeria',
  }, {
    name: 'Wydarzenia',
    path: '/wydarzenia',
  },
];

export const linksMap = _.keyBy('path', links);
