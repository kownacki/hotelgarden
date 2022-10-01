export interface LinkAttrs {
  rel: string,
  href: string,
  as: string,
  crossorigin?: string,
}
export type PreloadLinkAttrs = Omit<LinkAttrs, "rel">;

export const createLink = ({rel, href, as, crossorigin}: LinkAttrs) => {
  return `
    <link rel="${rel}" href="${href}" as="${as}" ${crossorigin !== undefined ? `crossorigin="${crossorigin}"` : ''}>
  `;
}

export const createPreloadLink = (attrs: PreloadLinkAttrs) => {
  return createLink({...attrs, rel: 'preload'});
};
