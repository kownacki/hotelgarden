import {createPreloadLink} from '../../utils/html';
import {CreateIndexDataParam, CreateIndexSeoParam, CreateIndexPreloadsParam} from './types';
import {serializeData} from './utils';

export const createIndex = (
  preloads: CreateIndexPreloadsParam,
  {title, metaDescription, jsonLd}: CreateIndexSeoParam,
  {eventsList, promotedEventUid, banner}: CreateIndexDataParam,
) => {
  // @ts-ignore
  preloads = preloads.map((preloadLinkAttrs) => {
    return createPreloadLink(preloadLinkAttrs);
  }).join('');
  // @ts-ignore
  title = title || '';
  // @ts-ignore
  metaDescription = metaDescription || '';
  // @ts-ignore
  jsonLd = jsonLd || '';
  // @ts-ignore
  const eventsListSerialized = serializeData(eventsList);
  // @ts-ignore
  const promotedEventUidSerialized = serializeData(promotedEventUid);
  // @ts-ignore
  const bannerSerialized = serializeData(banner);
  return `
<!doctype html>
<html lang="pl">
<head>
  
<script>
  if (window.location.hostname === 'www.hotelgarden.pl') {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-56813589-1', 'auto');
  }
</script>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>${title}</title>
  <meta name="description" content="${metaDescription}">

  <script type="application/ld+json">${jsonLd}</script>
  
  <link rel="shortcut icon" href="/resources/images/favicon.ico" media="(prefers-color-scheme: light)">
  <link rel="shortcut icon" href="/resources/images/favicon-dark-mode.ico" media="(prefers-color-scheme: dark)">
  
  <link href="https://fonts.googleapis.com/css?family=Material+Icons&display=block" rel="stylesheet">

  
    <link rel="preload" href="/resources/fonts/Lato/Lato-Regular.ttf" as="font" crossorigin="anonymous">
  
    <link rel="preload" href="/resources/fonts/Lato/Lato-Italic.ttf" as="font" crossorigin="anonymous">
  
    <link rel="preload" href="/resources/fonts/Lato/Lato-Light.ttf" as="font" crossorigin="anonymous">
  
    <link rel="preload" href="/resources/fonts/Lato/Lato-LightItalic.ttf" as="font" crossorigin="anonymous">
  
    <link rel="preload" href="/resources/fonts/Lato/Lato-Bold.ttf" as="font" crossorigin="anonymous">
  
    <link rel="preload" href="/resources/fonts/Lato/Lato-BoldItalic.ttf" as="font" crossorigin="anonymous">
  
    <link rel="preload" href="/resources/fonts/Yellowtail/Yellowtail-Regular.ttf" as="font" crossorigin="anonymous">
  
  
  
    <link rel="preload" href="/resources/scripts/lodashBundle.js" as="script" crossorigin="anonymous">
  
    <link rel="preload" href="/resources/scripts/moment.min.js" as="script" >
  
    <link rel="preload" href="/src/hg-app.js" as="script" crossorigin="anonymous">
  

  <link rel="preload" href="/src/styles/shared-styles.js" as="script" crossorigin="anonymous">
  <link rel="preload" href="/src/styles/ck-content.js" as="script" crossorigin="anonymous">
  
  ${preloads}
  
  <style>
    
  html, body {
    height: 100%;
  }
  body {
    margin: 0;

    
    --primary-color: #847850;
    --primary-color-rgb: 132, 120, 80;
    --primary-color-filter: invert(48%) sepia(48%) saturate(294%) hue-rotate(9deg) brightness(88%) contrast(88%);
  
    
    --secondary-color: #424242;
    --secondary-color-rgb: 66, 66, 66;
    --secondary-color-filter: invert(24%) sepia(4%) saturate(19%) hue-rotate(343deg) brightness(98%) contrast(93%);
  
    
    --secondary-light-color: #757575;
    --secondary-light-color-rgb: 117, 117, 117;
    --secondary-light-color-filter: invert(47%) sepia(1%) saturate(15%) hue-rotate(331deg) brightness(96%) contrast(85%);
  
    
    --accent-color: #4F6884;
    --accent-color-rgb: 79, 104, 132;
    --accent-color-filter: invert(40%) sepia(12%) saturate(1198%) hue-rotate(171deg) brightness(93%) contrast(88%);
  
    
    --accent-dark-color: #3c4f64;
    --accent-dark-color-rgb: 60, 79, 100;
    --accent-dark-color-filter: invert(29%) sepia(14%) saturate(962%) hue-rotate(171deg) brightness(96%) contrast(95%);
  
    
    --text-color: #424242;
    --text-color-rgb: 66, 66, 66;
    --text-color-filter: invert(24%) sepia(4%) saturate(19%) hue-rotate(343deg) brightness(98%) contrast(93%);
  
    
    --surface-color: #f5f5f5;
    --surface-color-rgb: 245, 245, 245;
    --surface-color-filter: invert(98%) sepia(20%) saturate(55%) hue-rotate(298deg) brightness(113%) contrast(92%);
  
    
    --placeholder-color: #9e9e9e;
    --placeholder-color-rgb: 158, 158, 158;
    --placeholder-color-filter: invert(75%) sepia(1%) saturate(233%) hue-rotate(52deg) brightness(85%) contrast(88%);
  
    
    --error-color: #c62828;
    --error-color-rgb: 198, 40, 40;
    --error-color-filter: invert(32%) sepia(54%) saturate(2318%) hue-rotate(341deg) brightness(79%) contrast(95%);
  
    
    --error-background-color: #ffcdd2;
    --error-background-color-rgb: 255, 205, 210;
    --error-background-color-filter: invert(91%) sepia(7%) saturate(2752%) hue-rotate(240deg) brightness(106%) contrast(102%);
  
    
    --correct-color: #2e7d32;
    --correct-color-rgb: 46, 125, 50;
    --correct-color-filter: invert(36%) sepia(83%) saturate(413%) hue-rotate(74deg) brightness(92%) contrast(85%);
  
    
    --logotype-color: #84979E;
    --logotype-color-rgb: 132, 151, 158;
    --logotype-color-filter: invert(59%) sepia(22%) saturate(222%) hue-rotate(150deg) brightness(96%) contrast(87%);
  
    --divider-color: rgba(0, 0, 0, 0.12);
    --grey-text: rgba(0, 0, 0, 0.6);

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
    --mdc-switch-selected-pressed-track-color: var(--divider-color);
    --mdc-switch-selected-focus-track-color: var(--divider-color);
    --mdc-switch-selected-hover-track-color: var(--divider-color);
  }

    
  @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(/resources/fonts/Lato/Lato-Regular.ttf) format('truetype');
  }

  @font-face {
    font-family: 'Lato';
    font-style: italic;
    font-weight: 400;
    font-display: swap;
    src: url(/resources/fonts/Lato/Lato-Italic.ttf) format('truetype');
  }

  @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url(/resources/fonts/Lato/Lato-Light.ttf) format('truetype');
  }

  @font-face {
    font-family: 'Lato';
    font-style: italic;
    font-weight: 300;
    font-display: swap;
    src: url(/resources/fonts/Lato/Lato-LightItalic.ttf) format('truetype');
  }

  @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(/resources/fonts/Lato/Lato-Bold.ttf) format('truetype');
  }

  @font-face {
    font-family: 'Lato';
    font-style: italic;
    font-weight: 700;
    font-display: swap;
    src: url(/resources/fonts/Lato/Lato-BoldItalic.ttf) format('truetype');
  }

  @font-face {
    font-family: 'Yellowtail';
    font-style: normal;
    font-weight: normal;
    font-display: swap;
    src: url(/resources/fonts/Yellowtail/Yellowtail-Regular.ttf) format('truetype');
  }

  </style>
</head>
<body>
  <hg-app>
    
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
      <div class="loading-dots"><span>•</span><span>•</span><span>•</span></div>
      <noscript>Do wyświetlenia strony potrzebne jest włączenie obsługi JavaScript.</noscript>
    </div>
  

  </hg-app>
  
  <script type="module">
    window.environment = 'production';
    window.initialData = {
      eventsList: ${eventsListSerialized},
      promotedEventUid: ${promotedEventUidSerialized},
      banner: ${bannerSerialized},
    };
  </script>

  
  <script src="/resources/scripts/lodashBundle.js" type="module"></script>

  <script src="/resources/scripts/moment.min.js" ></script>

  <script src="/src/hg-app.js" type="module"></script>


  
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
};
