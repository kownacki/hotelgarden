import {LitElement, html, css} from 'lit-element';

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
        position: relative;
        margin: 1px;
      }
      iron-image {
        width: calc(100% - 1px);
        height: calc(100% - 1px);
        display: block;
      }
      paper-icon-button {
        display: none;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        padding: 0 calc(50% - 24px);
        color: white;
        --paper-icon-button-ink-color: transparent;
      }
      :host(:hover) paper-icon-button {
        display: block;
      }
    `;
  }
  render() {
    return html`
      <iron-image .src=${this.src} .sizing=${'cover'}></iron-image>
      <paper-icon-button noink .icon=${'maps:zoom-out-map'}></paper-icon-button>
    `;
  }
});