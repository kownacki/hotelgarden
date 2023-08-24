import {HIDDEN_PAGES, pagesStaticData,  StaticPathPageUid} from '../../utils/urlStructure';

export interface NavigationSubitem {
  name: string,
  path: string,
}

export const omitForbiddenPages = (pages: StaticPathPageUid[], isLoggedIn: boolean) => {
  return isLoggedIn
    ? pages
    : pages.filter((pageUid) => {
      return !HIDDEN_PAGES.includes(pageUid);
    });
}

export const getNavigationSubitems = (pages: StaticPathPageUid[], isLoggedIn: boolean): NavigationSubitem[]  => {
  const pagesWithoutForbidden = omitForbiddenPages(pages, isLoggedIn);

  return pagesWithoutForbidden.map((pageUid) => {
      const { name, path } = pagesStaticData[pageUid];
      return { name, path };
    });
};
