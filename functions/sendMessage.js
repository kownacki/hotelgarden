'use strict';

const _ = require('lodash/fp');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

const corsAsync = require('./cors-async')({origin: true});

// Rough limit, to prevent attacks
const MAX_MESSAGE_SIZE = 10000;

const sendMail = async (body) => {
  const config = (await admin.firestore().doc('config/config').get()).data().sendMessage;
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
  return mailTransport.sendMail(mailOptions);
};

module.exports = (req, res) => {
  return corsAsync(req, res)
    .then(() => {
      if (JSON.stringify(req.body).length > MAX_MESSAGE_SIZE) {
        return res.status(400).send('Message is too big.');
      }

      return sendMail(req.body)
        .then(() => res.status(200).end())
        .catch((error) => {
          res.status(500).send('Error while sending contact form message.');
          throw error;
        });
    })
};
