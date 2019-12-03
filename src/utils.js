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

//todo flat vs hierarchical url structure
export const links = [
  {
    name: 'Hotel',
    path: '/',
    sublinks: [
      {name: 'O hotelu', path: '/', image: 'https://picsum.photos/id/1040/500/500'},
      {name: 'Villa Garden', path: '/villa-garden', image: '/resources/images/villa.jpg'},
      {name: 'Oleśnica i okolice', path: '/olesnica-i-okolice', image: 'https://picsum.photos/id/608/500/500'},
      {name: 'Opinie ', path: '/opnie', image: 'https://picsum.photos/id/442/500/500'},
      {name: 'FAQ ', path: '/faq', image: 'https://picsum.photos/id/471/500/500'},
    ],
  }, {
    name: 'Pokoje',
    path: '/pokoje',
  }, {
    name: 'Konferencje',
    path: '/konferencje',
    sublinks: [
      {name: 'Nasze sale', path: '/nasze-sale', image: 'https://picsum.photos/id/155/500/500'},
      {name: 'Wigilie Firmowe', path: '/wigilie-firmowe', image: 'https://picsum.photos/id/255/500/500'},
    ],
  }, {
    name: 'Kuchnia',
    path: '/kuchnia',
    sublinks: [
      {name: 'O naszej kuchni', path: '/kuchnia', image: 'https://picsum.photos/id/75/500/500'},
      {name: 'Restauracja Magnolia', path: '/restauracja-magnolia', image: 'https://picsum.photos/id/175/500/500'},
      {name: 'Grill Garden', path: '/grill-garden', image: 'https://picsum.photos/id/275/500/500'},
      {name: 'Catering', path: '/catering', image: 'https://picsum.photos/id/375/500/500'},
    ],
  }, {
    name: 'Uroczystości',
    path: '/uroczystości',
    sublinks: [
      {name: 'Wesela', path: '/wesela', image: 'https://picsum.photos/id/256/500/500'},
      {name: 'Chrzciny', path: '/chrzciny', image: 'https://picsum.photos/id/257/500/500'},
      {name: 'Komunie', path: '/komunie', image: 'https://picsum.photos/id/258/500/500'},
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
