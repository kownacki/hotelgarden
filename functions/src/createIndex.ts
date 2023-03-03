import {createPreloadLink} from '../../utils/html';
import {CreateIndexDataParam, CreateIndexSeoParam, CreateIndexPreloadsParam} from './types';
import {serializeData} from './utils';

export const createIndex = (
  preloads: CreateIndexPreloadsParam,
  {title, metaDescription, jsonLd}: CreateIndexSeoParam,
  {eventsList, promotedEventUid, banner, introArticle}: CreateIndexDataParam,
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
  // @ts-ignore
  const introArticleSerialized = serializeData(introArticle);
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

    
    --primary-color: #2b5f57;
    --primary-color-rgb: 43, 95, 87;
    --primary-color-filter: invert(30%) sepia(55%) saturate(384%) hue-rotate(121deg) brightness(92%) contrast(89%);
  
    
    --secondary-color: #E2A96A;
    --secondary-color-rgb: 226, 169, 106;
    --secondary-color-filter: invert(99%) sepia(95%) saturate(3125%) hue-rotate(306deg) brightness(92%) contrast(92%);
  
    
    --secondary-dark-color: #da903f;
    --secondary-dark-color-rgb: 218, 144, 63;
    --secondary-dark-color-filter: invert(89%) sepia(28%) saturate(5772%) hue-rotate(329deg) brightness(91%) contrast(87%);
  
    
    --text-color: #424242;
    --text-color-rgb: 66, 66, 66;
    --text-color-filter: invert(23%) sepia(0%) saturate(1349%) hue-rotate(220deg) brightness(75%) contrast(74%);
  
    
    --surface-color: #D5D8D9;
    --surface-color-rgb: 213, 216, 217;
    --surface-color-filter: invert(91%) sepia(6%) saturate(82%) hue-rotate(149deg) brightness(101%) contrast(80%);
  
    
    --surface-light-color: #f5f5f5;
    --surface-light-color-rgb: 245, 245, 245;
    --surface-light-color-filter: invert(99%) sepia(7%) saturate(227%) hue-rotate(290deg) brightness(116%) contrast(92%);
  
    
    --surface-dark-color: #757575;
    --surface-dark-color-rgb: 117, 117, 117;
    --surface-dark-color-filter: invert(54%) sepia(1%) saturate(1204%) hue-rotate(316deg) brightness(84%) contrast(93%);
  
    
    --on-surface-color: #424242;
    --on-surface-color-rgb: 66, 66, 66;
    --on-surface-color-filter: invert(23%) sepia(0%) saturate(1349%) hue-rotate(220deg) brightness(75%) contrast(74%);
  
    
    --placeholder-color: #9e9e9e;
    --placeholder-color-rgb: 158, 158, 158;
    --placeholder-color-filter: invert(68%) sepia(18%) saturate(11%) hue-rotate(350deg) brightness(91%) contrast(85%);
  
    
    --error-color: #c62828;
    --error-color-rgb: 198, 40, 40;
    --error-color-filter: invert(21%) sepia(37%) saturate(4911%) hue-rotate(347deg) brightness(104%) contrast(88%);
  
    
    --error-background-color: #ffcdd2;
    --error-background-color-rgb: 255, 205, 210;
    --error-background-color-filter: invert(80%) sepia(26%) saturate(467%) hue-rotate(308deg) brightness(104%) contrast(101%);
  
    
    --correct-color: #2e7d32;
    --correct-color-rgb: 46, 125, 50;
    --correct-color-filter: invert(36%) sepia(70%) saturate(484%) hue-rotate(74deg) brightness(92%) contrast(85%);
  
    --divider-color: rgba(0, 0, 0, 0.12);
    --grey-text: rgba(0, 0, 0, 0.6);

    --header-height: 60px;
    --layer-header: 100;
    --layer-header-1: 101;

    font-family: 'Lato', sans-serif;
    color: var(--text-color);

    /* MWC theming. See https://github.com/material-components/material-web/blob/master/docs/theming.md */
    --mdc-theme-primary: var(--primary-color);
    --mdc-theme-secondary: var(--secondary-color);
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
      introArticle: ${introArticleSerialized},
    };
  </script>

  
  <script src="/resources/scripts/lodashBundle.js" type="module"></script>

  <script src="/resources/scripts/moment.min.js" ></script>

  <script src="/src/hg-app.js" type="module"></script>


  

<div id="fb-root"></div>
<div id="fb-customer-chat" class="fb-customerchat"></div>


<script type="text/javascript">
  const INITIALIZE_MESSENGER_SCRIPT_DELAY_IN_MS = 2000;
  const FACEBOOK_PAGE_ID = '946632798797840';
  const FACEBOOK_API_VERSION = 'v16.0';
  const fbRoot = document.getElementById('fb-root');
  let isHgDialogOpen = false;
  let isMessengerDialogOpen = false;

  const initializeMessengerScript = (onFinish, onDialogShow, onDialogHide) => {
    const chatbox = document.getElementById('fb-customer-chat');
    chatbox.setAttribute('page_id', FACEBOOK_PAGE_ID);
    chatbox.setAttribute('attribution', 'biz_inbox');
    
    window.fbAsyncInit = function() {
      window.FB.init({
        xfbml: true,
        version: FACEBOOK_API_VERSION,
      });
      
      window.FB.Event.subscribe('customerchat.dialogShow', () => onDialogShow());
      window.FB.Event.subscribe('customerchat.dialogHide', () => onDialogHide());
      onFinish();
    };
  
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/pl_PL/sdk/xfbml.customerchat.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  };
  
  const hideMessengerScript = () => {
    fbRoot.style.display = 'none';
  }
  
  const showMessengerScript = () => {
    fbRoot.style.display = 'block';
  }
  
  const hideOrShowWidget = () => {
    if (window.loggedIn || isHgDialogOpen || (window.pageYOffset === 0 && !isMessengerDialogOpen)) {
      hideMessengerScript();
    } else {
      showMessengerScript();
    }
  };
  
  const onInitializeFinish = () => {
    window.addEventListener('scroll', _.throttle(100, hideOrShowWidget));
  }
  
  window.addEventListener('hg-dialog-opened-changed', (event) => {
    isHgDialogOpen = event.detail;
    hideOrShowWidget();
  });

  window.addEventListener('scroll', () => {
    // Wait some time before loading Messenger so other more important things can happen
    setTimeout(() => {
      initializeMessengerScript(
        onInitializeFinish,
        () => isMessengerDialogOpen = true,
        () => isMessengerDialogOpen = false,
      );
    }, INITIALIZE_MESSENGER_SCRIPT_DELAY_IN_MS);
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
