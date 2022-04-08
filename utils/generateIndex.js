import fs from 'fs';
import _ from 'lodash/fp.js';
import {analyticsScript} from './generateIndex/analyticsScript.js';
import {preRender} from './generateIndex/preRender.js';
import {tawkToScript} from './generateIndex/tawkToScript.js';

const noopTag = (strings, ...keys) => _.flow([_.zip, _.flatten, _.initial, _.map(String), _.join('')])(strings, keys);
// to trigger syntax highlighting
const css = noopTag;

const createJsResourcePreloadLink = (path, module = false) => `
  <link rel="preload" href="${path}" as="script" ${module ? 'crossorigin="anonymous"' : ''}>
`;

const createFontResourcePreloadLink = (path) => `
  <link rel="preload" href="${path}" as="font" crossorigin="anonymous">
`;

const createFontFace = (path, {family, style, weight}) => css`
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

const createPlaceholder = (name) => `\$\{${name}\}`;

const namePrefix = 'hg';
const faviconPath = '/resources/images/favicon.ico';
const fontsRootPath = '/resources/fonts/';
const scriptsRootPath = '/resources/scripts/';

const getFontResource = (path, {family, style, weight}) => {
  return {
    preload: createFontResourcePreloadLink(path),
    fontFace: createFontFace(path, {family, style, weight}),
  };
}

const fontResources = [
  getFontResource(`${fontsRootPath}Lato/Lato-Regular.ttf`, {family: 'Lato', style: 'normal', weight: '400'}),
  getFontResource(`${fontsRootPath}Lato/Lato-Italic.ttf`, {family: 'Lato', style: 'italic', weight: '400'}),
  getFontResource(`${fontsRootPath}Lato/Lato-Light.ttf`, {family: 'Lato', style: 'normal', weight: '300'}),
  getFontResource(`${fontsRootPath}Lato/Lato-LightItalic.ttf`, {family: 'Lato', style: 'italic', weight: '300'}),
  getFontResource(`${fontsRootPath}Lato/Lato-Bold.ttf`, {family: 'Lato', style: 'normal', weight: '700'}),
  getFontResource(`${fontsRootPath}Lato/Lato-BoldItalic.ttf`, {family: 'Lato', style: 'italic', weight: '700'}),
  getFontResource(`${fontsRootPath}Yellowtail/Yellowtail-Regular.ttf`, {family: 'Yellowtail', style: 'normal', weight: 'normal'}),
];

const getJsResource = (path, module = false) => {
  return {
    preload: createJsResourcePreloadLink(path, module),
    script: createScript(path, module),
  }
}

const jsResources = [
  getJsResource(`${scriptsRootPath}lodashBundle.js`, true),
  getJsResource(`${scriptsRootPath}moment.min.js`),
  getJsResource(`/src/${namePrefix}-app.js`, true),
];

const getIndexHtml = (titlePlaceholder) => `
<!doctype html>
<html lang="pl">
<head>
  ${analyticsScript}
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>${titlePlaceholder ? createPlaceholder('title') : ''}</title>
  <meta name="description">
  
  <link rel="shortcut icon" href="${faviconPath}">
  ${'' /*todo don't use external sources */}
  <link href="https://fonts.googleapis.com/css?family=Material+Icons&display=block" rel="stylesheet">

  ${fontResources.map((fontResource) => fontResource.preload).join('')}
  
  ${jsResources.map((jsResource) => jsResource.preload).join('')}

  <link rel="preload" href="/src/styles/shared-styles.js" as="script" crossorigin="anonymous">
  <link rel="preload" href="/src/styles/ck-content.js" as="script" crossorigin="anonymous">
  
  <style>
    html, body {
      height: 100%;
    }
    body {
      margin: 0;
      --primary-color: #847850;
      --primary-color-rgb: 132, 120, 80;
      --primary-color-filter: invert(52%) sepia(3%) saturate(4587%) hue-rotate(9deg) brightness(88%) contrast(88%);
      --secondary-color: var(--paper-grey-800);
      --secondary-color-rgb: 117, 117, 117;
      --accent-color: #4f6884;
      --accent-color-dark: #324254;
      --accent-color-rgb: 79, 104, 132;
      --text-color: var(--secondary-color);
      --placeholder-color: var(--paper-grey-500);
      --placeholder-color-rgb: 158, 158, 158;
      --divider-color: rgba(0, 0, 0, 0.12);
      --grey-text: rgba(0, 0, 0, 0.6);
      --error-color: var(--paper-red-800);
      --correct-color: var(--paper-green-800);
      --logotype-color: #84979E;
      --logotype-color-filter: invert(73%) sepia(6%) saturate(853%) hue-rotate(150deg) brightness(91%) contrast(79%);
      --headerHeight: 60px;
      --layer-header: 100;
      --layer-header-1: 101;
      --layer-profitroom: 999; /* Profitroom snippet layer*/
      --layer-profitroom-1: 1000;
      font-family: 'Lato', sans-serif;
      color: var(--text-color);
      /* MWC theming. See https://github.com/material-components/material-web/blob/master/docs/theming.md */
      --mdc-theme-primary: var(--accent-color);
      --mdc-theme-secondary: var(--primary-color);
      /* Bug. See https://github.com/material-components/material-web/issues/2748 */
      --mdc-switch-selected-pressed-handle-color: var(--mdc-theme-primary);
      --mdc-switch-selected-focus-handle-color: var(--mdc-theme-primary);
      --mdc-switch-selected-hover-handle-color: var(--mdc-theme-primary);
      --mdc-switch-selected-track-color: var(--divider-color);
    }

    ${fontResources.map((fontResource) => fontResource.fontFace).join('')}
  </style>
</head>
<body>
  <${namePrefix}-app>
    ${preRender}
  </${namePrefix}-app>

  ${jsResources.map((jsResource) => jsResource.script).join('')}

  ${tawkToScript}
  
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

fs.writeFileSync('index.html', getIndexHtml());
fs.writeFileSync('functions/src/createIndex.js', `export const createIndex = (title) => \`${_.replace(/\\/g, '\\\\', getIndexHtml(true))}\`;`);
