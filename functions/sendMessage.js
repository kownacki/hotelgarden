'use strict';

const _ = require('lodash/fp');
const admin = require('firebase-admin');
const moment = require('moment-timezone');
moment.locale('pl');
const nodemailer = require('nodemailer');

const corsAsync = require('./cors-async')({origin: true});

const generateUid = (timestamp = Date.now()) => `${timestamp}${_.padCharsStart('0', 9,  _.random(1, 10**9 - 1))}`;

// Rough limit, to prevent attacks
const MAX_MESSAGE_SIZE = 10000;

const sendMail = async (body) => {
  const config = (await admin.firestore().doc('_config/admin').get()).data().sendMessage;
  const mailOptions = {
    to: config.mailOptions.to[body.subject],
    replyTo: body.email,
    subject: `${config.mailOptions.subject} | ${body.email}`,
    html: `
      <p>Dotyczy: ${body.subject}</p>
      <p>Imię i nazwisko: ${body.name}</p>
      <p>Firma: ${body.company || 'Nie podano'}</p>
      <p>Telefon: ${body.phone}</p>
      <p>Email: ${body.email}</p>
      <p>Wiadomość: ${_.replace(/\n/g, '<br>')(body.text)}</p>
    `,
  };
  const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.mailTransport.user,
      pass: config.mailTransport.pass,
    },
  });
  await mailTransport.sendMail(mailOptions);
  return mailOptions.to;
};

module.exports = async (req, res) => {
  const now = Date.now();
  await corsAsync(req, res);
  if (JSON.stringify(req.body).length > MAX_MESSAGE_SIZE) {
    return res.status(400).send('Message is too big.');
  }
  let to;
  try {
    to = await sendMail(req.body);
    res.status(200).end();
  } catch (error) {
    res.status(500).send('Error while sending contact form message.');
    throw error;
  }
  await admin.firestore().doc('sentMessages/' + generateUid(now)).set({
    ...req.body,
    to,
    timestamp: now,
    time: moment(now).tz('Poland').format('LLLL'),
  });
};
