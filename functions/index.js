'use strict';

const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

exports.sendMessage = functions.region('europe-west1').https.onRequest(require('./sendMessage'));
