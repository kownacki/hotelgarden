import {mkFirebaseUtils} from 'mk-firebase-utils';

export const firebaseUtils = mkFirebaseUtils(_, firebase.firestore(), firebase.storage());

const updateInObject = (objectPath, dataPath, data) => {
  firebaseUtils.update(objectPath.extend(dataPath), data);
};
firebaseUtils.updateInObject = updateInObject;

const updateImageInObject = async (objectPath, imagePath, blobOrFile, object) => {
  return firebaseUtils.updateImage(objectPath.extend(imagePath), blobOrFile, _.get(imagePath, object)?.name);
};
firebaseUtils.updateImageInObject = updateImageInObject;

const updateDataOrImageInObject = async (type, objectPath, dataPath, data, object) => {
  let updatedData;
  if (type === 'image') {
    updatedData = await updateImageInObject(objectPath, dataPath, data, object);
  } else {
    updateInObject(objectPath, dataPath, data);
    updatedData = data;
  }
  return updatedData;
};
firebaseUtils.updateDataOrImageInObject = updateDataOrImageInObject;
