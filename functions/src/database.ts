import {initializeApp}  from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore';

export const app = initializeApp();
export const db = getFirestore(app);

export {
  Path as DbPath,
  createPath as createDbPath,
  generateUid as generateDbUid,
  get as getFromDb,
  update as updateInDb,
}
// @ts-ignore see https://github.com/microsoft/TypeScript/issues/33079
from 'mk-firebase-utils/admin';

export const listenToDb = <Data>(doc: string): [() => Data, Promise<unknown>] => {
  let data: Data;
  let resolveDataReady: (value?: unknown) => void;
  const dataReady = new Promise((resolve) => resolveDataReady = resolve);

  db.doc(doc).onSnapshot((doc) => {
    data = doc.data() as Data;
    resolveDataReady();
  });

  return [
    () => data,
    dataReady,
  ];
};
