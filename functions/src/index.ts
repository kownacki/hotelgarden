import * as functions from 'firebase-functions';

import {sendMessage as sendMessageFn} from './sendMessage/sendMessage';
export const sendMessage = functions.region('europe-west1').https.onRequest(sendMessageFn);

import {render as renderFn} from './render/render';
export const render = functions.runWith({
  minInstances: 1,
  memory: '128MB',
}).https.onRequest(renderFn);
