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
