// https://developers.facebook.com/docs/messenger-platform/discovery/facebook-chat-plugin/
const messengerScriptHtml = `
<div id="fb-root"></div>
<div id="fb-customer-chat" class="fb-customerchat"></div>
`;
const messengerScriptScript = `
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
`;
export const messengerScript = `
${messengerScriptHtml}
${messengerScriptScript}
`;
