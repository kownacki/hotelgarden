import {LitElement, html, css} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';

const next = (arr, index) => index === arr.length - 1 ? 0 : index + 1;
const prev = (arr, index) => index === 0 ? arr.length - 1 : index - 1;

customElements.define('hg-gallery-carousel', class extends LitElement {
  static get properties() {
    return {
      _selected: Number,
      images: Array,
    };
  }
  static get styles() {
    return css`      
      :host {
        display: none;
        background: white;
        width: 300%;
        height: 100%;
        top: 0;
        right: -100%;
        position: fixed;
      }
      iron-image {
        display: block;
        flex: 1;
        height: 100%;
      }
      .counter {
        background: white;
        top: 0;
        left: 0;
        position: fixed;
        padding: 12px;
      }
      paper-icon-button {
        background: white;
        position: fixed;
      }
      paper-icon-button.close {
        top: 0;
        right: 0;
      }
      paper-icon-button.left {
        left: 0;
        top: calc(50% - 20px);
      }
      paper-icon-button.right {
        right: 0;
        top: calc(50% - 20px);
      }
    `;
  }
  constructor() {
    super();
    this._selected = 0;
  }
  open(index) {
    document.body.style.overflow = 'hidden';
    this._selected = index;
    this.style.display = 'flex';
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('hide-header', {composed: true}))
  }
  render() {
    const nextImage = _.curry(next, this.images);
    const prevImage = _.curry(prev, this.images);
    return html`
      ${_.isEmpty(this.images) ? '' : repeat([nextImage(this.images, this._selected), this.images[this._selected], nextImage(this._selected)], _.get('name'), (image, index) => html`
        <iron-image
          src="${image.url}" 
          sizing="contain">
        </iron-image>
      `)}
      <div class="counter">${this._selected + 1} / ${this.images.length}</div>
      <paper-icon-button 
        class="close"
        icon="close" 
        @click=${() => {
          document.body.style.overflow = 'auto';
          this.style.display = 'none'
        }}>
      </paper-icon-button>
      <paper-icon-button
        ?disabled=${this.images.length === 1}
        class="left"
        icon="chevron-left"
        @click=${() => {
          this._selected = prev(this.images, this._selected);
        }}>
      </paper-icon-button>
      <paper-icon-button
        ?disabled=${this.images.length === 1}
        class="right"
        icon="chevron-right"
        @click=${() => {
          this._selected = next(this.images, this._selected);
        }}>
      </paper-icon-button>
    `;
  }
});
