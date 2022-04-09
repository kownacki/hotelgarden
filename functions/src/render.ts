import {Request, Response} from 'firebase-functions';
import {createIndex} from './createIndex';
import {db} from './database';
import {ClientConfig, ClientConfigSeo} from './types';

let seo: ClientConfigSeo;
let resolveSeoReady: (value?: unknown) => void;
const seoReady = new Promise((resolve) => resolveSeoReady = resolve);

db.doc('_config/client').onSnapshot((doc) => {
  seo = (doc.data() as ClientConfig).seo ;
  resolveSeoReady();
});

const createDocumentTitle = (title: string, seo: ClientConfigSeo) => `${title} ${seo.titleSeparator} ${seo.titleSuffix}`;

export const render = async (req: Request, res: Response) => {
  await seoReady;

  const pageTitle = seo.urls?.[req.path]?.title;
  const fullTitle = createDocumentTitle(pageTitle || '', seo);

  res.status(200).send(createIndex(fullTitle));
};
