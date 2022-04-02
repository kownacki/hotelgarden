import _ from 'lodash/fp.js';
import {createIndex} from './createIndex.js';
import {firebaseUtils as fb} from './firebase.js';

const createDocumentTitle = (title, seo) => `${title} ${seo.titleSeparator} ${seo.titleSuffix}`;

export const render = async (req, res) => {
  const seo = await fb.get(fb.path('_config/client', 'seo'));

  const pageTitle = _.get(`${req.path}.title`, seo.urls);
  const fullTitle = createDocumentTitle(pageTitle, seo);

  res.status(200).send(createIndex(fullTitle));
};
