import fs from 'fs';
import _ from 'lodash/fp.js';
import { analyticsScript } from './generateIndex/analyticsScript.js';
import { globalStyles } from './generateIndex/globalStyles.js';
import { messengerScript } from './generateIndex/messengerScript.js';
import { preRender } from './generateIndex/preRender.js';
import { createPreloadLink } from './html.js';
const noopTag = (strings, ...keys) => _.flow([_.zip, _.flatten, _.initial, _.map(String), _.join('')])(strings, keys);
// to trigger syntax highlighting
const css = noopTag;
const createJsResourcePreloadLink = (path, module = false) => {
    return createPreloadLink({ href: path, as: 'script', crossorigin: module ? 'anonymous' : undefined });
};
const createFontResourcePreloadLink = (path) => {
    return createPreloadLink({ href: path, as: 'font', crossorigin: 'anonymous' });
};
const createFontFace = (path, { family, style, weight }) => css `
  @font-face {
    font-family: '${family}';
    font-style: ${style};
    font-weight: ${weight};
    font-display: swap;
    src: url(${path}) format('truetype');
  }
`;
const createScript = (path, module = false) => `
  <script src="${path}" ${module ? 'type="module"' : ''}></script>
`;
const placeholderOpening = '\$\{';
const placeholderEnding = '\}';
const createPlaceholder = (name) => `${placeholderOpening}${name}${placeholderEnding}`;
const namePrefix = 'hg';
const faviconPath = '/resources/images/favicon.ico';
const faviconDarkModePath = '/resources/images/favicon-dark-mode.ico';
const fontsRootPath = '/resources/fonts/';
const scriptsRootPath = '/resources/scripts/';
const getFontResource = (path, { family, style, weight }) => {
    return {
        preload: createFontResourcePreloadLink(path),
        fontFace: createFontFace(path, { family, style, weight }),
    };
};
const fontResources = [
    getFontResource(`${fontsRootPath}Lato/Lato-Regular.ttf`, { family: 'Lato', style: 'normal', weight: '400' }),
    getFontResource(`${fontsRootPath}Lato/Lato-Italic.ttf`, { family: 'Lato', style: 'italic', weight: '400' }),
    getFontResource(`${fontsRootPath}Lato/Lato-Light.ttf`, { family: 'Lato', style: 'normal', weight: '300' }),
    getFontResource(`${fontsRootPath}Lato/Lato-LightItalic.ttf`, { family: 'Lato', style: 'italic', weight: '300' }),
    getFontResource(`${fontsRootPath}Lato/Lato-Bold.ttf`, { family: 'Lato', style: 'normal', weight: '700' }),
    getFontResource(`${fontsRootPath}Lato/Lato-BoldItalic.ttf`, { family: 'Lato', style: 'italic', weight: '700' }),
    getFontResource(`${fontsRootPath}Yellowtail/Yellowtail-Regular.ttf`, { family: 'Yellowtail', style: 'normal', weight: 'normal' }),
];
const getJsResource = (path, module = false) => {
    return {
        preload: createJsResourcePreloadLink(path, module),
        script: createScript(path, module),
    };
};
const jsResources = [
    getJsResource(`${scriptsRootPath}lodashBundle.js`, true),
    getJsResource(`${scriptsRootPath}moment.min.js`),
    getJsResource(`/src/${namePrefix}-app.js`, true),
];
/*
  ${jsonLd ? `
    ${placeholderOpening}
      jsonLd ? \`<script type="application/ld+json">${createPlaceholder('jsonLd')}</script>\` : ''
    ${placeholderEnding}
  ` : ''}
 */
const getIndexHtml = (production, preloads = false, { title, description, jsonLd } = {}, { eventsList, promotedEventUid, banner, introArticle } = {}) => `
<!doctype html>
<html lang="pl">
<head>
  ${analyticsScript}
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>${title ? createPlaceholder('title') : ''}</title>
  <meta name="description" ${description ? `content="${createPlaceholder('metaDescription')}"` : ''}>

  <script type="application/ld+json">${jsonLd ? createPlaceholder('jsonLd') : ''}</script>
  
  <link rel="shortcut icon" href="${faviconPath}" media="(prefers-color-scheme: light)">
  <link rel="shortcut icon" href="${faviconDarkModePath}" media="(prefers-color-scheme: dark)">
  ${'' /*todo don't use external sources */}
  <link href="https://fonts.googleapis.com/css?family=Material+Icons&display=block" rel="stylesheet">

  ${fontResources.map((fontResource) => fontResource.preload).join('')}
  
  ${jsResources.map((jsResource) => jsResource.preload).join('')}

  <link rel="preload" href="/src/styles/shared-styles.js" as="script" crossorigin="anonymous">
  <link rel="preload" href="/src/styles/ck-content.js" as="script" crossorigin="anonymous">
  
  ${preloads ? createPlaceholder('preloads') : ''}
  
  <style>
    ${globalStyles}
    ${fontResources.map((fontResource) => fontResource.fontFace).join('')}
  </style>
</head>
<body>
  <${namePrefix}-app>
    ${preRender}
  </${namePrefix}-app>
  
  <script type="module">
    window.environment = '${production ? 'production' : 'development'}';
    window.initialData = {
      eventsList: ${eventsList ? createPlaceholder('eventsListSerialized') : undefined},
      promotedEventUid: ${promotedEventUid ? createPlaceholder('promotedEventUidSerialized') : undefined},
      banner: ${banner ? createPlaceholder('bannerSerialized') : undefined},
      introArticle: ${introArticle ? createPlaceholder('introArticleSerialized') : undefined},
    };
  </script>

  ${jsResources.map((jsResource) => jsResource.script).join('')}

  ${messengerScript}

  <style id="inline-style"></style>
  <script type="module">
    import sharedStyles from '/src/styles/shared-styles.js';
    import ckContent from '/src/styles/ck-content.js';
    const style = document.getElementById('inline-style');
    style.innerHTML += '\\n' + sharedStyles.cssText + '\\n' + ckContent.cssText;
  </script>
</body>
</html>
`;
fs.writeFileSync('index.html', getIndexHtml(false));
const indexWithPlaceholders = getIndexHtml(true, true, { title: true, description: true, jsonLd: true }, { eventsList: true, promotedEventUid: true, banner: true, introArticle: true }).replace(/\\/g, '\\\\');
const createIndexTemplate = fs.readFileSync('functions/src/createIndexTemplate.ts');
fs.writeFileSync('functions/src/createIndex.ts', createIndexTemplate.toString().replace('\`\`', `\`${indexWithPlaceholders}\``));
