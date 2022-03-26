import {mkFirebaseUtils} from 'mk-firebase-utils';

export const firebaseUtils = mkFirebaseUtils(_, firebase.firestore(), firebase.storage());

const updateImageInObject = async (object, objectPath, imagePath, blobOrFile) => {
  return await firebaseUtils.updateImage(objectPath.extend(imagePath), blobOrFile, _.get(imagePath, object)?.name);
};


firebaseUtils.updateImageInObject = updateImageInObject;
