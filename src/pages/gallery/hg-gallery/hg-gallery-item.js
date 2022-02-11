import {LitElement, html, css} from 'lit';

customElements.define('hg-gallery-item', class extends LitElement {
  static get properties() {
    return {
      src: String,
    };
  }
  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        /* todo not really transparent due to grey background? */
        border: solid 1px transparent;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
      }
      iron-image {
        width: 100%;
        height: 100%;
        display: block;
        transition: width 0.1s linear, height 0.1s linear, margin 0.1s linear, filter 0.1s linear;
      }
      paper-icon-button {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 0 50%;
        color: white;
        --paper-icon-button-ink-color: transparent;
        transition: padding 0.1s linear;
      }
      @media all and (min-width: 960px) {
        :host(:hover) iron-image {
          margin: -5% -5%;
          width: 110%;
          height: 110%;
          filter: brightness(50%);
        }
        :host(:hover) paper-icon-button {
          padding: 0 calc(50% - 24px);
        }
      }
    `;
  }
  render() {
    return html`
      <iron-image .src=${this.src} .sizing=${'cover'}></iron-image>
      <paper-icon-button noink .icon=${'zoom-out-map'}></paper-icon-button>
    `;
  }
});
