import {initializeApp}  from 'firebase-admin/app';
import {getFirestore, SetOptions} from 'firebase-admin/firestore';
import {getGet, getUpdate} from 'mk-firebase-utils';

initializeApp();

export * from 'mk-firebase-utils';

export const get = getGet((doc: string) => {
  return getFirestore().doc(doc).get();
});

export const update = getUpdate((doc: string, data: any, options?: SetOptions) => {
  const docRef = getFirestore().doc(doc);
  return options ? docRef.set(data, options) : docRef.set(data);
});
