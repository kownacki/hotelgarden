import {Request, Response} from 'firebase-functions';
import _ from 'lodash/fp';
import moment from 'moment';
import 'moment-timezone';
import {getSubjectLabel, SendMessageRequestBody, SendMessageRequestBodySubject} from '../../utils/sendMessage';
import {createDbPath, generateDbUid, getFromDb, updateInDb} from '../database';
import {RequestWithBody, AdminConfigSendMessage} from '../types';
import {sendMessage as utilsSendMessage} from '../utils/sendMessage';

moment.locale('pl');

// Rough limit, to prevent attacks
const MAX_MESSAGE_SIZE = 10000;

export const sendMessage = async (req: Request, res: Response) => {
  const body = (req as RequestWithBody<SendMessageRequestBody>).body;
  const timeAtFunctionStart = Date.now();
  const config:AdminConfigSendMessage = await getFromDb(createDbPath('_config/admin', 'sendMessage'));
  const options = {
    mailOptions: {
      from: config.mailOptions.from,
      to: config.mailOptions.to[body.subject],
      replyTo: body.email,
      subject: `${config.mailOptions.subject} | ${body.email}`,
      html: `
        <p>Dotyczy: ${getSubjectLabel(body.subject)}</p>
        <p>Imię i nazwisko: ${body.name}</p>
        ${body.subject === SendMessageRequestBodySubject.CAREERS
          ? ''
          : `<p>Firma: ${body.company || 'Nie podano'}</p>`
        }
        <p>Telefon: ${body.phone}</p>
        <p>Email: ${body.email}</p>
        <p>Wiadomość: ${_.replace(/\n/g, '<br>')(body.text)}</p>
      `,
    },
    mailTransport: config.mailTransport,
    maxMessageSize: MAX_MESSAGE_SIZE,
  };
  await utilsSendMessage(req, res, options);
  await updateInDb(createDbPath(`sentMessages/${generateDbUid(timeAtFunctionStart)}`), {
    ..._.mapValues(_.replace(/\n/g, '\\n'), body),
    to: options.mailOptions.to,
    timestamp: timeAtFunctionStart,
    time: moment(timeAtFunctionStart).tz('Poland').format('LLLL'),
  });
};
