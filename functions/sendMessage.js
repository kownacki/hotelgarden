import _ from 'lodash/fp.js';
import {sendMessage as mkSendMessage} from 'mk-firebase-functions-utils/sendMessage.js';
import moment from 'moment-timezone';
import {createPath as createDbPath, get as getFromDb, update as updateInDb, generateUid} from './database';

moment.locale('pl');

// Rough limit, to prevent attacks
const MAX_MESSAGE_SIZE = 10000;

export const sendMessage = async (req, res) => {
  const now = Date.now();
  const config = await getFromDb(createDbPath('_config/admin', 'sendMessage'));
  const options = {
    mailOptions: {
      to: config.mailOptions.to[req.body.subject],
      replyTo: req.body.email,
      subject: `${config.mailOptions.subject} | ${req.body.email}`,
      getHtml: (body) => `
        <p>Dotyczy: ${body.subject}</p>
        <p>Imię i nazwisko: ${body.name}</p>
        <p>Firma: ${body.company || 'Nie podano'}</p>
        <p>Telefon: ${body.phone}</p>
        <p>Email: ${body.email}</p>
        <p>Wiadomość: ${_.replace(/\n/g, '<br>')(body.text)}</p>
      `,
    },
    mailTransport: config.mailTransport,
    timestamp: now,
    maxMessageSize: MAX_MESSAGE_SIZE,
  };
  await mkSendMessage(req, res, options);
  await updateInDb(createDbPath(`sentMessages/${generateUid(now)}`), {
    ..._.mapValues(_.replace(/\n/g, '\\n'), req.body),
    to: options.mailOptions.to,
    timestamp: options.timestamp,
    time: moment(options.timestamp).tz('Poland').format('LLLL'),
  });
};
