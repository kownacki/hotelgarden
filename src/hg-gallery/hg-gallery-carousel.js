import {LitElement, html, css} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';

const next = (arr, index) => index === arr.length - 1 ? 0 : index + 1;
const prev = (arr, index) => index === 0 ? arr.length - 1 : index - 1;

customElements.define('hg-gallery-carousel', class extends LitElement {
  static get properties() {
    return {
      _selected: Number,
      _transitionGoing: Boolean,
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
      paper-icon-button#left, paper-icon-button#right {
        height: 45px;
        width: 45px;
        top: calc(50% - 20px);
      }
      paper-icon-button#left {
        left: 0;
      }
      paper-icon-button#right {
        right: 0;
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
  move(direction) {
    this.style.right = direction === 'right' ? '0': '-200%';
    this.style.transition = 'all 0.3s ease';
    this._transitionGoing = true;
    _.delay(300, () => {
      this._transitionGoing = false;
      this.style.transition = 'none';
      this.style.right = '-100%';
      this._selected = (direction === 'right' ? next : prev)(this.images, this._selected);
    });
  }
  render() {
    const nextImage = (index) => this.images[next(this.images, index)];
    const prevImage = (index) => this.images[prev(this.images, index)];
    return html`
      ${_.isEmpty(this.images) ? '' : repeat([prevImage(this._selected), this.images[this._selected], nextImage(this._selected)], _.get('name'), (image, index) => html`
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
          this.style.display = 'none';
          this.dispatchEvent(new CustomEvent('show-header', {composed: true}));
        }}>
      </paper-icon-button>
      <paper-icon-button
        ?disabled=${this._transitionGoing || this.images.length === 1}
        id="left"
        icon="chevron-left"
        @click=${() => this.move('left')}>
      </paper-icon-button>
      <paper-icon-button
        ?disabled=${this._transitionGoing || this.images.length === 1}
        id="right"
        icon="chevron-right"
        @click=${() => this.move('right')}>
      </paper-icon-button>
    `;
  }
});
