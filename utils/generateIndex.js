import fs from 'fs';
import _ from 'lodash/fp.js';
import apiKey from './apiKey.js';
import analyticsScript from './generateIndex/analyticsScript.js';
import {preRender} from './generateIndex/preRender.js';
import preloadFirebaseAndApp from './generateIndex/preloadFirebaseAndApp.js';
import initializeFirebaseAndApp from './generateIndex/initializeFirebaseAndApp.js';
import tawkToScript from './generateIndex/tawkToScript.js';

const noopTag = (strings, ...keys) => _.flow([_.zip, _.flatten, _.initial, _.map(String), _.join('')])(strings, keys);
// to trigger syntax highlighting
const css = noopTag;

const namePrefix = 'hg';
const faviconPath = '/resources/images/favicon.ico';
const fontsRootPath =  '/resources/fonts/';
const fonts = [
  {family: 'Lato', style: 'normal', weight: '400', path: `${fontsRootPath}Lato/Lato-Regular.ttf`},
  {family: 'Lato', style: 'italic', weight: '400', path: `${fontsRootPath}Lato/Lato-Italic.ttf`},
  {family: 'Lato', style: 'normal', weight: '300', path: `${fontsRootPath}Lato/Lato-Light.ttf`},
  {family: 'Lato', style: 'italic', weight: '300', path: `${fontsRootPath}Lato/Lato-LightItalic.ttf`},
  {family: 'Lato', style: 'normal', weight: '700', path: `${fontsRootPath}Lato/Lato-Bold.ttf`},
  {family: 'Lato', style: 'italic', weight: '700', path: `${fontsRootPath}Lato/Lato-BoldItalic.ttf`},
  {family: 'Yellowtail', style: 'normal', weight: 'normal', path: `${fontsRootPath}Yellowtail/Yellowtail-Regular.ttf`},
];
const scriptsRootPath =  '/resources/scripts/';
const scripts = [
  {path: `${scriptsRootPath}lodashBundle.js`, module: true},
  {path: `${scriptsRootPath}moment.min.js`},
];
const firebaseRootPath = '/__/firebase/7.11.0/';
const firebaseLibs = ['app', 'auth', 'firestore', 'storage'];
const firebaseInitializeOptions = {
  apiKey,
  authDomain: "pl-hotelgarden.firebaseapp.com",
  databaseURL: "https://pl-hotelgarden.firebaseio.com",
  projectId: "pl-hotelgarden",
  storageBucket: "pl-hotelgarden.appspot.com",
  messagingSenderId: "439170507609",
  appId: "1:439170507609:web:d50495f3bf9c9613702248",
  measurementId: "G-T7DQCNYLP2"
};

const indexHtml = `
<!doctype html>
<html lang="pl">
<head>
  ${analyticsScript}
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title></title>
  <meta name="description">
  
  <link rel="shortcut icon" href="${faviconPath}">
  
  ${_.map((font) => `
    <link rel="preload" href="${font.path}" as="font" crossorigin="anonymous">
  `, fonts).join('')}
  ${_.map((script) => `
    <link rel="preload" href="${script.path}" as="script" ${script.module ? 'crossorigin="anonymous"' : ''}>
  `, scripts).join('')}
  ${preloadFirebaseAndApp(namePrefix, firebaseRootPath, firebaseLibs)}
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
    ${_.map((font) => css`
      @font-face {
        font-family: '${font.family}';
        font-style: ${font.style};
        font-weight: ${font.weight};
        font-display: swap;
        src: url(${font.path}) format('truetype');
      }
    `, fonts).join('')}
  </style>
</head>
<body>
  <${namePrefix}-app>
    ${preRender}
  </${namePrefix}-app>
  
  ${_.map((script) => `
    <script src="${script.path}" ${script.module ? 'type="module"' : ''}></script>
  `, scripts).join('')}

  ${initializeFirebaseAndApp(namePrefix, firebaseInitializeOptions, firebaseRootPath, firebaseLibs)}
  
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

fs.writeFileSync('index.html', indexHtml);
