import {update as updateInDb, updateImage as updateImageInDb} from 'mk-firebase-utils/web';

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
