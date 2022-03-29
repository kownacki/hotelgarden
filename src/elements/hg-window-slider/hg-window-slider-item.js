import {LitElement, html, css} from 'lit';
import {HDTV_WIDTH, HDTV_HEIGHT} from '../../../config.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../mkwc/hg-image.js';

const maxImageWidth = HDTV_WIDTH;
const maxImageHeight = HDTV_HEIGHT;

export class HgWindowSliderItem extends LitElement {
  static properties = {
    image: Object,
    ready: Boolean,
  };
  static styles = [sharedStyles, css`
    hg-image {
      --mkwc-editable-image-placeholder-color: transparent;
      height: 100%;
    }
  `];
  render() {
    return html`
      <hg-image
        .noGet=${true}
        .noUpdate=${true}
        .image=${this.image}
        .ready=${this.ready}
        .fit=${'contain'}
        .maxWidth=${maxImageWidth}
        .maxHeight=${maxImageHeight}
        .compressionQuality=${0.7}
        @image-uploaded=${(event) => {
          this.dispatchEvent(new CustomEvent('request-image-change', {detail: {index: this.image.index, file: event.detail}}));
        }}>
      </hg-image>
    `;
  }
}
customElements.define('hg-window-slider-item', HgWindowSliderItem);
