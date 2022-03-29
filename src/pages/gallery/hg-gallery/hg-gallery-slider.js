import {LitElement, html, css} from 'lit';
import '../../../elements/hg-slider.js';
import './hg-gallery-slider-item.js';

export class HgGallerySlider extends LitElement {
  static properties = {
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
          <hg-gallery-slider-item
            .ready=${this.ready}
            .image=${image}
            @request-image-change=${(event) => {
              this.dispatchEvent(new CustomEvent('request-image-change', {detail: event.detail}));
            }}>
          </hg-gallery-slider-item>
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
