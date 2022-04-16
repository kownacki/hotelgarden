export const createIndex = (title, metaDescription) => `
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
  
  <link rel="shortcut icon" href="/resources/images/favicon.ico">
  
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