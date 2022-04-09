import {Request, Response} from 'firebase-functions';
import _ from 'lodash/fp';
// @ts-ignore see https://github.com/microsoft/TypeScript/issues/33079
import {sendMessage as mkSendMessage} from 'mk-firebase-functions-utils/sendMessage';
import moment from 'moment';
import 'moment-timezone';
import {createDbPath, generateDbUid, getFromDb, updateInDb} from './database';
import {RequestWithBody, AdminConfigSendMessage} from './types';

moment.locale('pl');

// Rough limit, to prevent attacks
const MAX_MESSAGE_SIZE = 10000;

interface SendMessageRequestBody {
  subject: 'hotel' | 'gastro',
  name: string,
  company: string,
  phone: string,
  email: string,
  text: string,
}

export const sendMessage = async (req: Request, res: Response) => {
  const body = (req as RequestWithBody<SendMessageRequestBody>).body;
  const timeAtFunctionStart = Date.now();
  const config:AdminConfigSendMessage = await getFromDb(createDbPath('_config/admin', 'sendMessage'));
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
  await updateInDb(createDbPath(`sentMessages/${generateDbUid(timeAtFunctionStart)}`), {
    ..._.mapValues(_.replace(/\n/g, '\\n'), body),
    to: options.mailOptions.to,
    timestamp: timeAtFunctionStart,
    time: moment(timeAtFunctionStart).tz('Poland').format('LLLL'),
  });
};
