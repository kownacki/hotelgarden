import {SitemapDbData} from '../../../../utils/types';
import {listenToDoc} from '../../database';

const [sitemapReady, getSitemapUnsafe] = listenToDoc<SitemapDbData>('sitemap/sitemap');

export const getSitemap = async () => {
  await sitemapReady;
  return getSitemapUnsafe().sitemap;
}
