import {Request, Response} from 'firebase-functions';
import {pages, pathToUid, Path} from '../../utils/urlStructure';
import {getClientConfig} from './config';
import {createIndex} from './createIndex';
import {ClientConfigSeo} from './types';

const getDefaultTitle = (path: Path) => {
  const pageUid = pathToUid[path];
  return pages[pageUid].name;
}

const createDocumentTitle = (title: string, seoConfig: ClientConfigSeo) => {
  return `${title} ${seoConfig.titleSeparator} ${seoConfig.titleSuffix}`;
}

export const render = async (req: Request, res: Response) => {
  const path = req.path as Path;
  const defaultTitle = getDefaultTitle(path);
  const config = await getClientConfig();

  const seoPageTitle = config.seo.urls?.[path]?.title;
  const fullTitle = createDocumentTitle(seoPageTitle || defaultTitle, config.seo);

  res.status(200).send(createIndex(fullTitle));
};
