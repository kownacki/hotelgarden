export const createLink = ({ rel, href, as, crossorigin }) => {
    return `
    <link rel="${rel}" href="${href}" as="${as}" ${crossorigin !== undefined ? `crossorigin="${crossorigin}"` : ''}>
  `;
};
export const createPreloadLink = (attrs) => {
    return createLink(Object.assign(Object.assign({}, attrs), { rel: 'preload' }));
};
