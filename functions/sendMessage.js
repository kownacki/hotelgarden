import _ from 'lodash/fp.js';
import {sendMessage as mkSendMessage} from 'mk-firebase-functions-utils/sendMessage';
import moment from 'moment-timezone';
import {createPath as createDbPath, get as getFromDb, update as updateInDb, generateUid} from './database';

moment.locale('pl');

// Rough limit, to prevent attacks
const MAX_MESSAGE_SIZE = 10000;

export const sendMessage = async (req, res) => {
  const body = req.body;
  const timeAtFunctionStart = Date.now();
  const config = await getFromDb(createDbPath('_config/admin', 'sendMessage'));
  const options = {
    mailOptions: {
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
    },
    mailTransport: config.mailTransport,
    maxMessageSize: MAX_MESSAGE_SIZE,
  };
  await mkSendMessage(req, res, options);
  await updateInDb(createDbPath(`sentMessages/${generateUid(timeAtFunctionStart)}`), {
    ..._.mapValues(_.replace(/\n/g, '\\n'), body),
    to: options.mailOptions.to,
    timestamp: timeAtFunctionStart,
    time: moment(options.timestamp).tz('Poland').format('LLLL'),
  });
};
