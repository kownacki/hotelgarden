import {LitElement, html, css} from 'lit';
import {HDTV_WIDTH, HDTV_HEIGHT} from '../../../utils/config.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../mkwc/hg-editable-image.js';

const maxImageWidth = HDTV_WIDTH;
const maxImageHeight = HDTV_HEIGHT;

export class HgWindowSliderItem extends LitElement {
  static properties = {
    image: Object,
    ready: Boolean,
  };
  static styles = [sharedStyles, css`
    hg-editable-image {
      --mkwc-image-placeholder-color: transparent;
      height: 100%;
    }
  `];
  render() {
    return html`
      <hg-editable-image
        .src=${this.image?.url}
        .ready=${this.ready}
        .fit=${'contain'}
        .maxWidth=${maxImageWidth}
        .maxHeight=${maxImageHeight}
        .compressionQuality=${0.7}
        @image-uploaded=${(event) => {
          this.dispatchEvent(new CustomEvent('request-image-change', {detail: {index: this.image.index, file: event.detail}}));
        }}>
      </hg-editable-image>
    `;
  }
}
customElements.define('hg-window-slider-item', HgWindowSliderItem);
