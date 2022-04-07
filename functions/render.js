import _ from 'lodash/fp.js';
import {getFirestore} from 'firebase-admin/firestore';
import {createIndex} from './createIndex.js';

let seo;
let resolveSeoReady;
const seoReady = new Promise((resolve) => resolveSeoReady = resolve);

getFirestore().doc('_config/client').onSnapshot((doc) => {
  seo = doc.data().seo;
  resolveSeoReady();
});

const createDocumentTitle = (title, seo) => `${title} ${seo.titleSeparator} ${seo.titleSuffix}`;

export const render = async (req, res) => {
  await seoReady;

  const pageTitle = _.get(`${req.path}.title`, seo.urls);
  const fullTitle = createDocumentTitle(pageTitle, seo);

  res.status(200).send(createIndex(fullTitle));
};
