import {Request, Response} from 'firebase-functions';
import {createTransport, SendMailOptions} from 'nodemailer';
import {corsAsync as corsAsyncLib} from './corsAsync';
const corsAsync = corsAsyncLib({origin: true});

export interface SendMessageOptions {
  mailOptions: {
    from?: SendMailOptions['from'],
    to: SendMailOptions['to'],
    replyTo?: SendMailOptions['replyTo'],
    subject: string,
    html: string,
  },
  // Too many combinations. Refer to nodemailer documentation
  mailTransport: any,
  maxMessageSize: number,
}

const sendMail = async (options: SendMessageOptions) => {
  const transporter = createTransport(options.mailTransport);
  await transporter.sendMail(options.mailOptions);
};

export const sendMessage = async (req: Request, res: Response, options: SendMessageOptions): Promise<Response<any> | void> => {
  await corsAsync(req, res);
  if (JSON.stringify(req.body).length > options.maxMessageSize) {
    return res.status(400).send('Message is too big.');
  }
  try {
    await sendMail(options);
    res.status(200).end();
  } catch (error) {
    res.status(500).send('Error while sending contact form message.');
    throw error;
  }
};