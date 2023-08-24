import { HIDDEN_PAGES, pagesStaticData } from '../../utils/urlStructure';
export const omitForbiddenPages = (pages, isLoggedIn) => {
    return isLoggedIn
        ? pages
        : pages.filter((pageUid) => {
            return !HIDDEN_PAGES.includes(pageUid);
        });
};
export const getNavigationSubitems = (pages, isLoggedIn) => {
    const pagesWithoutForbidden = omitForbiddenPages(pages, isLoggedIn);
    return pagesWithoutForbidden.map((pageUid) => {
        const { name, path } = pagesStaticData[pageUid];
        return { name, path };
    });
};
