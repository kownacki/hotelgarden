import {Request, Response} from 'firebase-functions';
import {createDocumentTitle, getDefaultTitle} from '../../utils/seo';
import {Path, pathToUid} from '../../utils/urlStructure';
import {getClientConfig} from './config';
import {createIndex} from './createIndex';

export const render = async (req: Request, res: Response) => {
  const path = req.path as Path;
  const defaultTitle = getDefaultTitle(pathToUid[path]);
  const config = await getClientConfig();

  const seoPageTitle = config.seo.urls?.[path]?.title;
  const fullTitle = createDocumentTitle(seoPageTitle || defaultTitle, config.seo);

  res.status(200).send(createIndex(fullTitle));
};
