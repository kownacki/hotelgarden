import { pages } from './urlStructure';
export const getDefaultTitle = (uid) => {
    return pages[uid].name;
};
export const createDocumentTitle = (title, seoConfig) => {
    return `${title} ${seoConfig.titleSeparator} ${seoConfig.titleSuffix}`;
};
