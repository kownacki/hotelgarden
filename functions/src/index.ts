import * as functions from 'firebase-functions';

import {sendMessage as sendMessageFn} from './sendMessage';
export const sendMessage = functions.region('europe-west1').https.onRequest(sendMessageFn);

import {render as renderFn} from './render';
export const render = functions.runWith({minInstances: 1}).https.onRequest(renderFn);
