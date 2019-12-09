import {LitElement, html, css} from 'lit-element';

customElements.define('hg-content-slider-item', class extends LitElement {
  static get properties() {
    return {
      url: String,
    };
  }
  static get styles() {
    return css`
      :host {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      iron-image {
        width: calc(100% - 1px);
        height: calc(100% - 1px);
        padding: 0.5px;
        box-sizing: border-box;
      }
      paper-icon-button {
        display: none;
        position: absolute;
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
      <iron-image .src=${this.url} .sizing=${'cover'}></iron-image>
      <paper-icon-button noink .icon=${'maps:zoom-out-map'}></paper-icon-button>
    `;
  }
});
