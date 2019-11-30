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

export const swapArrayItems = (index1, index2, arr) => {
  const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
  return arr;
};

//todo flat vs hierarchical url structure
export const links = [
  {
    name: 'Hotel',
    path: '/',
    sublinks: [
      {name: 'O hotelu', path: '/'},
      {name: 'Villa Garden', path: '/villa-garden', image: 'https://picsum.photos/id/84/500/500'},
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
      {name: 'Nasze sale', path: '/konferencje'},
      {name: 'Wigilie Firmowe', path: '/konferencje'},
    ],
  }, {
    name: 'Kuchnia',
    path: '/kuchnia',
    sublinks: [
      {name: 'O naszej kuchni', path: '/kuchnia'},
      {name: 'Restauracja Magnolia', path: '/kuchnia'},
      {name: 'Grill Garden', path: '/kuchnia'},
      {name: 'Catering', path: '/kuchnia'},
    ],
  }, {
    name: 'Galeria',
    path: '/galeria',
  }, {
    name: 'Wydarzenia',
    path: '/wydarzenia',
  },
];

export const linksMap = _.keyBy('path', links);
