import * as functions from 'firebase-functions';

import {sendMessage as sendMessageFn} from './sendMessage.js';
export const sendMessage = functions.region('europe-west1').https.onRequest(sendMessageFn);
