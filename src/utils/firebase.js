import {mkFirebaseUtils} from 'mk-firebase-utils';

export const firebaseUtils = mkFirebaseUtils(_, firebase.firestore(), firebase.storage());
