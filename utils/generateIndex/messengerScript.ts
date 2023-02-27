// https://developers.facebook.com/docs/messenger-platform/discovery/facebook-chat-plugin/
export const messengerScript = `
<div id="fb-root"></div>

<div id="fb-customer-chat" class="fb-customerchat">
</div>

<script type="text/javascript">
  const fbRoot = document.getElementById('fb-root');
  let isHgDialogOpen = false;
  let isMessengerDialogOpen = false;

  const hideOrShowWidget = () => {
    if (window.loggedIn || isHgDialogOpen || (window.pageYOffset === 0 && !isMessengerDialogOpen)) {
      fbRoot.style.display = 'none';
    } else {
      fbRoot.style.display = 'block';
    }
  };
  window.addEventListener('hg-dialog-opened-changed', (event) => {
    isHgDialogOpen = event.detail;
    hideOrShowWidget();
  });

  window.addEventListener('scroll', () => {
    if (!window.loggedIn) {
      // Wait some time before loading Messenger so other more important things can happen
      setTimeout(() => {
        window.fbAsyncInit = function() {
          window.FB.init({
            xfbml: true,
            version: 'v16.0'
          });
          window.FB.Event.subscribe('customerchat.dialogShow', () => isMessengerDialogOpen = true);
          window.FB.Event.subscribe('customerchat.dialogHide', () => isMessengerDialogOpen = false);
          window.addEventListener('scroll', _.throttle(100, hideOrShowWidget));
        };
      
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = 'https://connect.facebook.net/pl_PL/sdk/xfbml.customerchat.js';
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      }, 2000);
    }
  }, {once: true});
</script>

<script>
  var chatbox = document.getElementById('fb-customer-chat');
  chatbox.setAttribute("page_id", "946632798797840");
  chatbox.setAttribute("attribution", "biz_inbox");
</script>
`;
