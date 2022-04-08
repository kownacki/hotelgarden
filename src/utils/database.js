import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {update as updateInDb, updateImage as updateImageInDb} from 'mk-firebase-utils/web';
import apiKey from '../../utils/apiKey.js';

const firebaseInitializeOptions = {
  apiKey,
  authDomain: "pl-hotelgarden.firebaseapp.com",
  databaseURL: "https://pl-hotelgarden.firebaseio.com",
  projectId: "pl-hotelgarden",
  storageBucket: "pl-hotelgarden.appspot.com",
  messagingSenderId: "439170507609",
  appId: "1:439170507609:web:d50495f3bf9c9613702248",
  measurementId: "G-T7DQCNYLP2"
};

export const app = initializeApp(firebaseInitializeOptions);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export {
  Path as DbPath,
  createPath as createDbPath,
  get as getFromDb,
  update as updateInDb,
  createImage as createImageInDb,
  deleteImage as deleteImageInDb,
  updateImage as updateImageInDb,
} from 'mk-firebase-utils/web';

export const updateInObjectInDb = (objectPath, dataPath, data) => {
  return updateInDb(objectPath.extend(dataPath), data);
};

export const updateImageInObjectInDb = async (objectPath, imagePath, blobOrFile, object) => {
  return updateImageInDb(objectPath.extend(imagePath), blobOrFile, _.get(imagePath, object)?.name);
};

export const updateDataOrImageInObjectInDb = async (type, objectPath, dataPath, data, object) => {
  let updatedData;
  if (type === 'image') {
    updatedData = await updateImageInObjectInDb(objectPath, dataPath, data, object);
  } else {
    updateInObjectInDb(objectPath, dataPath, data);
    updatedData = data;
  }
  return updatedData;
};
