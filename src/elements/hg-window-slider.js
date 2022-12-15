import {LitElement, html, css} from 'lit';
import {HDTV_WIDTH, HDTV_HEIGHT} from '../../utils/config.js';
import './hg-slider.js';
import './hg-window-slider/hg-window-slider-item.js';
import './ui/hg-icon-button.js';

export const HG_WINDOW_SLIDER_IMAGE_MAX_WIDTH = HDTV_WIDTH;
export const HG_WINDOW_SLIDER_IMAGE_MAX_HEIGHT = HDTV_HEIGHT;

export class HgWindowSlider extends LitElement {
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
        @selected-changed=${({detail: selected}) => this.selected = selected}
        .items=${this.images}
        .template=${(image) => html`
          <hg-window-slider-item
            .ready=${this.ready}
            .image=${image}
            @request-image-change=${({detail}) => {
              this.dispatchEvent(new CustomEvent('request-image-change', {detail}));
            }}>
          </hg-window-slider-item>
        `}>
      </hg-slider>
      <div class="controls">
        <hg-icon-button
          .size=${'normal'}
          .icon=${'close'}
          @click=${() => {
            window.history.back();
            this.close();
          }}>
        </hg-icon-button>
      </div>
    `;
  }
}
customElements.define('hg-window-slider', HgWindowSlider);
