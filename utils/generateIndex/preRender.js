export default `
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
