'use strict';
var fs = require('fs');
const _ = require('lodash/fp');

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
const firebaseRootPath = '/__/firebase/7.11.0/';
const firebaseLibs = ['app', 'auth', 'firestore', 'storage'];

const analyticsScript = `
<script>
  if (window.location.hostname === 'www.hotelgarden.pl') {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-56813589-1', 'auto');
  }
</script>
`;

const preRender = `
<style>
  .loading {
    font-family: sans-serif;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .loading-dots {
    font-size: 50px;
  }
  .loading {
    font-family: sans-serif;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .loading-dots {
    font-size: 50px;
  }
  noscript {
    text-align: center;
    margin: 10px;
  }
  @keyframes blink {
    0% {
      opacity: .2;
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: .2;
    }
  }
  .loading span {
    animation-name: blink;
    animation-duration: 1.4s;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }
  .loading span:nth-child(2) {
    animation-delay: .2s;
  }
  .loading span:nth-child(3) {
    animation-delay: .4s;
  }
</style>
<div class="loading">
  <div class="loading-dots"><span>.</span><span>.</span><span>.</span></div>
  <noscript>Do wyświetlenia strony potrzebne jest włączenie obsługi JavaScript.</noscript>
</div>
`;

const initializeFirebaseAndApp = (namePrefix) => `
<script id="firebase-init"></script>
<script id="app"></script>  
<script type="module">
  const loadApp = () => {
    document.getElementById('app').type="module";
    document.getElementById('app').src="/src/${namePrefix}-app.js";
  };
  const firebaseInitScript =  document.getElementById('firebase-init');
  firebaseInitScript.src="/__/firebase/init.js";
  firebaseInitScript.addEventListener("load", loadApp);
  // If Loading Firebase SDKs from reserved URLs fails, then it means we are in development and we should import firebase module from npm
  firebaseInitScript.addEventListener("error", async () => {
    window.firebase = (await Promise.all([
      import('firebase/app'),
      import('firebase/auth'),
      import('firebase/firestore'),
      import('firebase/storage'),
    ]))[0].default;

    firebase.initializeApp({
      apiKey: "AIzaSyDvamIugzBC3k3WA52KpHeINrfDHfkvnSs",
      authDomain: "pl-hotelgarden.firebaseapp.com",
      databaseURL: "https://pl-hotelgarden.firebaseio.com",
      projectId: "pl-hotelgarden",
      storageBucket: "pl-hotelgarden.appspot.com",
      messagingSenderId: "439170507609",
      appId: "1:439170507609:web:d50495f3bf9c9613702248",
      measurementId: "G-T7DQCNYLP2"
    });
    loadApp();
  });
</script>
`;

const initializeTawkTo = `
<script type="text/javascript">
  var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
  let hgDialogOpened;
  const hideOrShowWidget = () => {
    if (window.Tawk_API.toggleVisibility) {
      if (window.loggedIn || hgDialogOpened || (window.pageYOffset === 0 && Tawk_API.isChatMinimized())) {
        Tawk_API.hideWidget();
      } else {
        Tawk_API.showWidget();
      }
    }
  };
  window.addEventListener('hg-dialog-opened-changed', (event) => {
    hgDialogOpened = event.detail;
    hideOrShowWidget();
  });
  Tawk_API.onLoad = () => {
    hideOrShowWidget();
    window.addEventListener('scroll', _.throttle(100, hideOrShowWidget));
  };
  window.addEventListener('scroll', () => {
    if (!window.loggedIn) {
      // Wait some time before loading TawkTo so other more important things can happen
      setTimeout(() => {
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.defer=true;
        s1.src='https://embed.tawk.to/5e5d63246d48ff250ad8e6f4/default';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
      }, 2000);
    }
  }, {once: true});
</script>
`;

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
  ${_.map((lib) => `
    <link rel="preload" href="${firebaseRootPath}firebase-${lib}.js" as="script">
  `, firebaseLibs).join('')}
  <link rel="preload" href="/__/firebase/init.js" as="script">
  <link rel="preload" href="/resources/scripts/lodashBundle.js" as="script" crossorigin="anonymous">
  <link rel="preload" href="/resources/scripts/moment.min.js" as="script">
  <link rel="preload" href="/src/${namePrefix}-app.js" as="script" crossorigin="anonymous">
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
      color: var(--secondary-color);
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
  
  <script type="module" src="/resources/scripts/lodashBundle.js"></script>
  <script src="/resources/scripts/moment.min.js"></script>

  ${_.map((lib) => `
    <script src="${firebaseRootPath}firebase-${lib}.js"></script>
  `, firebaseLibs).join('')}

  ${initializeFirebaseAndApp(namePrefix)}
  
  ${initializeTawkTo}
  
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
