import {LitElement, html, css} from 'lit-element';
import {repeat} from "lit-html/directives/repeat";
import {storage} from "../utils.js";

const next = (arr, index) => index === arr.length - 1 ? 0 : index + 1;
const prev = (arr, index) => index === 0 ? arr.length - 1 : index - 1;

customElements.define('hg-content-carousel', class extends LitElement {
  static get properties() {
    return {
      _selected: Number,
      _transitionGoing: Boolean,
      images: Array,
    };
  }
  constructor() {
    super();
    this._selected = 0;
    (async () => {
      this.images = await Promise.all(_.map(async (item) => ({
        name: item.name,
        url: await item.getDownloadURL(),
      }), _.reverse((await storage.ref('gallery').listAll()).items)));
    })();
  }
  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
        overflow: hidden;
        height: 350px;
        max-width: 1200px;
        margin: 20px auto;
      }
      #slider {
        right: -50%;
        top: 0;
        width: 200%;
        height: 100%;
        position: absolute;
        display: flex;
      }
      iron-image {
        display: block;
        width: calc(100% / 4);
        flex: none;
      }
      paper-icon-button#left, paper-icon-button#right {
        background: white;
        position: absolute;
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
  move(direction) {
    const slider = this.shadowRoot.getElementById('slider');
    slider.style.right = direction === 'right' ? '0': '-100%';
    slider.style.transition = 'all 0.5s ease';
    this._transitionGoing = true;
    _.delay(500, () => {
      this._transitionGoing = false;
      slider.style.transition = 'none';
      slider.style.right = '-50%';
      this._selected = (direction === 'right' ? next : prev)(this.images, this._selected);
    });
  }
  render() {
    const nextImage = (index) => this.images[next(this.images, index)];
    const prevImage = (index) => this.images[prev(this.images, index)];
    return html`
      <div id="slider">
        ${(() => {
          const images = [
            {image: prevImage(this._selected), index: prev(this.images, this._selected)},
            {image: this.images[this._selected], index: this._selected},
            {image: nextImage(this._selected), index: next(this.images, this._selected)},
            {image: nextImage(next(this.images, this._selected)), index: next(this.images, next(this.images, this._selected))},
          ];
          return _.isEmpty(this.images) ? '' : repeat(images, _.get('name'), (image) => html`
            <iron-image
              src="${image.image.url}" 
              sizing="cover"
              @click=${() => !this._transitionGoing && this.shadowRoot.getElementById('carousel').open(image.index)}>
            </iron-image>
          `)
        })()}
      </div>
      <paper-icon-button
        ?hidden=${this._transitionGoing || this.images.length <= 2}
        id="left"
        icon="chevron-left"
        @click=${() => this.move('left')}>
      </paper-icon-button>
      <paper-icon-button
        ?hidden=${this._transitionGoing || this.images.length <= 2}
        id="right"
        icon="chevron-right"
        @click=${() => this.move('right')}>
      </paper-icon-button>
      <hg-gallery-carousel id="carousel" .images=${this.images}></hg-gallery-carousel>
    `;
  }
});
