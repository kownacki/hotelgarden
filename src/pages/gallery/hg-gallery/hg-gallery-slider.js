import {LitElement, html, css} from 'lit';
import {HDTV_WIDTH, HDTV_HEIGHT} from '../../../../config.js';
import '../../../elements/hg-slider.js';
import '../../../elements/mkwc/hg-image.js'
import {firebaseUtils as fb} from '../../../utils/firebase.js';

const maxImageWidth = HDTV_WIDTH;
const maxImageHeight = HDTV_HEIGHT;

export class HgGallerySlider extends LitElement {
  static properties = {
    path: fb.Path,
    images: Array,
    ready: Boolean,
    selected: Number,
  };
  static styles = css`      
    :host {
      display: none;
      background: white;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      position: fixed;
      z-index: var(--layer-header-1)
    }
    hg-slider {
      height: 100%;
    }
    .controls {
      position: fixed;
      top: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.5);
    }
  `;
  constructor() {
    // todo remove all window event listeners registered imperatively
    super();
    this.selected = 0;
  }
  open(index) {
    window.history.pushState(null, document.title, '#slider');
    this._eventToRemove = () => this.close();
    window.addEventListener('popstate', this._eventToRemove);
    this.selected = index;
    this.style.display = 'block';
    // Imperatively change 'selected' in case #slider changed it himself.
    this.shadowRoot.getElementById('slider').selected = this.selected;
    this.shadowRoot.getElementById('slider').requestUpdate();
    document.body.style.overflow = 'hidden';
  }
  close() {
    window.removeEventListener('popstate', this._eventToRemove);
    this.style.display = 'none';
    document.body.style.overflow = 'auto';
  };
  render() {
    return html`
      <hg-slider
        id="slider"
        .selected=${this.selected}
        @selected-changed=${(event) => this.selected = event.detail}
        .items=${this.images}
        .template=${(image) => html`
          <hg-image
            .noGet=${true}
            .noUpdate=${true}
            .image=${image}
            .ready=${this.ready}
            .fit=${'contain'}
            .maxWidth=${maxImageWidth}
            .maxHeight=${maxImageHeight}
            .compressionQuality=${0.7}
            @image-uploaded=${(event) => this.dispatchEvent(new CustomEvent('request-image-change', {detail: {index: image.index, file: event.detail}}))}>
          </hg-image>
        `}>
      </hg-slider>
      <div class="controls">
        <paper-icon-button
          .icon=${'close'}
          @click=${() => {
            window.history.back();
            this.close();
          }}>
        </paper-icon-button>
      </div>
    `;
  }
}
customElements.define('hg-gallery-slider', HgGallerySlider);
