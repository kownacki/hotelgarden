import admin from 'firebase-admin';
import _ from 'lodash/fp.js';
import {mkFirebaseUtils} from 'mk-firebase-utils';

admin.initializeApp();

export const firebaseUtils = mkFirebaseUtils(_, admin.firestore(), admin.storage());
