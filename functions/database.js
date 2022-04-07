import {initializeApp}  from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore';
import {getGet, getUpdate} from 'mk-firebase-utils';

initializeApp();

export * from 'mk-firebase-utils';
export const get = getGet((doc) => {
  return getFirestore().doc(doc).get();
});
export const update = getUpdate((doc, data, options) => {
  const docRef = getFirestore().doc(doc);
  return options ? docRef.set(data, options) : docRef.set(data);
});
