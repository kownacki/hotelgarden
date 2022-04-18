import * as functions from 'firebase-functions';
import fetch from 'node-fetch';
import {SITEMAP_URL} from '../../utils/urlStructure';

// See https://developers.google.com/search/docs/advanced/sitemaps/build-sitemap#addsitemap
export const getSitemapPingGoogleUrl = (sitemapUrl: string) => {
  return `${PING_GOOGLE_URL}?sitemap=${sitemapUrl}`;
}

export const PING_GOOGLE_URL = 'https://www.google.com/ping';
export const PING_GOOGLE_ABOUT_SITEMAP_CHANGE_URL = getSitemapPingGoogleUrl(SITEMAP_URL);

export const pingGoogleAboutSitemapChange = async () => {
  try {
    const response = await fetch(PING_GOOGLE_ABOUT_SITEMAP_CHANGE_URL);
    functions.logger.log(`Pinged Google about sitemap change. Finished with status code: ${response.status}`);
  }
  catch (error) {
    functions.logger.error('Pinging Google about sitemap change failed. Error: ', error);
  }
}
