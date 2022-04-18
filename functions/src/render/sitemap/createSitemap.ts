const createUrlTag = (url: string) => {
  return `
    <url>
      <loc>${url}</loc>
    </url>
  `;
};

const createUrlsTags = (urls: string[]) => {
  return urls.map((url) => {
    return createUrlTag(url);
  });
};

export const createSitemap = (urls: string[]) => {
  return `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${createUrlsTags(urls).join('')}
</urlset>
  `;
};
