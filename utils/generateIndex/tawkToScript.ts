export const tawkToScript = `
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
