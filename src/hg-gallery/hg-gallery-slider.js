import {LitElement, html, css} from 'lit-element';
import '../hg-slider.js';
//todo bug clicking go back when image is displayed breaks website
customElements.define('hg-gallery-slider', class extends LitElement {
  static get properties() {
    return {
      images: Array,
      _selected: Number,
    };
  }
  static get styles() {
    return css`      
      :host {
        display: none;
        background: white;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: fixed;
        z-index: 1;
      }
      hg-slider {
        height: 100%;
      }
      paper-icon-button {
        background: white;
        position: fixed;
        top: 0;
        right: 0;
      }
    `;
  }
  constructor() {
    super();
    this._selected = 0;
  }
  open(index) {
    this._selected = index;
    this.style.display = 'block';
    // Imperatively change 'selected' in case #slider changed it himself.
    this.shadowRoot.getElementById('slider').selected = this._selected;
    this.shadowRoot.getElementById('slider').requestUpdate();
    document.body.style.overflow = 'hidden';
    this.dispatchEvent(new CustomEvent('hide-header', {composed: true}))
  }
  render() {
    return html`
      <hg-slider
        id="slider"
        .selected=${this._selected}
        .items=${this.images}
        .template=${(image) => html`
          <iron-image
            .src=${image.url}
            .sizing=${'contain'}>
          </iron-image>
        `}>
      </hg-slider>
      <paper-icon-button 
        icon="close"
        @click=${() => {
          this.style.display = 'none';
          document.body.style.overflow = 'auto';
          this.dispatchEvent(new CustomEvent('show-header', {composed: true}));
        }}>
      </paper-icon-button>
    `;
  }
});
