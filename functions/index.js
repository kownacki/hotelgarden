import admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp(functions.config().firebase);

import {sendMessage as sendMessageFn} from './sendMessage.js';
export const sendMessage = functions.region('europe-west1').https.onRequest(sendMessageFn);
